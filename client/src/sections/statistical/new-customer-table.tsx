
import {FC, useMemo} from 'react';
import getNewCustomerConfig from './newCustomer-table-config';
import {CustomTable} from 'src/components/custom-table';
import usePagination from 'src/hooks/use-pagination';
import {NewCustomer} from 'src/types/new-customer';
import { ConfirmDialog } from 'src/components/confirm-dialog';
import { useDialog } from 'src/hooks/use-dialog';
import CustomDrawer from 'src/components/custom-drawer';
import { useDrawer } from 'src/hooks/use-drawer';
interface CustomerProps {
    newCustomers: NewCustomer[];
}
import { Box, Stack, TablePagination, TextField } from '@mui/material';
export const NewCustomerTable: FC<CustomerProps> = 
(
    {
        newCustomers,
    }
) => {
    const deleteDialog = useDialog();
    const editDrawer = useDrawer<NewCustomer>();
    const configs = getNewCustomerConfig();
    const pagination = usePagination({ count: 20 });
    return (
    <>
        <CustomTable
            configs = {configs}
            rows={[]}
            pagination={pagination}
        />
        <TablePagination
            component="div"
            {...pagination}
            rowsPerPageOptions={[5, 10, 25, 100]}
            sx={{
                position: "fixed",
                bottom: 0,
                right: 0,
                left: 0,
                bgcolor: "secondary.lightest",
                borderTop: "1px solid",
                borderColor: "divider",
            }}
        />
        
        {/* <CustomDrawer
            DrawerProps={{
                open: editDrawer.open,
                onClose: editDrawer.handleClose,
                // PaperProps: { sx: { width: 640 } },
            }}
            title="Chỉnh sửa bệnh nhân"
            subtitle="Vui lòng điền thông tin bệnh nhân"
            onCancel={editDrawer.handleClose}
            onSubmit={() => {}}
            children={
                <Stack 
                    spacing={2}
                    sx = {{
                        p: 2,
                    }}
                
                >
                    <Box 
                        sx={{
                            display: "flex",
                            gap: 2,
                            width: "100%",
                            justifyContent: "space-between",
                        }}
                    >
                        <TextField   
                            label="Mã bệnh nhân" 
                            value={editDrawer.data?.patient_code}
                        />
                        <TextField 
                            label="Tên bệnh nhân" 
                            value={editDrawer.data?.name}
                        />
                    </Box>
                    <Box 
                        sx={{
                            display: "flex",
                            gap: 2,
                            width: "100%",
                            justifyContent: "space-between",
                        }}
                    >
                        <TextField   
                            label="Tuổi bệnh nhân" 
                            value={editDrawer.data?.age}
                        />
                        <TextField 
                            label="Số điện thoại" 
                            value={editDrawer.data?.phone}
                        />
                    </Box>
                    <TextField 
                        label="Địa chỉ" 
                        value={editDrawer.data?.address}
                        fullWidth
                    />
                </Stack>
            }
            submitText="Lưu"
        /> */}
    </>
    )
}
