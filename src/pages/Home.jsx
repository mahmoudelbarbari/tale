import { Box, Button, Grid, Stack, Typography, useTheme } from "@mui/material";
import heroSectionImgLight from "@/assets/images/tale-hero.png";
import heroSectionImgDark from "@/assets/images/tale-hero-dark.png";
import AddDialog from "../components/AddDialog";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

// Example data
const items = [
  {
    img: heroSectionImgLight,
    title: "Hope dies last",
    sub: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas dui id ornare arcu odio ut sem. Cras ornare arcu dui vivamus arcu felis bibendum ut. Porttitor leo a diam.",
    editIcon: <ModeEditIcon />,
    deleteIcon: <DeleteOutlineIcon />,
  },
  {
    img: heroSectionImgLight,
    title: "Hope dies last",
    sub: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas dui id ornare arcu odio ut sem. Cras ornare arcu dui vivamus arcu felis bibendum ut. Porttitor leo a diam.",
    editIcon: <ModeEditIcon />,
    deleteIcon: <DeleteOutlineIcon />,
  },
  {
    img: heroSectionImgLight,
    title: "Hope dies last",
    sub: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas dui id ornare arcu odio ut sem. Cras ornare arcu dui vivamus arcu felis bibendum ut. Porttitor leo a diam.",
    editIcon: <ModeEditIcon />,
    deleteIcon: <DeleteOutlineIcon />,
  },
  // Add more items as needed
];

function Home() {
  const theme = useTheme();
  const heroImg =
    theme.palette.mode === "dark" ? heroSectionImgDark : heroSectionImgLight;

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
                  p: 2,
                  gap: 3,
                  minHeight: 150,
                  width: "100%",
                  maxWidth: 1800,
                  mx: "auto",
                  bgcolor: "background.paper",
                  borderRadius: 2,
                }}
              >
                <Box
                  component="img"
                  src={item.img}
                  alt={item.title}
                  sx={{
                    width: 240,
                    height: 240,
                    objectFit: "cover",
                    borderRadius: 1,
                    flexShrink: 0,
                  }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h5" fontWeight={700} gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {item.sub}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    position: "absolute",
                    right: 16,
                    bottom: 16,
                    display: "flex",
                    gap: 1,
                  }}
                >
                  <Button sx={{ color: theme.palette.warning.main }}>
                    {item.editIcon}
                  </Button>
                  <Button sx={{ color: theme.palette.error.main }}>
                    {item.deleteIcon}
                  </Button>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      <AddDialog />
    </>
  );
}

export default Home;
