import React, { useState, useMemo } from "react"
import {Page as PageType} from "src/types/page"
import { Layout } from "src/layouts/index"
import ContentHeader from 'src/sections/dashboard/content-header';
import { Stack, Box, Button, Tabs, Tab } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AddIcon from '@mui/icons-material/Add';
import {FoodTabel} from "src/sections/menu/table-food";
import FoodEditDrawer from "src/sections/menu/drawer-add-food";
import { useDrawer } from "src/hooks/use-drawer";
import { Food } from "src/types/food";
import MenuProvider, {useMenu} from "src/contexts/menu/menu-context";
import { get } from "lodash";
let tabs = [
  {
    label: "Đồ ĂN",
    key: "Đồ ĂN",
  },
  {
    label: "ĐỒ UỐNG",
    key: "ĐỒ UỐNG",
  },
];
const Page:PageType = () => {
    const [tab, setTab] = useState(tabs[0].key);
    const editDrawer = useDrawer<Food>();
    const {getMenu} = useMenu();
    const foods = useMemo(() => {
      return getMenu.data;
    },[getMenu.data]);
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
                    {
                      <>
                        <Button
                          variant="outlined"
                          color="primary"
                          startIcon={<UploadFileIcon  />}
                        >
                          Import danh sách TK
                        </Button>
        
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<AddIcon />}
                          onClick={() => {
                            editDrawer.handleOpen();
                          }}
                        >
                          Thêm tài khoản
                        </Button>
                      </>
                    }
                    </Box>
                  }
                  tabs={
                    <Tabs
                        indicatorColor="primary"
                        textColor="primary"
                        value={tab}
                        onChange={(_, value) => setTab(value)}
                        sx={{ height: "48px" }}
                    >
                        {tabs.map((tab) => (
                        <Tab key={tab.key} label={tab.label} value={tab.key} />
                        ))}
                    </Tabs>
                }
            />
            {tab === tabs[0].key && (
              <Stack 
                spacing={2}
                sx = {{
                  backgroundColor:"#ccc"
                }}
              >
                <FoodTabel
                  foods={foods?.data || []}
                />
              </Stack>
            )}  
            {tab === tabs[1].key && (
              <>
                <h1>tabl2</h1>
              </>
            )}
            <FoodEditDrawer 
                open = {editDrawer.open}
                onClose={editDrawer.handleClose}
                food={editDrawer.data}
            />

        </Stack>
    )
}

Page.getLayout = (page) => 
<Layout>
  <MenuProvider>
    {page}
  </MenuProvider>
</Layout>

export default Page;