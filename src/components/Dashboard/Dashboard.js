import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import SideNavigation from './SideNavigation';

import { Outlet } from 'react-router-dom';
import Header from './Header';



export default function Dashboard() {

    return (
        <Box >
            <CssBaseline />
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Header />
                <SideNavigation />
                <Outlet />
            </Box>

        </Box>
    );
}
















