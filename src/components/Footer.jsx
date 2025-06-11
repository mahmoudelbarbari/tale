import { Container, Grid, Typography, Link, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";

const FooterContainer = styled("footer")(({ theme }) => ({
  backgroundColor: theme.palette.footer.background,
  padding: theme.spacing(4, 0),
  borderTop: `1px solid ${theme.palette.divider}`,
}));

const footerLinks = [
  { path: "https://facebook.com", icon: <FacebookOutlinedIcon /> },
  { path: "https://x.com", icon: <XIcon /> },
  { path: "https://instagram.com", icon: <InstagramIcon /> },
];

const Footer = () => {
  return (
    <FooterContainer>
      <Container maxWidth="lg">
        <Grid container direction="column" alignItems="center" spacing={2}>
          <Typography
            variant="h2"
            color="textSecondary"
            align="center"
            sx={{ mt: 2 }}
          >
            Tale
          </Typography>
          <Grid item>
            <Grid
              direction="row"
              spacing={2}
              justifyContent={"center"}
              container
            >
              {footerLinks.map(({ path, icon }) => (
                <Link
                  key={path}
                  href={path}
                  variant="body1"
                  color="textSecondary"
                  underline="hover"
                >
                  {icon}
                </Link>
              ))}
            </Grid>
            <Typography
              variant="body2"
              color="textSecondary"
              align="center"
              sx={{ mt: 2 }}
            >
              © 2025 Pied Piper. All rights reserved.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
