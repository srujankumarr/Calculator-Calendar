import React, { useState } from 'react';
import Slide from '@mui/material/Slide';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { Icon } from '@iconify/react';

const HEADER_MOBILE = 64;
const HEADER_DESKTOP = 92;

const StyledSearchbar = styled('div')(({ theme, open }) => ({
    top: 0,
    left: 0,
    zIndex: 1001,
    width: '100%',
    display: 'flex',
    position: 'absolute',
    alignItems: 'center',
    height: HEADER_MOBILE,
    padding: theme.spacing(0, 3),
    // boxShadow: theme.shadows[8], // Using MUI shadows directly
    backgroundColor: open ? 'rgba(255, 255, 255, 0.7)' : 'transparent',
    [theme.breakpoints.up('md')]: {
        height: HEADER_DESKTOP,
        padding: theme.spacing(0, 5),
    },
}));

export default function SearchBar() {
    const [open, setOpen] = useState(false);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <ClickAwayListener onClickAway={handleClose} >
            <div>
                {!open && (
                    <IconButton onClick={handleToggle} sx={{ marginLeft: '250px', mt: 1 }} size='large' >
                        <Icon icon="eva:search-fill" />
                    </IconButton>
                )}

                <Slide direction="down" in={open} mountOnEnter unmountOnExit>
                    <StyledSearchbar open={open}>
                        <Input
                            autoFocus
                            fullWidth
                            disableUnderline
                            placeholder="Search…"
                            startAdornment={
                                <InputAdornment position="start">
                                    <Icon icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} fontSize='medium' />
                                </InputAdornment>
                            }
                            sx={{ mr: 1, fontWeight: 'bold', ml: '250px' }}
                        />
                        <Button variant="contained" onClick={handleClose}>
                            Search
                        </Button>
                    </StyledSearchbar>
                </Slide>
            </div>
        </ClickAwayListener>
    );
}