import React, { useState } from 'react';
import { Avatar, Box, Popover, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { notifications } from './NotificationData';

export default function Notification() {
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClose = () => {
        setAnchorEl(null)
    };

    const open = Boolean(anchorEl);

    const unreadCount = notifications.filter((notification) => !notification.isRead).length;

    return (
        <Box>
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















