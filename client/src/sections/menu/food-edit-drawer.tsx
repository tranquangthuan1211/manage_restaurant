import { Food } from "src/types/food";
import { useFormik } from "formik";
import { Box, Button, Drawer, Grid, MenuItem, Paper, Stack, styled, TextField, TextFieldProps, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { initialFood } from "src/types/food";
import { use, useCallback, useEffect } from "react";
import { useMenu } from "src/contexts/menu/menu-context";
import useFunction from "src/hooks/use-function";
const NoLabelTextField = styled(TextField)<TextFieldProps>(() => ({
    "& .MuiInputBase-input.MuiFilledInput-input": {
      paddingTop: "8px",
    },
  }));
export const FoodEditDrawer = (
    {
        food,
        open,
        onClose,
    }: {
        food: Food;
        open: boolean;
        onClose: () => void
    }
) => {
    const chooseCategory = [
        {label:"khai vị", value: "khai vị"},
        {label: "món chính", value: "món chính"},
        {label: "tráng miệng", value: "tráng miệng"}, 
        {label:"Hải sản", value: "Hải sản"},  
    ]
    const {updateFood} = useMenu();
    const handleSubmit = useCallback(
        async (values: Food) => {
            if(values._id){
              await updateFood({...values})
            }
        },
        [updateFood]
      );
    
      const handleSubmitHelper = useFunction(handleSubmit, {
        successMessage: food ? "Cập nhật thành công!" : "Thêm thành công!",
      })
    const formik = useFormik({
        initialValues: food || initialFood,
        onSubmit: async (values) => {
            const { error } = await handleSubmitHelper.call(values);
            console.log(error);
            if (!error) {
                formik.setValues(initialFood);
                onClose();
            }
            console.log(values);
        }
    });
    useEffect(() => {
        formik.setValues(food || initialFood);
    },[food])
    return (
        <>
            <Drawer
                anchor="right"
                open={open}
                PaperProps={{
                sx: {
                    width: 640,
                },
                }}
                onClose={onClose}
            >
                <form onSubmit={formik.handleSubmit}>
                    <Paper elevation={5} sx={{ p: 3, borderRadius: 0 }}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                            }}
                        >
                        <Box>
                            <Box sx={{ cursor: "pointer" }} onClick={onClose}>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                <ArrowBack
                                fontSize="small"
                                sx={{
                                    verticalAlign: "middle",
                                }}
                                />{" "}
                                Quay lại
                            </Typography>
                            </Box>
                            {!food && (
                            <Typography variant="h6">Thêm món ăn</Typography>
                            )}
                            {food && (
                            <Typography variant="h6">Sửa món ăn</Typography>
                            )}
                        </Box>
                        <div>
                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 2,
                                    alignItems: "center",
                                }}
                            >
                            <Button color="inherit" variant="contained" onClick={onClose}>
                                Hủy bỏ
                            </Button>

                            {!food && (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    // disabled={handleSubmitHelper.loading}
                                >
                                    Thêm
                                </Button>
                            )}
                            {food && (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    // disabled={handleSubmitHelper.loading}
                                >
                                    Cập nhật
                                </Button>
                            )}
                            </Box>
                        </div>
                        </Box>
                    </Paper>

                    <Stack spacing={2} sx={{ p: 3 }}>
                        <Box>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography
                                        sx={{
                                        fontSize: "0.75rem",
                                        lineHeight: "20px",
                                        fontWeight: 500,
                                        textTransform: "uppercase",
                                        marginBottom: "8px",
                                        }}
                                    >
                                        Tên Món
                                    </Typography>
                                    <NoLabelTextField
                                        fullWidth
                                        name="name"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                    ></NoLabelTextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography
                                        sx={{
                                        fontSize: "0.75rem",
                                        lineHeight: "20px",
                                        fontWeight: 500,
                                        textTransform: "uppercase",
                                        marginBottom: "8px",
                                        }}
                                    >
                                        Giá tiền
                                    </Typography>
                                    <NoLabelTextField
                                        fullWidth
                                        name="price"
                                        value={formik.values.price}
                                        onChange={formik.handleChange}
                                    ></NoLabelTextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        defaultValue="Bác sĩ" 
                                        fullWidth
                                        select
                                        label="Loại món"
                                        margin="normal"
                                        name="category"
                                        type="text"
                                        value={formik.values.category}
                                        onChange={formik.handleChange}
                                    >
                                        {chooseCategory.map((item) => (
                                            <MenuItem key={item.label} value={item.value}>
                                                {item.value}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography
                                        sx={{
                                        fontSize: "0.75rem",
                                        lineHeight: "20px",
                                        fontWeight: 500,
                                        textTransform: "uppercase",
                                        marginBottom: "8px",
                                        }}
                                    >
                                        Mô tả
                                    </Typography>
                                    <NoLabelTextField
                                        fullWidth
                                        name="description"
                                        value={formik.values.description}
                                    ></NoLabelTextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography
                                        sx={{
                                        fontSize: "0.75rem",
                                        lineHeight: "20px",
                                        fontWeight: 500,
                                        textTransform: "uppercase",
                                        marginBottom: "8px",
                                        }}
                                    >
                                        Đánh giá
                                    </Typography>
                                    <NoLabelTextField
                                        fullWidth
                                        name="evaluate"
                                        value={formik.values.evaluate}
                                    ></NoLabelTextField>
                                </Grid>
                            </Grid>
                        </Box>
                    </Stack>
                </form>
            </Drawer>
        </>
    )
}