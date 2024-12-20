import React, { useEffect, useMemo, useState } from "react";
import { Page as PageType } from "src/types/page";
import { Layout } from "src/layouts/index";
import ContentHeader from "src/sections/dashboard/content-header";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { useAuth } from "src/hooks/use-auth";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

dayjs.extend(isoWeek);

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const groupDatesByWeek = (dates: string[]) => {
  const weeks: { [key: string]: string[] } = {};
  const formatDate = (date: string) => dayjs(date).startOf("isoWeek").toISOString();

  dates.forEach((date) => {
    const weekStart = formatDate(date); // Ngày bắt đầu của tuần
    if (!weeks[weekStart]) weeks[weekStart] = Array(7).fill(null);
    const dayIndex = dayjs(date).isoWeekday() - 1; // Thứ 2 = 0, Chủ Nhật = 6
    weeks[weekStart][dayIndex] = date;
  });

  return Object.values(weeks);
};

const Page: PageType = () => {
  const { user } = useAuth();
  const [scheduleData, setScheduleData] = useState<string[]>(user?.schedule || []);

  const weeklySchedules = useMemo(() => groupDatesByWeek(scheduleData), [scheduleData]);

  return (
    <>
      <ContentHeader title="Lịch làm việc" />
      <Box sx={{ p: 1 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {daysOfWeek.map((day) => (
                  <TableCell key={day} align="center">
                    {day}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {weeklySchedules.map((week, weekIndex) => (
                <TableRow key={`week-${weekIndex}`}>
                  {week.map((day, dayIndex) => (
                    <TableCell key={`day-${weekIndex}-${dayIndex}`} align="center">
                      {day ? (
                        <Box
                          sx={{
                            bgcolor: "#e0f7fa",
                            borderRadius: 1,
                            p: 1,
                            textAlign: "center",
                          }}
                        >
                          {dayjs(day).format("DD/MM/YYYY")}
                        </Box>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <Layout>{page}</Layout>;

export default Page;
