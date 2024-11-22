import { useState } from "react";
import { Box, Button, Drawer, Paper, Stack, styled, Tab, Tabs, TextField, TextFieldProps, Typography } from "@mui/material";
import { Employee,initialEmployee } from "src/types/employee";
import { useFormik } from "formik";
import { ArrowBack } from "@mui/icons-material";
const NoLabelTextField = styled(TextField)<TextFieldProps>(() => ({
    "& .MuiInputBase-input.MuiFilledInput-input": {
      paddingTop: "8px",
    },
  }));
function EmployeeDrawerAdd ({
    open,
    onClose,
    employee,
}: {
    open: boolean;
    onClose: () => void;
    employee?: Employee;
}) {
    const formik = useFormik({
        initialValues: employee || initialEmployee,
        onSubmit: async (values) => {
            // try {
            //     if (employee) {
            //         await updateEmployee(values);
            //     } else {
            //         await createEmployee(values);
            //     }
            //     onClose();
            // } catch (error) {
            //     console.error(error);
            // }
        },
    });
    const tabs = [
        { label: "Thêm nhân viên", key: "Thêm nhân viên" },
        { label: "Sửa nhân viên", key: "Sửa nhân viên" },
    ];
    const [tab, setTab] = useState(tabs[0].key);
    return (
        <Drawer
            anchor="right"
            open={open}
            PaperProps={{
                sx: { width: 640 },
            }}
            onClose={onClose}
            >
            <form onSubmit={formik.handleSubmit}>
                <Paper elevation={5} sx={{ p: 3, borderRadius: 0 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <Box>
                        <Box sx={{ cursor: "pointer" }} onClick={onClose}>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                            <ArrowBack fontSize="small" sx={{ verticalAlign: "middle" }} /> Quay lại
                            </Typography>
                        </Box>
                        <Typography variant="h6">
                            {employee ? "Sửa tài khoản" : "Thêm tài khoản mới"}
                        </Typography>
                        </Box>

                        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                        <Button color="inherit" variant="contained" onClick={onClose}>
                            Hủy bỏ
                        </Button>
                        <Button variant="contained" color="primary" type="submit">
                            {employee? "Cập nhật" : "Thêm"}
                        </Button>
                        </Box>
                    </Box>
                </Paper>

                <Stack spacing={"16px"} direction={"column"} px={"24px"}>
                <Tabs
                    indicatorColor="primary"
                    textColor="primary"
                    value={tab}
                    onChange={(_, value) => setTab(value)}
                >
                    {tabs.map((tabItem) => (
                        <Tab key={tabItem.key} label={tabItem.label} value={tabItem.key} />
                    ))}
                </Tabs>

                {tab === tabs[0].key && (
                    <>
                        <Stack direction={"row"} spacing={"16px"} justifyContent={"space-between"}>
                            <Stack direction={"column"} spacing={"8px"} width={1}>
                            <Typography fontSize={"12px"} fontWeight={500}>
                                Tên Nhân viên
                            </Typography>
                            <NoLabelTextField
                                fullWidth
                                placeholder="Nhập tên nhân viên..."
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                            />
                            </Stack>
                            <Stack direction={"column"} spacing={"8px"} width={1}>
                                <Typography fontSize={"12px"} fontWeight={500}>
                                    Số điện thoại
                                </Typography>
                                <NoLabelTextField
                                    fullWidth
                                    placeholder="Nhập số điện thoại..."
                                    name="price"
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                />
                            </Stack>
                        </Stack>
                        <Stack>
                            <Stack>
                                <Typography fontSize={"12px"} fontWeight={500}>
                                    Email
                                </Typography>
                                <NoLabelTextField
                                    fullWidth
                                    placeholder="Nhập email..."
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                />
                            </Stack>
                        </Stack>
                        <Stack>
                            <Stack>
                                <Typography fontSize={"12px"} fontWeight={500}>
                                    Địa chỉ
                                </Typography>
                                <NoLabelTextField
                                    fullWidth
                                    placeholder="Nhập địa chỉ..."
                                    name="address"
                                    value={formik.values.address}
                                    onChange={formik.handleChange}
                                />
                            </Stack>
                        </Stack>
                    </>
                )}
                </Stack>
            </form>
            </Drawer>
    )
}
export default EmployeeDrawerAdd