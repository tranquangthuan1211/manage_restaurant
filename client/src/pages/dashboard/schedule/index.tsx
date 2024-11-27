import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Page as PageType } from "src/types/page";
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Layout } from 'src/layouts';
import ContentHeader from 'src/sections/dashboard/content-header';

interface ScheduleData {
  name: string;
  shift: string;
  mon: string;
  tue: string;
  wed: string;
  thu: string;
  fri: string;
  sat: string;
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#4a47a3'
    }
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: 14,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700
  }
});

const Page: PageType = () => {

  return (
    <>
      <ContentHeader title="Schedule" />
      <Grid container spacing={2} sx={{ p: 2 }}>
        <Grid item xs={12}>
        </Grid>
        <Grid item xs={12}>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell variant="head" align="center">
                    Mon 19
                  </TableCell>
                  <TableCell variant="head" align="center">
                    Tue 20
                  </TableCell>
                  <TableCell variant="head" align="center">
                    Wed 21
                  </TableCell>
                  <TableCell variant="head" align="center">
                    Thu 22
                  </TableCell>
                  <TableCell variant="head" align="center">
                    Fri 23
                  </TableCell>
                  <TableCell variant="head" align="center">
                    Sat 24
                  </TableCell>
                </TableRow>
              </TableHead>
                <TableBody>
                    {(() => {
                        const rows = [];
                        for (let i = 0; i < 8; i++) {
                        const cells = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'].map((day, dayIndex) => (
                            <TableCell
                            key={dayIndex}
                            align="center"
                            sx={{
                                backgroundColor: 'transparent',
                                color:  'inherit'
                            }}
                            >
                                {/* {row[day as keyof ScheduleData]} */}
                            </TableCell>
                        ));

                        rows.push(<TableRow key={i}>{cells}</TableRow>);
                        }
                        return rows;
                    })()}
                </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
};

Page.getLayout = (page) => <Layout>{page}</Layout>;

export default Page;
