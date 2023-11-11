


import React, { useState } from 'react';
import {
    Button,
    Grid,
    Paper,
    Typography,
    IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import styled from '@mui/material/styles/styled';

const CalendarContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
});

const Header = styled('div')({
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
});

const CalendarGrid = styled(Grid)({
    width: '100%',
    padding: 20
});

const DayCell = styled('div')({
    width: '100px',
    height: '100px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // border: '1px solid #ccc',
});

const Today = styled(DayCell)({
    backgroundColor: 'lightblue',
});

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Calendar = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const daysInMonth = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
        0
    ).getDate();

    const firstDay = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        1
    ).getDay();

    const days = [...Array(firstDay).fill(null), ...Array(daysInMonth).keys()];

    const prevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    };

    const nextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };

    return (
        <CalendarContainer>
            <Header>
                <IconButton onClick={prevMonth}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h5">
                    {currentMonth.toLocaleString('default', { month: 'long' })}{' '}
                    {currentMonth.getFullYear()}
                </Typography>
                <IconButton onClick={nextMonth}>
                    <ArrowForwardIcon />
                </IconButton>
            </Header>
            <Paper elevation={3}>
                <CalendarGrid container spacing={0} columns={{ xs: 7 }}>
                    {daysOfWeek.map((day, index) => (
                        <Grid item key={index} xs={1}>
                            <DayCell>
                                <Typography variant="subtitle1">{day}</Typography>
                            </DayCell>
                        </Grid>
                    ))}
                    {days.map((day, index) => (
                        <Grid item key={index} xs={1}>
                            <DayCell className={`${day === null ? 'placeholder' : ''} ${day === new Date().getDate() ? Today : ''}`}>
                                <Typography variant="h6">
                                    {day === null ? '' : day + 1}
                                </Typography>
                            </DayCell>
                        </Grid>
                    ))}
                </CalendarGrid>
            </Paper>
        </CalendarContainer>
    );
};

export default Calendar;



