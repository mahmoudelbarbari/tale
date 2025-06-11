import { useState } from "react";
import {
  Dialog,
  Fab,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  Button,
  TextField,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function AddDialog({ children }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [titleError, setTitleError] = useState(false);
  const [descError, setDescError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const theme = useTheme();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const isTitleError = title.trim() === "";
    const isDescError = desc.trim() === "";
    const isImageError = !image;
    setTitleError(isTitleError);
    setDescError(isDescError);
    setImageError(isImageError);
    if (!isTitleError && !isDescError && !isImageError) {
      // Submit logic here
      handleClose();
      setTitle("");
      setDesc("");
      setImage(null);
    }
  };
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <Fab
        sx={{ position: "fixed", right: 16, bottom: 16, zIndex: 1000 }}
        color="primary"
        onClick={handleOpen}
      >
        {children || <AddIcon />}
      </Fab>
      <Dialog
        open={open}
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
              borderBottom: `2px solid ${theme.palette.border.bottom}`,
              p: 1,
            }}
          >
            Create you story...
          </Box>
          <FormControl required error={titleError}>
            <InputLabel htmlFor="add-blog-title">Title</InputLabel>
            <OutlinedInput
              id="add-blog-title"
              color="#888"
              placeholder="Tell your story..."
              value={title}
              onChange={handleTitleChange}
              label="Title"
              onBlur={() => setTitleError(title.trim() === "")}
            />
            {titleError && (
              <FormHelperText>This field is required.</FormHelperText>
            )}
          </FormControl>

          <TextField
            id="add-blog-desc"
            color="#888"
            label="Description"
            placeholder="Tell your story..."
            sx={{
              overflow: "auto",
              resize: { xs: "vertical", sm: "both" },
              width: "100%",
              minWidth: 0,
              maxWidth: "100%",
            }}
            value={desc}
            onChange={handleDescChange}
            onBlur={() => setDescError(desc.trim() === "")}
            error={descError}
            helperText={descError ? "This field is required." : ""}
            multiline
            minRows={2}
            maxRows={6}
            required
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
            Submit
          </Button>
        </Box>
      </Dialog>
    </>
  );
}

export default AddDialog;
