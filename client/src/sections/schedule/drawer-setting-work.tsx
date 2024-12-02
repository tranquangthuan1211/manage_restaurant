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
import {Employee, initialEmployee,addSchedule} from "src/types/employee";
import { Stack, styled } from "@mui/system";
import React, { useCallback, useEffect, useState } from "react";
import { useMenu } from "src/contexts/menu/menu-context";
import useFunction from "src/hooks/use-function";
import { useFormik } from "formik";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs, { Dayjs } from "dayjs";
import { useEmployee } from "src/contexts/employee/employee-context";
const NoLabelTextField = styled(TextField)<TextFieldProps>(() => ({
  "& .MuiInputBase-input.MuiFilledInput-input": {
    paddingTop: "8px",
  },
}));

const isInCurrentMonth = (date: Dayjs) => date.get('month') !== dayjs().get('month');
function ScheduleSettingWorkDrawer({
  open,
  onClose,
  employees,
}: {
  open: boolean;
  onClose: () => void;
  employees: Employee[];
}) {
  const {updateEmployee} = useEmployee();
  const [date,setDate] = useState<string>(dayjs().toString());
  const handleSubmit = useCallback(async () => {
    if (employees) {
      console.log(addSchedule(employees,date,formik.values._id));
      await updateEmployee(addSchedule(employees,date,formik.values._id));
    }
  }, [employees, date, updateEmployee]);
  const handleSubmitHelper = useFunction(handleSubmit,{
    successMessage: "Cập nhật thành công",
  });
  const formik = useFormik<Employee>({
    initialValues: initialEmployee,
    onSubmit: async (values) => {
      const {error} = await handleSubmitHelper.call(values);
      if (!error) {
        onClose();
      }
    },
  });

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
                {employees ? "Sửa tài khoản" : "Thêm tài khoản mới"}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Button color="inherit" variant="contained" onClick={onClose}>
                Hủy bỏ
              </Button>
              <Button variant="contained" color="primary" type="submit">
                {employees ? "Cập nhật" : "Thêm"}
              </Button>
            </Box>
          </Box>
        </Paper>
        <Stack
          padding={"16px"}
        >
          <Stack spacing={"8px"} direction={"column"} width={1}>
            <Typography fontSize={"12px"} fontWeight={500}>
              Thời gian bắt đầu
            </Typography>
            <DateTimePicker
              defaultValue={dayjs()}
              onChange={(date) => setDate(date ? date.toString(): "")}
              shouldDisableMonth={isInCurrentMonth}
              views={['year', 'month', 'day', 'hours', 'minutes']}
            />
          </Stack>
          <Stack spacing={"8px"} direction={"column"} width={1}>
            <Typography fontSize={"12px"} fontWeight={500}>
              Thời gian kết thúc
            </Typography>
            <DateTimePicker
              defaultValue={dayjs()}
              shouldDisableMonth={isInCurrentMonth}
              views={['year', 'month', 'day', 'hours', 'minutes']}
            />
          </Stack>
          <Stack spacing={"8px"} direction={"column"} width={1}>
            <Typography fontSize={"12px"} fontWeight={500}>
              Chọn nhân viên
            </Typography>
            <NoLabelTextField
              fullWidth
              select
              variant="filled"
              label="Chọn nhân viên"
              value={formik.values._id}
              onChange={formik.handleChange}
              name="_id"
            >
              {employees.map((employee) => (
                <MenuItem key={employee._id} value={employee._id}>
                  {employee.name}
                </MenuItem>
              ))}
            </NoLabelTextField>
          </Stack>
        </Stack>
      </form>
    </Drawer>
  );
}

export default ScheduleSettingWorkDrawer;
