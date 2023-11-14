import { styled } from '@mui/material/styles';
import { AppBar, Toolbar, IconButton, Badge, Box } from '@mui/material';
import Notifications from "@mui/icons-material/NotificationsNoneTwoTone";
import AvatarIcon from '../../images/avatar-person.jpg'
import NotificationPopUp from './Notification';
import { useDispatch } from 'react-redux'
import { dashboardActions } from '../../store/store'
import SearchBar from './SearchBar';

const CustomAppBar = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    backgroundColor: '#F9FAFB',
    border: 'none',
    marginLeft: 250
}))


export default function Header() {
    const dispatch = useDispatch()
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
                <SearchBar />
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