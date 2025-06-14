import { useState } from "react";
import {
  Dialog,
  Fab,
  InputLabel,
  FormHelperText,
  Button,
  TextField,
  Box,
  useTheme,
  useMediaQuery,
  Snackbar,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { addBlog, imageToBase64, compressImage } from "../config/firestore";

function AddDialog({ isEdit, blogToEdit, onEdit }) {
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [title, setTitle] = useState(blogToEdit?.title || "");
  const [desc, setDesc] = useState(blogToEdit?.description || "");
  const [image, setImage] = useState(blogToEdit?.image || null);
  const [titleError, setTitleError] = useState(false);
  const [descError, setDescError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("success");
  const theme = useTheme();
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);

    if (isEdit) {
      onEdit(null, null);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setTitleError(e.target.value.trim() === "");
  };

  const handleDescChange = (e) => {
    setDesc(e.target.value);
    setDescError(e.target.value.trim() === "");
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setImageError(!e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isTitleError = title.trim() === "";
    const isDescError = desc.trim() === "";
    const isImageError = !image;

    setTitleError(isTitleError);
    setDescError(isDescError);
    setImageError(isImageError);

    try {
      const currentUser = JSON.parse(localStorage.getItem("user"));

      if (!currentUser) {
        setSnackbarMessage("You have to be logged in");
        setAlertSeverity("warning");
        setSnackbarOpen(true);
        return;
      }

      if (!isTitleError && !isDescError && !isImageError) {
        const blogData = {
          title: title.trim(),
          description: desc.trim(),
          image:
            typeof image === "string"
              ? image
              : await imageToBase64(await compressImage(image)),
          createdAt: isEdit ? blogToEdit.createdAt : new Date().toISOString(),
          userId: currentUser.uid,
        };

        if (isEdit) {
          await onEdit(blogToEdit.id, blogData);
          setSnackbarMessage("Blog updated successfully");
        } else {
          await addBlog(blogData);
          setSnackbarMessage("Blog created successfully");
        }

        setAlertSeverity("success");
        handleClose();
        setTitle("");
        setDesc("");
        setImage(null);
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error(error);
      setSnackbarMessage(
        `Failed to ${isEdit ? "update" : "create"} blog: ${error.message}`
      );
      setAlertSeverity("error");
      setSnackbarOpen(true);
    }
  };
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      {!isEdit && (
        <Fab
          sx={{ position: "fixed", right: 16, bottom: 16, zIndex: 1000 }}
          onClick={handleOpen}
        >
          {<AddIcon />}
        </Fab>
      )}
      <Dialog
        open={isEdit || open}
        onClose={handleClose}
        fullScreen={fullScreen}
        maxWidth="md"
        fullWidth
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            m: 3,
            minWidth: 320,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box
            component="h2"
            sx={{
              borderBottom: `1px solid ${theme.palette.border.main}`,
              p: 1,
            }}
          >
            {isEdit ? "Edit your story..." : "Create your story..."}
          </Box>
          <TextField
            id="add=blog-title"
            label="Title"
            placeholder="Title"
            color="#888"
            value={title}
            onChange={handleTitleChange}
            onBlur={() => setTitleError(title.trim() === "")}
            error={titleError}
            helperText={titleError ? "This field is required." : ""}
          />
          <TextField
            id="add-blog-desc"
            label="Description"
            placeholder="Tell your story..."
            sx={{
              width: "100%",
              minWidth: 0,
              maxWidth: "100%",
            }}
            color="#888"
            value={desc}
            onChange={handleDescChange}
            onBlur={() => setDescError(desc.trim() === "")}
            error={descError}
            helperText={descError ? "This field is required." : ""}
            multiline
            minRows={2}
            maxRows={6}
          />

          <Box sx={{ width: "100%" }}>
            <InputLabel
              htmlFor="blogImage"
              sx={{ mb: 1, fontWeight: 500, color: "text.primary" }}
            >
              Blog Image
            </InputLabel>
            <Button
              variant="outlined"
              component="label"
              sx={{
                width: "100%",
                justifyContent: "flex-start",
                textTransform: "none",
                borderColor: imageError ? "error.main" : "divider",
                color: image ? "text.primary" : "text.secondary",
                bgcolor: "background.paper",
                "&:hover": {
                  bgcolor: "action.hover",
                  borderColor: "primary.main",
                },
              }}
            >
              {image ? image.name : "Choose an image..."}
              <input
                type="file"
                id="blogImage"
                name="blogImage"
                accept="image/*"
                required
                onChange={handleImageChange}
                hidden
              />
            </Button>
            {imageError && (
              <FormHelperText error>This field is required.</FormHelperText>
            )}
          </Box>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ alignSelf: "flex-end", mt: 2 }}
          >
            {isEdit ? "Update" : "Submit"}
          </Button>
        </Box>
      </Dialog>
      <Snackbar open={snackbarOpen} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity={alertSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default AddDialog;
