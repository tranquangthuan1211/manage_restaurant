import { type Page as PageType } from "../types/page";
import { Stack } from "@mui/material";
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Grid, Card, CardMedia, CardContent, Container, Box } from '@mui/material';
import { TabBar } from "src/layouts/tab_bar";
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import { useMediaQuery } from "@mui/material";
import { styled, Theme } from "@mui/material/styles";
interface Image {

}
const Page: PageType= () => {
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));
  return (
    <TabBar>
      <Stack spacing={2}
          sx = {{
            display: "flex",
            flex: "1 1 auto",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",

            "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: "url(/images/homepage_bg.jpg)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            zIndex: 0,
            }
          }}
      >
        <Container 
          sx={{
            zIndex: 1,
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            color: "white",
            height: "100%",
            width: "100%",
          }}
        >
          <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ marginTop: '30px' }}>
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{  
                fontWeight: 'bold', 
                mb: 1, 
                color: '#FFFA0A', 
                fontFamily: 'Arial', 
                fontSize: { xs: '1.5rem', md: '2.5rem' } }}>
                  Welcome to Baby Hippo restaurant!!!
                  Here we offer a variety of delicious dishes:
              </Typography>
              <Typography variant="h4" sx={{  
                fontWeight: 'bold', 
                mb: 1, 
                color: '#70F570', 
                fontFamily: 'Arial',
                fontStyle: 'italic', 
                fontSize: { xs: '1.5rem', md: '2.5rem' } }}>
                  elegant Western cuisine...
              </Typography>
            </Grid>
              <Grid container spacing={4} justifyContent="center">
                {/* Dish 1 */}
                <Grid item xs={12} sm={6} md={2}> {/* Thay đổi từ md={3} thành md={2} */}
                  <Card>
                    <CardMedia
                      component="img"
                      height="300"
                      image="/images/western3.png"
                      alt="Dish 1"
                    />
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={2}> 
                  {lgUp ? (
                    <Card sx={{ backgroundColor: 'transparent' }}>
                      <Box
                        sx={{
                          height: '300px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          backgroundColor: 'transparent',
                        }}
                      >
                        <Box sx={{ flex: 1, backgroundColor: 'transparent' }}></Box>
                        <CardMedia
                          component="img"
                          height="150"
                          image="/images/western4.png"
                          alt="Dish 2"
                        />
                      </Box>
                    </Card>
                  ): (
                    <Card>
                      <CardMedia
                        component="img"
                        height="300"
                        image="/images/western4.png"
                        alt="Dish 2"
                      />
                    </Card>
                  )}
                </Grid>
                {lgUp && (
                  <Grid item xs={12} sm={6} md={2}> 
                    <Card sx={{ backgroundColor: 'transparent' }}>
                      <Box
                        sx={{
                          height: '300px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          backgroundColor: 'transparent',
                          alignItems: 'center'
                        }}
                      >
                        <Box sx={{ flex: 1, backgroundColor: 'transparent' }}></Box>
                        <ArrowDropDownCircleIcon sx={{ 
                          justifyContent: 'center',
                          alignItems: 'center',
                          fontSize: 50, color: 'green' 
                          }} />
                      </Box>
                    </Card>
                  </Grid>
                )}
                <Grid item xs={12} sm={6} md={2}> 
                  {lgUp ? (
                    <Card sx={{ backgroundColor: 'transparent' }}>
                      <Box
                        sx={{
                          height: '300px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          backgroundColor: 'transparent',
                        }}
                      >
                        <Box sx={{ flex: 1, backgroundColor: 'transparent' }}></Box>
                        <CardMedia
                          component="img"
                          height="150"
                          image="/images/western1.png"
                          alt="Dish 2"
                        />
                      </Box>
                    </Card>
                  ): (
                    <Card>
                      <CardMedia
                        component="img"
                        height="300"
                        image="/images/western1.png"
                        alt="Dish 2"
                      />
                    </Card>
                  )}
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="300"
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
    </TabBar>
  );
};

export default Page;