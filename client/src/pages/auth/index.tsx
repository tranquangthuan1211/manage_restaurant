import { type Page as PageType } from "src/types/page";
import React, { useState } from 'react';
import { Typography, Button, Box, TextField, Container, IconButton, Stack, Tab } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { TabBar } from "src/layouts/tab_bar";
import { AuthLogin } from "src/sections/auth/auth-login";
import { RegisterLogin } from "src/sections/auth/auth-register";
import { Layout as AuthLayout } from "src/layouts/auth/classic-layout";
import { Issuer } from "src/utils/auth";
import { IssuerGuard } from "src/guards/issuer-guard";
import { GuestGuard } from "src/guards/guest-guard";

const Page: PageType = () => {
  const [showSignIn, setShowSignIn] = useState(true);
  const handleSignInClick = () => {
    setShowSignIn(true);
  };

  const handleCloseClick = () => {
    setShowSignIn(false);
  };

  return (
    <TabBar>
      <Box
        sx={{
          display: "flex",
          flex: "1 1 auto",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: "url(/images/login_bg.jpg)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            zIndex: 0,
          },
        }}
      >
        <Container
          sx={{
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: '20px',
          }}
        >

        <Stack
            sx={{
                position: 'absolute',
                top: '50%',
                left: { xs: '50%', lg: 'calc(50% + 300px)' },
                transform: 'translate(-50%, -50%)',
            }}
        >
          <Stack
            direction="row"
            spacing={2}
            sx={{
              padding: '20px',
              zIndex: 2,
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#FFD700',
                color: 'black',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#FFC107',
                },
              }}
              onClick={handleSignInClick}
            >
              Sign in
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#FFD700',
                color: 'black',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#FFC107',
                },
              }}
              onClick={handleCloseClick}
            >
              Sign up
            </Button>
          </Stack>
          {showSignIn ? <AuthLogin /> : <RegisterLogin />}
        </Stack>

        </Container>
      </Box>
    </TabBar>
  );
};
Page.getLayout = (page) => 
<IssuerGuard issuer={Issuer.JWT}>
  <GuestGuard>
    <AuthLayout>{page}</AuthLayout>
  </GuestGuard>
</IssuerGuard>
export default Page;
