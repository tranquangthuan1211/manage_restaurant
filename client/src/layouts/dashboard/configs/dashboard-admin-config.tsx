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
export const getDashboardAdminConfigs: DashboardSection[] = [
    {
        subheader:'Admin', 
        items:[
            {
                title:"Tổng quan",
                path: Paths.dashboard["tong-quan"],
                icon: <LineAxisIcon sx = {{
                    width: 20,
                }}/>
            },
            {
                title: "Menu",
                path: Paths.dashboard["thong-tin-menu"],
                icon: <RestaurantMenuIcon sx = {{
                    width: 20,
                }}/>
            }, 
            {
                title: "Quản lý nhân viên",
                path: Paths.dashboard["quan-ly-nhan-vien"],
                icon: <PermContactCalendarIcon
                    sx = {{
                        width:20,
                    }}
                />
            },
            {
                title:"Lịch làm việc",
                path:Paths.dashboard["lich-lam-viec"],
                icon:<CalendarMonthIcon width = {20}/>
            },
            {
                title:"Quản lý khiếu nại",
                path: Paths.dashboard["quan-ly-khieu-nai"],
                icon: <FlagIcon sx = {{
                    width: 20,
                }}/>    
            },
            {
                title:"Quản lý nghỉ phép",
                path: Paths.dashboard["quan-ly-nghi-phep"],
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
    