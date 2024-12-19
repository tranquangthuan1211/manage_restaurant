import React, { useState } from "react";

interface Schedule {
  [date: string]: {
    todo: string;
    notes: string;
  };
}

const CalendarPage: React.FC = () => {
  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(11);
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(
    `${today.getFullYear()}-${12}-${today.getDate()}`
  );

  // Data 
  const scheduleData: Schedule = {
    "2024-12-05": { todo: "Inventory check", notes: "Check kitchen supplies." },
    "2024-12-12": { todo: "Special event", notes: "Prepare for Christmas party." },
    "2024-12-18": { todo: "Team meeting", notes: "Discuss year-end summary." },
    "2024-12-24": { todo: "Holiday prep", notes: "Ensure all shifts are covered." },
    "2024-12-31": { todo: "New Year event", notes: "Final celebration for the year." },
  };

  const formatDate = (year: number, month: number, day: number) =>
    `${year}-${month + 1}-${day}`;

  const generateCalendar = (year: number, month: number) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const calendarDays = generateCalendar(currentYear, currentMonth);

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <div className="flex items-center space-x-3">
          <h3 className="text-yellow-400 text-2xl font-semibold">
            Calendar
          </h3>
          <div className="h-1 w-60 bg-yellow-400"></div>
      </div>
      <div className="grid grid-cols-3 gap-6">
      {/* Calendar */}
      <div className="col-span-2 bg-gray-700 p-4 rounded-lg">
        <h3 className="text-yellow-300 font-bold mb-2">Calendar</h3>
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={handlePrevMonth}
            className="text-yellow-300 font-bold px-2 py-1 rounded hover:bg-gray-600"
          >
            &lt;
          </button>
          <h4 className="text-white font-semibold">
            {new Date(currentYear, currentMonth).toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h4>
          <button
            onClick={handleNextMonth}
            className="text-yellow-300 font-bold px-2 py-1 rounded hover:bg-gray-600"
          >
            &gt;
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((day) => {
            const currentDate = formatDate(currentYear, currentMonth, day);
            const isToday =
              currentDate ===
              `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
            const hasTask = !!scheduleData[currentDate];
            const isSelected = currentDate === selectedDate;

            return (
              <div
                key={day}
                className={`p-2 text-center rounded cursor-pointer ${
                  isSelected
                    ? "bg-yellow-300 text-black"
                    : hasTask
                    ? "bg-red-500 text-white"
                    : "bg-gray-600 text-white"
                } ${isToday ? "border-2 border-yellow-400" : "hover:bg-gray-500"}`}
                onClick={() => setSelectedDate(currentDate)}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>

      {/* To-Do List */}
      <div className="bg-gray-700 p-4 rounded-lg flex flex-col h-full">
        <h3 className="text-yellow-300 font-bold mb-2">To do list</h3>
        <div
          className="bg-gray-500 p-3 rounded shadow-md flex-1 overflow-y-auto"
          style={{ minHeight: "200px", maxHeight: "300px" }}
        >
          <p className="text-white">
            {scheduleData[selectedDate]?.todo || "No tasks for today"}
          </p>
        </div>
      </div>

      {/* Additional Notes */}
      <div className="col-span-3 bg-gray-700 p-4 rounded-lg flex flex-col h-full">
        <h3 className="text-yellow-300 font-bold mb-2">Additional Notes</h3>
        <div
          className="bg-gray-500 p-3 rounded shadow-md flex-1 overflow-y-auto"
          style={{ minHeight: "200px", maxHeight: "300px" }}
        >
          <p className="text-white">
            {scheduleData[selectedDate]?.notes ||
              "No special instructions for the employee during the shift."}
          </p>
        </div>
      </div>
    </div>

    </div>
  );
};

export default CalendarPage;
