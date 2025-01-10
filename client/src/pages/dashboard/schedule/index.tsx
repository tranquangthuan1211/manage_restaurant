import React, { use, useEffect, useMemo, useState } from "react";
import {Page as PageType} from "src/types/page"
import {Layout} from "src/layouts/index"
import ContentHeader from 'src/sections/dashboard/content-header';
import CustomDatePicker from "src/components/custome-date-picker";
import ScheduleSettingWorkDrawer from "src/sections/schedule/drawer-setting-work";
import { useDrawer } from "src/hooks/use-drawer"
import EmployeeProvider,{useEmployee} from "src/contexts/employee/employee-context";
import {convertToSchedule,convertToEmployee,fileterEmployeeByDate} from "src/types/employee";
import dayjs from "dayjs";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { Employee } from "src/types/employee";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface Shift {
  id: string;
  day: string;
  time: string;
  role: string;
}

const SortableItem = ({ shift }: { shift: Shift }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: shift.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
      <Box
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        sx={{
          bgcolor: shift.time ? "#e0f7fa" : "#f4f4f4",
          borderRadius: 1,
          p: 1,
          textAlign: "center",
          cursor: "grab",
          userSelect: "none",
        }}
      >
        {shift.time ? (
          <>
            <Typography variant="body2">{shift.time}</Typography>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              {shift.role}
            </Typography>
          </>
        ) : (
          "-"
        )}
      </Box>
  );
};

const Page:PageType  = () => {
  const [filterDate, setFilterDate] = useState(dayjs().startOf("week").add(1, "day"));
  const {getEmployee} = useEmployee();
  const employees = useMemo(() => fileterEmployeeByDate(getEmployee.data?.data ?? [], filterDate.toISOString()) || [], [getEmployee.data,filterDate]);
  const listEmployee = useMemo(() => getEmployee.data?.data || [], [getEmployee.data]);
  const [scheduleData, setScheduleData] = useState(convertToEmployee(employees));
  useEffect(() => {
    setScheduleData(convertToEmployee(employees));
  }, [employees]);
  const addSettingDrawer = useDrawer<Employee>();
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );
  useEffect(() => {
    const text = fileterEmployeeByDate(getEmployee.data?.data ?? [], filterDate.toISOString());
    console.log(text);
  }, [filterDate, getEmployee.data]);
  const handleDragEnd = ({ active, over }: { active: any; over: any }) => {
    if (!over || active.id === over.id) return;

    setScheduleData((prev) =>
      prev.map((person) => {
        const activeIndex = person.shifts.findIndex((shift) => shift.id === active.id);
        const overIndex = person.shifts.findIndex((shift) => shift.id === over.id);

        if (activeIndex !== -1 && overIndex !== -1) {
          return {
            ...person,
            shifts: arrayMove(person.shifts, activeIndex, overIndex),
          };
        }

        return person;
      })
    );
  };
  return (
    <>
      <ContentHeader
        title="Schedule"
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
                variant="contained"
                color="primary"
                onClick={() => addSettingDrawer.handleOpen()}
              >
                Lập lịch nhân viên
              </Button>

              <CustomDatePicker
                filterDate={filterDate}
                onChangeDate={setFilterDate}
              />
            </>
          }
          </Box>
        }
          
      />
      <Box
        sx = {{
          display: "flex",
          justifyContent: "flex-end",
          gap: 2,
          padding: "16px"
        }}
      >
        <Button
          variant="contained"
          color="primary"
        >
          Lưu lịch làm việc
        </Button>
      </Box>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <Box sx={{ p: 1 }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  {daysOfWeek.map((day) => (
                    <TableCell key={day}>{day}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {scheduleData.map((row) => (
                  <SortableContext
                    key={row.name}
                    items={row.shifts.map((shift) => shift.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <TableRow>
                      <TableCell>{row.name}</TableCell>
                      {row.shifts.map((shift) => (
                        <TableCell key={shift.id}>
                          <SortableItem shift={shift} />
                        </TableCell>
                      ))}
                    </TableRow>
                  </SortableContext>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </DndContext>
      <ScheduleSettingWorkDrawer
        open = {addSettingDrawer.open}
        onClose = {addSettingDrawer.handleClose}
        employees={listEmployee}
      />
    </>
  );
};
Page.getLayout = (page) => 
  <Layout>
    <EmployeeProvider>
      {page}  
    </EmployeeProvider>
  </Layout>;
export default Page;
