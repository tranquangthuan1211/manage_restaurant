import {DashboardSection} from "./config"
import {Paths} from 'src/types/paths';
import LineAxisIcon from '@mui/icons-material/LineAxis';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import FlagIcon from '@mui/icons-material/Flag';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import { FaUserDoctor } from "react-icons/fa6";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
export const getDashboardStaffConfigs: DashboardSection[] = [
    {
        subheader:'Nhân viên', 
        items:[
            {
                title:"Lịch làm việc",
                path:Paths.staff["lich-lam-viec"],
                icon:<CalendarMonthIcon width = {20}/>
            },
            {
                title:"Danh sách cần phục vụ",
                path: Paths.staff["danh-sach-phuc-vu"],
                icon: <LineAxisIcon sx = {{
                    width: 20,
                }}/>
            },
            {
                title: "Menu",
                path: Paths.staff["menu"],
                icon: <RestaurantMenuIcon sx = {{
                    width: 20,
                }}/>
            }, 
            {
                title:"Quản lý nghỉ phép",
                path: Paths.staff["lich-nghi"],
                icon: <DesignServicesIcon sx = {{
                    width: 20,
                }}/>
            }
        ]
    }, 
    {
        subheader:'Thiết lập',
        items:[
            {
                title: "cài đặt",
                path:Paths.dashboard["settings"],
                icon: <SettingsIcon sx = {{
                    width: 20,
                }}/>
            },
            {
                title: "Đăng xuất",
                path: Paths.logout,
                icon: <LogoutIcon sx = {{
                    width: 20,
                }}/>

            }
        ]
    }
]
    