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
import { Food, initialFood } from "src/types/food";
import { Stack, styled } from "@mui/system";
import React, { use, useCallback, useEffect, useMemo, useState } from "react";
import { useMenu } from "src/contexts/menu/menu-context";
import useFunction from "src/hooks/use-function";
import { useFormik } from "formik";
import CategoryApi from "src/api/category";

// Styled component for consistent TextField styling
const NoLabelTextField = styled(TextField)<TextFieldProps>(() => ({
  "& .MuiInputBase-input.MuiFilledInput-input": {
    paddingTop: "8px",
  },
}));

// Tabs for single or multiple food addition
const tabs = [
  { label: "Thêm 1 món", key: "Thêm 1 món" },
  { label: "Thêm nhiều món", key: "Thêm nhiều món" },
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
  const { updateFood, createFood } = useMenu();
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null); // State to store selected file
  const [tab, setTab] = useState(tabs[0].key);

  const onClose = () => {
    onCloseParam();
    setTab(tabs[0].key);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(selectedFile);
      formik.setFieldValue("image", selectedFile); 
    }
  };
  const categoryApi = useFunction(CategoryApi.getCategory);
  useEffect(() => {
    categoryApi.call(new FormData())
  },[])
  const categoriesBase = useMemo(() => {
    return categoryApi.data?.data || []
  },[categoryApi])
  const handleSubmit = useCallback(
    async (values: Food) => {
      values.detail_category = categoriesBase.find((category) => category._id === values.category)?.name;
      if (values._id) {
        await updateFood(values);
      } else {
        // Ensure `image` is updated from `file`
        if (!values.image && file) {
          values.image = file;
        }
        console.log(values)
        await createFood(values);
      }
    },
    [updateFood, createFood, file]
  );

  const handleSubmitHelper = useFunction(handleSubmit, {
    successMessage: food ? "Cập nhật thành công!" : "Thêm thành công!",
  });

  const categories = useMemo(() => {
    return categoriesBase.map((category) => ({
      value: category._id,
      label: category.name,
    }));
  }, [categoriesBase]);

  const formik = useFormik<Food>({
    initialValues: food || initialFood,
    onSubmit: async (values) => {
      const { error } = await handleSubmitHelper.call(values);
      if (!error) {
        formik.setValues(initialFood);
        setFile(null); // Reset file
        setPreview(null); // Reset preview
        onClose();
      }
      // console.log(values)
    },
  });

  useEffect(() => {
    if (food) {
      formik.setValues(food);
      setPreview(food.image ? URL.createObjectURL(food.image as unknown as File) : null);
    } else {
      formik.setValues(initialFood);
    }
  }, [food]);

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
                {food ? "Sửa tài khoản" : "Thêm tài khoản mới"}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
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
                    Tên món
                  </Typography>
                  <NoLabelTextField
                    fullWidth
                    placeholder="Nhập tên món..."
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

              <Stack direction={"row"} spacing={"16px"} justifyContent={"space-between"}>
                <Stack direction={"column"} spacing={"8px"} width={1}>
                  <Typography fontSize={"12px"} fontWeight={500}>
                    Loại món
                  </Typography>
                  <TextField
                    fullWidth
                    select
                    name="category"
                    value={formik.values.category}
                    onChange={formik.handleChange}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category.value} value={category.value}>
                        {category.label}
                      </MenuItem>
                    ))}
                  </TextField>
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
                <TextField
                  type="file"
                  fullWidth
                  name="image"
                  onChange={handleFileChange}
                />
                {preview && (
                  <Box
                    sx={{
                      width: "100%",
                      height: 200,
                      overflow: "hidden",
                      border: "2px solid #000",
                      display: "flex",
                      mx: "auto",
                    }}
                  >
                    <img
                      src={preview}
                      alt="Preview"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </Box>
                )}
              </Stack>
            </>
          )}
        </Stack>
      </form>
    </Drawer>
  );
}

export default FoodEditDrawer;
