import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  TextField,
  MenuItem,
} from "@mui/material";
import { Food } from "src/types/food";
import MenuApi from "src/api/menu";
import useFunction from "src/hooks/use-function";
import { ConfirmDialog } from "src/components/confirm-dialog";
import { useDialog } from "src/hooks/use-dialog";
import { Appointment } from "src/types/appointment";
const tab = [
    {key: "main", label: "Món chính"},
    {key: "drink", label: "Nước uống"},
    {key: "dessert", label: "Tráng miệng"},
    {key: "other", label: "Khác"},
]
const ProductPage = () => {
    const [activeTab, setActiveTab] = useState("main");
    const menuApi = useFunction(MenuApi.getMenu);
    useEffect(() => {
        menuApi.call(new FormData())
    },[])
    const foods = useMemo(() => {
        return menuApi.data?.data || []
    },[menuApi])
    const dialogOrder = useDialog<Appointment>();
  return (
    <Box sx={{ p: 2 }}>
        <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12} md={4}>
                <Box
                sx={{
                    backgroundImage: `url('/images/ruou.jpg')`, 
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    color: "white",
                    height: "300px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    p: 2,
                }}
                >
                <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
                    THỨC ĂN SẠCH 20%
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                    Rượu Vang
                </Typography>
                <Button
                    variant="contained"
                    sx={{
                    mt: 2,
                    fontWeight: "bold",
                    backgroundColor: "black",
                    "&:hover": { backgroundColor: "#333" },
                    }}
                >
                    MUA NGAY
                </Button>
                </Box>
            </Grid>
            <Grid item xs={12} md={4}>
                <Box
                sx={{
                    backgroundImage: `url('/images/lemon_dessert_1.jpg')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    color: "white",
                    height: "300px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    p: 2,
                }}
                >
                <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
                    THỨC ĂN SẠCH 20%
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                    Tráng miệng ngon với bánh ngọt
                </Typography>
                <Button
                    variant="contained"
                    sx={{
                    mt: 2,
                    fontWeight: "bold",
                    backgroundColor: "black",
                    "&:hover": { backgroundColor: "#333" },
                    }}
                >
                    MUA NGAY
                </Button>
                </Box>
            </Grid>
            <Grid item xs={12} md={4}>
                <Box
                sx={{
                    backgroundImage: `url('/images/chicken.jpeg')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    color: "white",
                    height: "300px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    p: 2,
                }}
                >
                <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
                    THỨC ĂN SẠCH 30%
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                    Thực phẩm Tươi
                </Typography>
                <Button
                    variant="contained"
                    sx={{
                    mt: 2,
                    fontWeight: "bold",
                    backgroundColor: "black",
                    "&:hover": { backgroundColor: "#333" },
                    }}
                >
                    MUA NGAY
                </Button>
                </Box>
            </Grid>
        </Grid>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
          DANH MỤC SẢN PHẨM
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            {tab.map((item, index) => (
                <Button
                key={index}
                variant="contained"
                color={activeTab === item.key ? "primary" : "inherit"}
                onClick={() => setActiveTab(item.key)}
                >
                {item.label}
                </Button>
            ))}
        </Box>
      </Box>
      <Grid container spacing={3}>
        {foods.map((product, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ textAlign: "center" }}>
              <CardMedia
                component="img"
                image={typeof product.image === 'string' ? product.image : URL.createObjectURL(product.image)}
                alt={product.name}
                sx={{ height: 200 }}
              />
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="h5" color="success">
                  {product.price}
                </Typography>
                <Box
                    sx = {{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Button 
                        variant="contained" 
                        color="primary"
                        sx = {{
                            fontSize: "12px",
                        }}
                        onClick={() => dialogOrder.handleOpen()}
                    >
                        Đặt ngay
                    </Button>
                    <Button 
                        variant="contained" 
                        color="secondary"
                        sx = {{
                            fontSize: "12px",
                        }}
                    >
                        Xem chi tiết
                    </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <ConfirmDialog
        open={dialogOrder.open}
        onCancel={dialogOrder.handleClose}
        title="Đặt món"
        content="Bạn có muốn đặt món này không?"
        children={
            <Box>
                <TextField
                    label="Chọn bàn"
                    variant="outlined"
                    fullWidth
                    type="number"
                    sx={{ mt: 2 }}
                >
                    <MenuItem value={1}>Bàn 1</MenuItem>
                </TextField>
            </Box>
        }
      />
    </Box>
  );
};

export default ProductPage;
