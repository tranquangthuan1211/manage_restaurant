import React, { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import dayjs from "dayjs";
import { set } from "lodash";

const CustomDatePicker = (
  {
    filterDate,
    onChangeDate,
  }: {
    filterDate: dayjs.Dayjs;
    onChangeDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
  }
) => {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const handlePrevWeek = () => {
    setCurrentDate((prev) => prev.subtract(7, "day"));
    onChangeDate((prev) => prev.subtract(7, "day"));
  };

  const handleNextWeek = () => {
    setCurrentDate((prev) => prev.add(7, "day"));
    onChangeDate((prev) => prev.add(7, "day"));
  };

  const startOfWeek = currentDate.startOf("week").add(1, "day");
  const endOfWeek = startOfWeek.add(6, "day"); 

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        backgroundColor: "#f4f4fc",
        borderRadius: "16px",
        padding: "4px 16px",
        width: "300px",
      }}
    >
      {/* Nút trái */}
      <IconButton onClick={handlePrevWeek}>
        <ChevronLeftIcon />
      </IconButton>

      {/* Text hiển thị ngày */}
      <Typography sx={{ color: "#4a4aff", fontWeight: "bold" }}>
        {`${startOfWeek.format("DD MMM")} – ${endOfWeek.format("DD MMM")}`}
      </Typography>

      {/* Nút phải */}
      <IconButton onClick={handleNextWeek}>
        <ChevronRightIcon />
      </IconButton>
    </Box>
  );
};

export default CustomDatePicker;
