// import { CustomTable } from "src/components/custom-table";
// import { getFoodConfig } from "src/sections/menu/table-config-food";
// import usePagination from 'src/hooks/use-pagination';
// import {Stack, styled, TableCell, TablePagination, TableRow, TextField, TextFieldProps} from "@mui/material"
// import {Food} from "src/types/food";

// const NoLabelTextField = styled(TextField)<TextFieldProps>(() => ({
//     "& .MuiInputBase-input.MuiFilledInput-input": {
//       paddingTop: "8px",
//     },
//   }));
// export const FoodTabel = ({
//     // filter,
//     // onChangeFilter,
//     foods
//   }: {
//     // filter: FoodFilter;
//     // onChangeFilter: (filter: FoodFilter) => void;
//     foods: Food[];
// }) => {
//     const configs = getFoodConfig();
//     const pagination = usePagination({ count: foods.length });
//     console.log(foods);
//     return (
//         <Stack>
//             <CustomTable
//                 configs={configs}
//                 rows={foods}
//                 pagination={pagination}
//                 additionalTopRow = {
//                     <TableRow
//                         sx={{
//                             ".MuiTableCell-root": {
//                             background: (theme) => theme.palette.neutral[100],
//                             },
//                         }}
//                         >
            
//                         <TableCell align="center">
//                             <NoLabelTextField
//                             fullWidth
//                             //   value={filter.name}
//                             //   onChange={(e) =>
//                             //     onChangeFilter({ ...filter, name: e.target.value })
//                             //   }
//                             ></NoLabelTextField>
//                         </TableCell>
            
//                         <TableCell align="center">
//                             <NoLabelTextField
//                             fullWidth
//                             ></NoLabelTextField>
//                         </TableCell>
            
//                         <TableCell align="center">
//                             <NoLabelTextField
//                             fullWidth
//                             ></NoLabelTextField>
//                         </TableCell>
//                         <TableCell align="center">
//                             <NoLabelTextField
//                             fullWidth
//                             ></NoLabelTextField>
//                         </TableCell>
//                         <TableCell align="center">
//                             <NoLabelTextField
//                             fullWidth
//                             ></NoLabelTextField>
//                         </TableCell>
//                         <TableCell align="center">
//                             <NoLabelTextField
//                             fullWidth
//                             ></NoLabelTextField>
//                         </TableCell>
//                         <TableCell align="center">
//                             <NoLabelTextField
//                             fullWidth
//                             ></NoLabelTextField>
//                         </TableCell>
//                         <TableCell align="center">
//                             <NoLabelTextField
//                             fullWidth
//                             ></NoLabelTextField>
//                         </TableCell>
//                     </TableRow>
//                 }
//             />
//             <TablePagination
//                 component="div"
//                 count={0} 
//                 page={pagination.totalPages} 
//                 onPageChange={pagination.onPageChange} 
//                 rowsPerPage={pagination.rowsPerPage} 
//                 onRowsPerPageChange={pagination.onRowsPerPageChange} 
//                 rowsPerPageOptions={[2, 10, 25, 100]}
//                 sx={{
//                     position: "fixed",
//                     bottom: 0,
//                     right: 0,
//                     left: 0,
//                     marginTop:"100px",
//                     bgcolor: "secondary.lightest",
//                     borderTop: "1px solid",
//                     borderColor: "divider",
//                     zIndex: 0,
//                 }}
//             />
//         </Stack>
//     )
// }

//GPT
import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Typography } from "@mui/material";
import { Food } from "src/types/food";

interface FoodTableProps {
  foods: Food[];
  loading?: boolean;
  error?: string | null;
}

export const FoodTabel: React.FC<FoodTableProps> = ({ foods, loading, error }) => {
  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {foods.map((food) => (
            <TableRow key={food.id}>
              <TableCell>{food.id}</TableCell>
              <TableCell>{food.name}</TableCell>
              <TableCell>{food.price}</TableCell>
              <TableCell>{food.category}</TableCell>
              <TableCell>{food.status}</TableCell>
              <TableCell>{food.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
