import React, { useState } from 'react';
import { Avatar, Box, Popover, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { notifications } from './NotificationData';

export default function Notification() {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const unreadCount = notifications.filter((notification) => !notification.isRead).length;

    return (
        <Box>
            {/* 

            <IconButton color="inherit" onClick={handleClick}>
                <Badge badgeContent={unreadCount} color="secondary">
                    <NotificationsIcon sx={{ color: 'gray', fontSize: '2rem' }} />
                </Badge>
            </IconButton>

            <IconButton color="inherit" sx={{ marginRight: '10px' }}>
                <Avatar alt="user-avatar" src={UserAvatar} style={{ borderRadius: '50%', width: '40px', marginLeft: '15px' }} />
            </IconButton> */}

            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <List sx={{ minWidth: 300, maxWidth: 400 }}>
                    <ListItem sx={{ textAlign: 'left', fontSize: '1.3rem' }}>
                        <NotificationsIcon sx={{ color: 'grey', fontSize: '2rem' }} />Notifications
                    </ListItem>
                    <ListItem sx={{ textAlign: 'left', borderBottom: '0.5px solid #ddd', paddingBottom: '10px', marginBottom: '10px', fontSize: '1rem', color: 'gray' }}>
                        You have {unreadCount} unread messages
                    </ListItem>
                    {notifications.map((notification) => (
                        <ListItem
                            key={notification.id}
                            sx={{
                                transition: 'transform 0.3s',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                },
                            }}
                        >
                            <ListItemButton onClick={handleClose}>
                                <ListItemAvatar>
                                    <Avatar src={notification.avatar || ''} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={notification.sender}
                                    secondary={
                                        <React.Fragment>
                                            {notification.message}
                                            <br />
                                            <span style={{ color: 'grey', fontSize: '0.8rem' }}>{notification.timestamp}</span>
                                        </React.Fragment>
                                    }
                                />
                                {notification.isRead ? (
                                    <DoneAllIcon sx={{ color: 'blue', marginLeft: 'auto', marginTop: '50px', fontSize: 'medium' }} />
                                ) : (
                                    <DoneIcon sx={{ color: 'grey', marginLeft: 'auto', marginTop: '50px', fontSize: 'medium' }} />
                                )}
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Popover>

        </Box>
    );
}

















// import Popover from '@mui/material/Popover';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
// import ListItemButton from '@mui/material/ListItemButton';
// import NotificationIcon from '../../images/notificationicon.svg'
// import { useDispatch, useSelector } from 'react-redux';
// import { dashboardActions } from '../../store/store';
// import { Box, Typography } from '@mui/material';
// const notifications = [{ message: `Srujan has updated his details`, time: '  5hrs ago' },
// {
//     message: 'You have a new Task due on Nov 20', time: '  9hrs ago'
// }];

// export default function NotificationPopUp() {
//     const notificationPop = useSelector((state) => state.dashboard.notificationPop); // Define and initialize notificationPop
//     const anchorEl = useSelector((state) => state.dashboard.anchorElement); // Define and initialize anchorEl
//     const dispatch = useDispatch();

//     const handleClose = () => {
//         dispatch(dashboardActions.closeNotificationPopUp());
//     }

//     return (
//         <>
//             <Popover
//                 open={notificationPop}
//                 anchorEl={anchorEl}
//                 onClose={handleClose}
//                 anchorOrigin={{
//                     vertical: 'bottom',
//                     horizontal: 'right',
//                 }}
//                 transformOrigin={{
//                     vertical: 'top',
//                     horizontal: 'right',
//                 }}
//             >
//                 <List sx={{ padding: 3 }}>
//                     <Typography variant='h6'>Notifications </Typography>
//                     {notifications.map((data) => (
//                         <ListItem sx={{ width: 220 }} disableGutters key={data.message}>
//                             <ListItemButton onClick={handleClose}>
//                                 <ListItemAvatar>
//                                     <img src={NotificationIcon} alt='Notification Icon' />
//                                 </ListItemAvatar>
//                                 <Box>
//                                     <Typography sx={{ fontSize: 14 }} variant='p'>{data.message}</Typography>
//                                     <Box sx={{
//                                         display: 'flex'
//                                     }}>
//                                         <AccessTimeIcon sx={{ color: '#d9d9e4' }} fontSize='small' />
//                                         <Typography sx={{ fontSize: 12 }}>{data.time}</Typography>
//                                     </Box>
//                                 </Box>
//                             </ListItemButton>
//                         </ListItem>

//                     ))}
//                 </List>
//             </Popover>
//         </>

//     );
// }
