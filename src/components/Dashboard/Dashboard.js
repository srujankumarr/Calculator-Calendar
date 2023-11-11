import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import SideNavigation from './SideNavigation';

import { Outlet } from 'react-router-dom';
import Header from './Header';



export default function Dashboard() {

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Header />
            <SideNavigation />
            <Box sx={{ marginLeft: 40, marginTop: 14 }}>
                <Outlet />
            </Box>

        </Box>
    );
}
















