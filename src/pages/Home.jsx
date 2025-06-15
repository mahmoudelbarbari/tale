import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  Snackbar,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import heroSectionImgLight from "@/assets/images/tale-hero.png";
import heroSectionImgDark from "@/assets/images/tale-hero-dark.png";
import AddDialog from "../components/AddDialog";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useEffect, useState } from "react";
import { collection, onSnapshot, doc, getDoc } from "firebase/firestore";
import { firestoreDb } from "../config/firebase";
import { deleteBlog } from "../config/firestore";
import { auth } from "../config/firebase";

function Home() {
  const theme = useTheme();
  const heroImg =
    theme.palette.mode === "dark" ? heroSectionImgDark : heroSectionImgLight;

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authors, setAuthors] = useState({});
  const [open, setOpen] = useState(false);
  const [snackBarMessage, setSnackbarMessage] = useState("");
  const handleClose = () => setOpen(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [editBlog, setEditBlog] = useState(null);

  const loggedIn = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  const fetchAuthorName = async (userId) => {
    try {
      const userDoc = doc(firestoreDb, "users", userId);
      const userSnapshot = await getDoc(userDoc);
      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        setAuthors((prev) => ({
          ...prev,
          [userId]: userData.name || userData.displayName || "Unknown Author",
        }));
      }
    } catch (error) {
      console.error("Error fetching author:", error);
    }
  };

  useEffect(() => {
    const blogCollection = collection(firestoreDb, "blog");

    const querySnapShot = onSnapshot(
      blogCollection,
      (snapshot) => {
        const blogList = snapshot.docs.map((doc) => {
          const data = doc.data();
          if (data.userId) {
            fetchAuthorName(data.userId);
          }
          return {
            id: doc.id,
            img: data.image,
            title: data.title,
            sub: data.description,
            userId: data.userId,
            editIcon: <ModeEditIcon />,
            deleteIcon: <DeleteOutlineIcon />,
            date: new Date(data.createdAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }),
          };
        });
        setItems(blogList);
        setLoading(false);
      },
      (error) => {
        console.log("Error fetching blogs: ", error);
        setLoading(false);
      }
    );
    return () => querySnapShot();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <CircularProgress />
      </Box>
    );
  }

  const handleDeleteBlog = async (blogId) => {
    try {
      await deleteBlog(blogId);
      setSnackbarMessage("Blog deleted successfuly");
      setOpen(true);
    } catch (e) {
      console.log("Error deleting blog !", e);
      setSnackbarMessage("Error deleting blog at this moment !", e.message);
      setOpen(true);
    }
  };

  const handleEdit = async (blogId, updatedData) => {
    try {
      if (!blogId || !updatedData) {
        setEditBlog(null);
        return;
      }

      await updateBlog(blogId, updatedData);
      setSnackbarMessage("Blog updated successfully");
      setOpen(true);
      setEditBlog(null);
    } catch (error) {
      console.error("Error updating blog:", error);
      setSnackbarMessage("Error updating blog");
      setOpen(true);
    }
  };

  const handleEditClick = (blog) => {
    setEditBlog(blog);
  };

  return (
    <>
      <Box
        component="img"
        sx={{
          width: "100vw",
          maxWidth: "100%",
          objectFit: "cover",
          objectPosition: "center",
          borderRadius: 2,
          display: "block",
          m: 0,
          p: 0,
        }}
        alt="hero image"
        src={heroImg}
      />

      <Box sx={{ px: { xs: 2, sm: 4 } }}>
        <Grid container spacing={3} direction="column">
          {items.map((item, idx) => (
            <Grid item key={idx}>
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: { xs: "flex-start", sm: "center" },
                  borderBottom: `2px solid ${theme.palette.border.bottom}`,
                  p: { xs: 2, sm: 3 },
                  m: 2,
                  gap: { xs: 2, sm: 3 },
                  width: "100%",
                  maxWidth: 1800,
                  mx: "auto",
                  bgcolor: "background.paper",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: 2,
                  },
                }}
              >
                <Box
                  component="img"
                  src={item.img}
                  alt={item.title}
                  sx={{
                    width: { xs: "100%", sm: 300, md: 200 },
                    height: { xs: 200, sm: 200, md: 150 },
                    objectFit: "cover",
                    border: `2px solid ${theme.palette.border.main}`,
                    borderRadius: 3,
                    flexShrink: 0,
                  }}
                />
                <Box
                  sx={{
                    flex: 1,
                    width: { xs: "100%", md: "auto" },
                    textAlign: { xs: "center", md: "left" },
                  }}
                >
                  <Typography variant="h5" fontWeight={700} gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {item.sub}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    position: { xs: "relative", md: "absolute" },
                    right: { md: 16 },
                    bottom: { md: 16 },
                    display: "flex",
                    justifyContent: "space-between",
                    mt: { xs: 2, md: 0 },
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Stack
                    direction={{ md: "row", xs: "column" }}
                    gap={1}
                    sx={{ marginLeft: { md: "14.5%", xs: "" } }}
                  >
                    <Typography variant="body2" color="textSecondary">
                      <strong>Author: </strong>
                      {authors[item.userId] || "Loading..."}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <strong>Date: </strong> {item.date}
                    </Typography>
                  </Stack>

                  {loggedIn != null &&
                  currentUser &&
                  currentUser.uid === item.userId ? (
                    <>
                      <Box>
                        <Button
                          sx={{ color: theme.palette.info.main }}
                          onClick={() => handleEditClick(item)}
                        >
                          {item.editIcon}
                        </Button>
                        <Button
                          onClick={() => handleDeleteBlog(item.id)}
                          sx={{ color: theme.palette.error.main }}
                        >
                          {item.deleteIcon}
                        </Button>
                      </Box>
                    </>
                  ) : null}
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Snackbar open={open} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={snackBarMessage.includes("Error") ? "error" : "success"}
        >
          {snackBarMessage}
        </Alert>
      </Snackbar>
      <AddDialog />
      {editBlog && (
        <AddDialog isEdit={true} blogToEdit={editBlog} onEdit={handleEdit} />
      )}
    </>
  );
}

export default Home;
