import dayjs from "dayjs";
export interface Employee {
    _id: string;
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    position: string;
    schedule: string[];
    salary: number;
    createdAt: string;
    updatedAt: string;
}
export const initialEmployee: Employee = {
    _id: "",
    id: 0,
    name: "",
    email: "",
    phone: "",
    schedule: [],
    address: "",
    position: "",
    salary: 0,
    createdAt: "",
    updatedAt: "",
};

export const convertToSchedule = (employee:Employee) => {
    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const shifts = weekDays.map((day, index) => ({
      id: (index + 1).toString(),
      day,
      time: "",
      role: "",
    }));
  
    employee.schedule.forEach((schedule, idx) => {
      const date = dayjs(schedule);
      const dayOfWeek = weekDays[date.day() - 1]; 
      const time = `${date.format("h:mm A")} - ${date.add(8, "hour").format("h:mm A")}`;
  
      const shift = shifts.find((shift) => shift.day === dayOfWeek);
      if (shift) {
        shift.time = time;
        shift.role = employee.position;
      }
    });
  
    return [
      {
        name: employee.name,
        shifts,
      },
    ];
};
export const convertToEmployee = (employees:Employee[]) => {
    return employees.map((employee) => convertToSchedule(employee)[0]);
}
export const addSchedule = (employees:Employee[], date:string,_id:string):Employee => {
    const employee = employees.find((employee) => employee._id === _id);
    if (employee) {
        return {
            ...employee,
            schedule: [...employee.schedule, date],
        };
    }
    return initialEmployee;
}