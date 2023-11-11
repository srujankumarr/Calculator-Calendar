import { Drawer, List, Paper, Box, Avatar, Typography, alpha } from "@mui/material";
import DashboardItem from "./DashboardItem";
import HomeIcon from '@mui/icons-material/Home';
import History from "@mui/icons-material/History";
import CalculateIcon from '@mui/icons-material/Calculate';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LogoutIcon from '@mui/icons-material/Logout';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import logo from '../../images/avatar-person.jpg'
export default function SideNavigation() {
    const [curPath, setCurPath] = useState('');
    const location = useLocation();
    useEffect(() => {
        const pathname = location.pathname
        setCurPath(pathname)
    }, [location.pathname]);
    return (
        <Drawer variant="permanent" >
            <Paper sx={{
                backgroundColor: '#F9FAFB',
                height: '100vh',
                width: 250,

            }}>
                <Box
                    sx={{
                        my: 3,
                        mx: 2.5,
                        py: 2,
                        px: 2.5,
                        display: 'flex',
                        borderRadius: 1.5,
                        alignItems: 'center',
                        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
                    }}
                >
                    <Avatar src={logo} alt="photoURL" />

                    <Box sx={{ ml: 2 }}>
                        <Typography variant="subtitle2">Admin</Typography>
                    </Box>
                </Box>

                <List sx={{ margin: '0 20px' }} >
                    <DashboardItem curPath={curPath} name='Dashboard' icon={<HomeIcon />} link='https://cgpacalculator-calendar.netlify.app/dashboard' />
                    <DashboardItem curPath={curPath} name='SGPA Calculator' icon={<CalculateIcon />} link='https://cgpacalculator-calendar.netlify.app/dashboard/sgpa-calculator' />
                    <DashboardItem curPath={curPath} name='CGPA Calculator' icon={<CalculateIcon />} link='https://cgpacalculator-calendar.netlify.app/dashboard/cgpa-calculator' />
                    <DashboardItem curPath={curPath} name='Calendar' icon={<CalendarMonthIcon />} link='https://cgpacalculator-calendar.netlify.app/dashboard/calendar' />
                    <DashboardItem curPath={curPath} name='History' icon={<History />} link='https://cgpacalculator-calendar.netlify.app/dashboard/history' />
                    <DashboardItem curPath={curPath} name='Logout' icon={<LogoutIcon />} link='/' />
                </List>
            </Paper>
        </Drawer>
    )
}