import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import NotificationIcon from '../../images/notificationicon.svg'
import { useDispatch, useSelector } from 'react-redux';
import { dashboardActions } from '../../store/store';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Box, Typography } from '@mui/material';
const notifications = [{ message: `Srujan has updated his details`, time: '  5hrs ago' },
{
    message: 'You have a new Task due on Nov 20', time: '  9hrs ago'
}];

export default function NotificationPopUp() {
    const notificationPop = useSelector((state) => state.dashboard.notificationPop); // Define and initialize notificationPop
    const anchorEl = useSelector((state) => state.dashboard.anchorElement); // Define and initialize anchorEl
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(dashboardActions.closeNotificationPopUp());
    }

    return (
        <>
            <Popover
                open={notificationPop}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <List sx={{ padding: 3 }}>
                    <Typography variant='h6'>Notifications </Typography>
                    {notifications.map((data) => (
                        <ListItem sx={{ width: 220 }} disableGutters key={data.message}>
                            <ListItemButton onClick={handleClose}>
                                <ListItemAvatar>
                                    <img src={NotificationIcon} alt='Notification Icon' />
                                </ListItemAvatar>
                                <Box>
                                    <Typography sx={{ fontSize: 14 }} variant='p'>{data.message}</Typography>
                                    <Box sx={{
                                        display: 'flex'
                                    }}>
                                        <AccessTimeIcon sx={{ color: '#d9d9e4' }} fontSize='small' />
                                        <Typography sx={{ fontSize: 12 }}>{data.time}</Typography>
                                    </Box>
                                </Box>
                            </ListItemButton>
                        </ListItem>

                    ))}
                </List>
            </Popover>
        </>

    );
}
