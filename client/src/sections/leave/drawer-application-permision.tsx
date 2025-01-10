import { use, useState,useEffect } from "react";
import { Box, Button, Drawer, Paper, Stack, styled, Tab, Tabs, TextField, TextFieldProps, Typography } from "@mui/material";
import { Employee,initialEmployee } from "src/types/employee";
import { useFormik } from "formik";
import { ArrowBack } from "@mui/icons-material";
import { useEmployee } from "src/contexts/employee/employee-context";
import DocViewer from "src/components/\bdoc-view";
import { Leave } from "src/types/leave";
const NoLabelTextField = styled(TextField)<TextFieldProps>(() => ({
    "& .MuiInputBase-input.MuiFilledInput-input": {
      paddingTop: "8px",
    },
  }));
function ApplicationDrawer({
    open,
    onClose,
    leave,
}: {
    open: boolean;
    onClose: () => void;
    leave?: Leave;
}) {
    return (
        <Drawer
            anchor="right"
            open={open}
            PaperProps={{
                sx: { width: 640 },
            }}
            onClose={onClose}
            >
                <Paper elevation={5} sx={{ p: 3, borderRadius: 0 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <Box>
                        <Box sx={{ cursor: "pointer" }} onClick={onClose}>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                            <ArrowBack fontSize="small" sx={{ verticalAlign: "middle" }} /> Quay lại
                            </Typography>
                        </Box>
                        </Box>

                        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                        <Button color="inherit" variant="contained" onClick={onClose}>
                            Hủy bỏ
                        </Button>
                        </Box>
                    </Box>
                </Paper>

                        <DocViewer
                            fileUrl="/docs/DON-XIN-NGHI-OM.docx"
                            onContentTransform={(content) =>
                                content
                                .replace(/{{name}}/g, "Nguyễn Văn B")
                                .replace(/{{date}}/g, "13/12/2024")
                                .replace(/{{date_quantity}}/g, "1")
                                .replace(/{{description}}/g, "Đi khám bệnh")
                            }
                            style={{ width: '100%'}}
                        />
            </Drawer>
    )
}
export default ApplicationDrawer