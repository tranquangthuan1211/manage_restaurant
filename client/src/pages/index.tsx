import { type Page as PageType } from "../types/page";
import { Stack } from "@mui/material";
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Grid, Card, CardMedia, CardContent, Container } from '@mui/material';

const Page: PageType= () => {
  return (
    <Stack spacing={2}
        sx = {{
            backgroundImage: 'url(/images/homepage_bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh',
            width: '100%',
            alignItems:'center'
        }}
    >
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            BABY HIPPO RESTAURANT
          </Typography>
          <Button color="inherit">Home</Button>
          <Button color="inherit">About</Button>
          <Button color="inherit">Sign In & Sign Up</Button>
        </Toolbar>
      </AppBar>

      <Container>
        <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ marginTop: '30px' }}>
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <Typography variant="h4" style={{ fontWeight: 'bold', marginBottom: '20px' }}>
              Welcome to Baby Hippo Restaurant!!!
            </Typography>
            <Typography variant="h6" style={{ marginBottom: '20px' }}>
              Here we offer a variety of delicious dishes:
            </Typography>
            <Typography variant="h5" style={{ color: 'green', fontStyle: 'italic', marginBottom: '40px' }}>
              elegant Western cuisine...
            </Typography>
          </Grid>

          <Grid container spacing={4} justifyContent="center">
            {/* Dish 1 */}
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image="/images/western1.png" 
                  alt="Dish 1"
                />
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image="/images/western3.png"
                  alt="Dish 2"
                />
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image="/images/western4.png"
                  alt="Dish 3"
                />
              </Card>
            </Grid>
          </Grid>


          <Grid item xs={12} style={{ textAlign: 'center', marginTop: '40px' }}>
            <Button variant="contained" color="success" size="large">
              About us
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Stack>
  );
};

export default Page;
