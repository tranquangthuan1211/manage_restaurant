import { useState } from "react";
import { CustomTable } from "src/components/custom-table";
import {getComplaintConfig} from "./table-config-complaint"
import styled from "@emotion/styled";
import { TableCell, TableRow, TextField, TextFieldProps } from "@mui/material";
import usePagination from "src/hooks/use-pagination";
import { Complaint } from "src/types/complaint";
const NoLabelTextField = styled(TextField)<TextFieldProps>(() => ({
    "& .MuiInputBase-input.MuiFilledInput-input": {
      paddingTop: "8px",
    },
}));
export const ComplaintTable = ({
    complaints,
    loading
}:{
    complaints:Complaint[]
    loading?:boolean
}) => {
    const pagination = usePagination({ count: complaints.length });
    const [filter, setFilter] = useState<Partial<Omit<Complaint, "id">>>({});
    const configs = getComplaintConfig()
    return (
        <>
            <CustomTable
                configs = {configs}
                loading = {loading}
                rows={complaints.slice(
                    pagination.page * pagination.rowsPerPage,
                    pagination.page * pagination.rowsPerPage + pagination.rowsPerPage
                )}
                additionalTopRow={
                    <TableRow
                        sx={{
                            ".MuiTableCell-root": {
                            background: (theme) => theme.palette.neutral[100],
                            },
                        }}
                        >
                        <TableCell align="center">
                            <NoLabelTextField
                            fullWidth
                            ></NoLabelTextField>
                        </TableCell>
                        <TableCell align="center">
                            <NoLabelTextField
                                fullWidth
                                  value={filter.user_name}
                                  onChange={(e) =>
                                    setFilter({ ...filter, user_name: e.target.value })
                                  }
                            ></NoLabelTextField>
                        </TableCell>
            
                        <TableCell align="center">
                            <NoLabelTextField
                            fullWidth
                            ></NoLabelTextField>
                        </TableCell>
            
                        <TableCell align="center">
                            <NoLabelTextField
                            fullWidth
                            ></NoLabelTextField>
                        </TableCell>
                        <TableCell align="center"/>
                        <TableCell align="center"/>
                        <TableCell align="center"/>
                        <TableCell align="center"/>
                    </TableRow>
                }
                    
            />
        </>
    )
}
