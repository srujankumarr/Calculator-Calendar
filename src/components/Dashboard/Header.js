import { styled } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
import { AppBar, Toolbar, IconButton, Badge, Box } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import Notifications from "@mui/icons-material/NotificationsNoneTwoTone";
import AvatarIcon from '../../images/avatar-person.jpg'
import SearchDrawer from './SearchDrawer';
import NotificationPopUp from './Notification';
import { useDispatch } from 'react-redux'
import { dashboardActions } from '../../store/store'

const CustomAppBar = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    backgroundColor: '#F9FAFB',
    border: 'none',
    marginLeft: 250
}))


export default function Header() {
    const dispatch = useDispatch()
    const searchDrawerHandler = () => {
        dispatch(dashboardActions.toggleSearchDrawer())
    }
    const openNotificationPopUp = (event) => {
        dispatch(dashboardActions.openNotificationPopUp(event.target))
    }
    return (
        <CustomAppBar position="absolute">
            <Toolbar
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                <IconButton onClick={searchDrawerHandler} sx={{
                    marginLeft: 30
                }} >
                    <SearchIcon fontSize="large" />
                </IconButton>
                <SearchDrawer />
                <Box>
                    <IconButton onClick={openNotificationPopUp} sx={{
                        marginLeft: 15,
                        marginRight: 5
                    }}>
                        <Badge badgeContent={2} color="error">
                            <Notifications fontSize='large' />
                        </Badge>
                    </IconButton>
                    <NotificationPopUp />

                    <IconButton>
                        <img src={AvatarIcon} alt='Logo of the User' style={{
                            width: 40,
                            borderRadius: 25
                        }} />
                    </IconButton>
                </Box>
            </Toolbar>
        </CustomAppBar>
    )
} 