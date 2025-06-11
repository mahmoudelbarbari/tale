import React, { useState } from "react";
import {
  Dialog,
  Button,
  Box,
  TextField,
  Typography,
  useMediaQuery,
  Stack,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import heroImg from "@/assets/images/hero.png";

export default function LoginPopover({ children }) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button sx={{ mx: 1 }} onClick={handleOpen}>
        {children || "Login"}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen={fullScreen}
        maxWidth="lg"
        fullWidth
      >
        <Box sx={{ p: { xs: 1, sm: 4 } }}>
          <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={0}
            alignItems="stretch"
            justifyContent="center"
            sx={{ minHeight: { sm: 400 }, height: { sm: 400 } }}
          >
            <Box
              component="img"
              src={heroImg}
              alt="Hero"
              sx={{
                width: { xs: "100%", sm: "50%" },
                height: { xs: 200, sm: 400 },
                objectFit: "cover",
                borderRadius: { xs: 2, sm: "16px 0 0 16px" },
                display: "block",
              }}
            />
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                px: { xs: 0, sm: 4 },
                py: { xs: 2, sm: 0 },
              }}
            >
              <TextField label="Email" fullWidth margin="normal" color="#888" />
              <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                color="#888"
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Login
              </Button>
            </Box>
          </Stack>
        </Box>
      </Dialog>
    </>
  );
}
