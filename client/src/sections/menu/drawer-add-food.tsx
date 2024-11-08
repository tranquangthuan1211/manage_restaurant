import { ArrowBack } from "@mui/icons-material";
import {
  Box,
  Drawer,
  Paper,
  Typography,
  Button,
  TextField,
  TextFieldProps,
  Tabs,
  Tab,
  MenuItem,
} from "@mui/material";
import {Food, initialFood} from "src/types/food"
import { Stack, spacing, styled } from "@mui/system";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import useFunction from "src/hooks/use-function";
import { useFormik } from "formik";
// import { useCategoriesContext } from "src/contexts/danh-muc/categories-context";
// import { useAccountContext } from "src/contexts/tai-khoan/accounts-context";
// import { UploadArea } from "./upload-area";

const NoLabelTextField = styled(TextField)<TextFieldProps>(() => ({
  "& .MuiInputBase-input.MuiFilledInput-input": {
    paddingTop: "8px",
  },
}));

const tabs = [
  {
    label: "Thêm 1 món",
    key: "Thêm 1 món",
  },
  {
    label: "Thêm nhiều món",
    key: "Thêm nhiều món",
  },
];

function FoodEditDrawer({
  open,
  onClose: onCloseParam,
  food,
}: {
  open: boolean;
  onClose: () => void;
  food?: Food;
}) {
//   const { getUnitsApi } = useCategoriesContext();

  const [tab, setTab] = useState(tabs[0].key);
  const onClose = () => {
    onCloseParam();
    setTab(tabs[0].key);
  };

//   const { createAccount, updateAccount, getAccountsOfficerApi } =
//     useAccountContext();

  const handleSubmit = useCallback(
    async (values: Food) => {
      
    },
    []
  );

  const handleSubmitHelper = useFunction(handleSubmit, {
    successMessage: food ? "Cập nhật thành công!" : "Thêm thành công!",
  });

  const formik = useFormik<Food>({
    initialValues: food || initialFood,
    onSubmit: async (values) => {
        const { error } = await handleSubmitHelper.call(values);
        if (!error) {
          formik.setValues(initialFood);
          onClose();
        }
        console.log(values);
    },
  });

  useEffect(() => {
    if (food) {
      formik.setValues(food);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [food]);

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
                <Typography variant="h6">
                  {food ? "Sửa tài khoản" : "Thêm tài khoản mới"}
                </Typography>
              </Box>

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
                <Button variant="contained" color="primary" type="submit">
                  {food ? "Cập nhật" : "Thêm"}
                </Button>
              </Box>
            </Box>
          </Paper>

          <Stack spacing={"16px"} direction={"column"} px={"24px"}>
            {
              <Tabs
                indicatorColor="primary"
                textColor="primary"
                value={tab}
                onChange={(_, value) => setTab(value)}
              >
                {tabs.map((tab) => (
                  <Tab key={tab.key} label={tab.label} value={tab.key} />
                ))}
              </Tabs>
            }

            {tab == tabs[0].key && (
              <>
                <Stack
                  direction={"row"}
                  spacing={"16px"}
                  justifyContent={"space-between"}
                >  
                  <Stack direction={"column"} spacing={"8px"} width={1}>
                    <Typography fontSize={"12px"} fontWeight={500}>
                      Tên món món   
                    </Typography>
                    <NoLabelTextField
                      fullWidth
                      placeholder="Nhập tên tên món..."
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                    />
                  </Stack>
                  <Stack direction={"column"} spacing={"8px"} width={1}>
                    <Typography fontSize={"12px"} fontWeight={500}>
                        Giá bán 
                    </Typography>
                    <NoLabelTextField
                      fullWidth
                      placeholder="Nhập giá bán..."
                      name="price"
                      value={formik.values.price}
                      onChange={formik.handleChange}
                    />
                  </Stack>
                </Stack>

                <Stack
                  direction={"row"}
                  spacing={"16px"}
                  justifyContent={"space-between"}
                >
                  <Stack direction={"column"} spacing={"8px"} width={1}>
                    <Typography fontSize={"12px"} fontWeight={500}>
                        Loại đồ ăn
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Nhập loại đồ ăn..."
                      name="category"
                      value={formik.values.category}
                      onChange={formik.handleChange}
                    />
                  </Stack>
                  <Stack direction={"column"} spacing={"8px"} width={1}>
                    <Typography fontSize={"12px"} fontWeight={500}>
                      Mô tả
                    </Typography>
                    <NoLabelTextField
                      fullWidth
                      placeholder="Mô tả..."
                      name="description"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                    />
                  </Stack>
                </Stack>
                <Stack>
                    {formik.values.image && (
                        <img
                            src={formik.values.image}
                            alt="food"
                            style={{
                                width: "100%",
                                height: "200px",
                                objectFit: "cover",
                                borderRadius: "8px",
                            }}
                        />
                    )}
                </Stack>

              </>
            )}

            {/* {tab == tabs[1].key && (
              <>
                <UploadArea
                  open={false}
                  onClose={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                  type={"officer"}
                />
              </>
            )} */}
          </Stack>
        </form>
      </Drawer>
    </>
  );
}

export default FoodEditDrawer;
