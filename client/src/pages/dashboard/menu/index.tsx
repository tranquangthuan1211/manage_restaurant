import React, { useState, useMemo } from "react";
import { Page as PageType } from "src/types/page";
import { Layout } from "src/layouts/index";
import ContentHeader from "src/sections/dashboard/content-header";
import { Stack, Box, Button } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AddIcon from "@mui/icons-material/Add";
import { FoodTabel } from "src/sections/menu/table-food";
import FoodEditDrawer from "src/sections/menu/drawer-add-food";
import { useDrawer } from "src/hooks/use-drawer";
import { Food } from "src/types/food";
import MenuProvider, { useMenu } from "src/contexts/menu/menu-context";

const Page: PageType = () => {
  const editDrawer = useDrawer<Food>();
  const { getMenu, updateFood } = useMenu();
  const foods = useMemo(() => {
    return getMenu.data;
  }, [getMenu.data]);

  return (
    <Stack spacing={2}>
      <ContentHeader
        title="Menu"
        rightSection={
          <Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
              height: "40px",
              padding: "0 16px",
            }}
          >
            <>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<UploadFileIcon />}
              >
                Import danh sách món ăn
              </Button>

              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => {
                  editDrawer.handleOpen();
                }}
              >
                Thêm thức ăn
              </Button>
            </>
          </Box>
        }
      />
      <Stack
        spacing={2}
        sx={{
          backgroundColor: "#ccc",
        }}
      >
        <FoodTabel foods={foods?.data || []} loading={getMenu.loading} />
      </Stack>
      <FoodEditDrawer
        open={editDrawer.open}
        onClose={editDrawer.handleClose}
        food={editDrawer.data}
      />
    </Stack>
  );
};

Page.getLayout = (page) => (
  <Layout>
    <MenuProvider>{page}</MenuProvider>
  </Layout>
);

export default Page;
