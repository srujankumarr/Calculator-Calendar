import { styled } from '@mui/material/styles';
import Notifications from "@mui/icons-material/NotificationsNoneTwoTone";
import AvatarIcon from '../../images/avatar-person.jpg'
import SearchBar from './SearchBar';
import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Badge, Box, Avatar, Popover, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { notifications } from './NotificationData';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import { NavLink } from 'react-router-dom';

const CustomAppBar = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    backgroundColor: '#F9FAFB',
    border: 'none',
    marginLeft: 250
}))


export default function Header() {
    const [anchorEl, setAnchorEl] = useState(null);

    const openNotificationPopUp = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const [anchorElLogout, setAnchorElLogout] = React.useState(null);
    const openLogout = Boolean(anchorElLogout);
    const handleClick = (event) => {
        setAnchorElLogout(event.currentTarget);
    };
    const handleCloseLogout = () => {
        setAnchorElLogout(null);
    };
    const open = Boolean(anchorEl);

    const unreadCount = notifications.filter((notification) => !notification.isRead).length;
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
                        <Badge badgeContent={4} color="error">
                            <Notifications fontSize='large' />
                        </Badge>
                    </IconButton>
                    <Popover
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        PaperProps={{ style: { boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)', borderRadius: '20px' } }}
                    >
                        <List sx={{ minWidth: 300, maxWidth: 400, boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.15)' }}>
                            <ListItem sx={{ textAlign: 'left', fontSize: '1.3rem' }}>
                                <Typography variant='h5'>Notifications</Typography>
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
                                                <Box>
                                                    {notification.message}
                                                    < br />
                                                    <Box sx={{ display: 'flex' }}>
                                                        <AccessTimeIcon sx={{ color: '#d9d9e4', }} fontSize='small' />
                                                        <span style={{ color: 'grey', fontSize: '12px', marginLeft: '2px', marginTop: '2px' }}>{notification.timestamp}</span>
                                                    </Box>
                                                </Box>
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
                    <IconButton onClick={handleClick}>
                        <img src={AvatarIcon} alt='Logo of the User' style={{
                            width: 40,
                            borderRadius: 25
                        }} />
                    </IconButton>
                    <Menu
                        anchorEl={anchorElLogout}
                        id="account-menu"
                        open={openLogout}
                        onClose={handleCloseLogout}
                        onClick={handleCloseLogout}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                borderRadius: 3,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem onClick={handleClose} >
                            <Avatar >
                                <img src={AvatarIcon} alt='Avatar Icon' style={{ width: '35px' }} />
                            </Avatar> Admin
                        </MenuItem>

                        <NavLink to='/' style={{
                            textDecoration: 'none',
                            color: 'black'
                        }}>
                            <MenuItem >
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        </NavLink>
                    </Menu>
                </Box>
            </Toolbar>
        </CustomAppBar >
    )
} 