import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Box, Checkbox, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import './Calendar.css'
import { getCategoryColor, defaultEvents } from './data';


const loadEventsFromStorage = () => {
    const storedEvents = localStorage.getItem('calendarEvents');
    return storedEvents ? JSON.parse(storedEvents) : defaultEvents;
};

const saveEventsToStorage = (events) => {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
};

const Calendar = () => {
    const [prevTitle, setPrevTitle] = useState("")
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [events, setEvents] = useState(loadEventsFromStorage());
    const [formData, setFormData] = useState({
        eventTitle: '',
        calendarCategory: 'Work',
        startDate: '',
        endDate: '',
        allDay: false,
    });
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState([
        { id: 1, category: 'View All', checked: true },
        { id: 2, category: 'Work', checked: true },
        { id: 3, category: 'Personal', checked: true },
        { id: 4, category: 'Holiday', checked: true },
        { id: 5, category: 'Family', checked: true },
        { id: 6, category: 'Other', checked: true }
    ]
    );


    const handleCategoryToggle = (category, bool) => {
        if (category === 'View All') {
            const updatedCategories = selectedCategories.map(ele => {
                if (bool === true) {
                    ele.checked = false
                } else {
                    ele.checked = true
                }
                return ele
            })
            setSelectedCategories(updatedCategories);
        } else {
            const updatedCategories = selectedCategories.map(ele => {
                if (ele.category === 'View All' && bool === true) {
                    ele.checked = false
                }
                if (ele.category === category) {
                    ele.checked = !ele.checked
                }
                return ele
            })

            setSelectedCategories(updatedCategories);
        }
        const count = selectedCategories.reduce((count, ele) => (count + ele.checked), 0)
        if (count === 5) {
            const updatedCategories = selectedCategories.map(ele => {
                if (ele.category === 'View All') {
                    ele.checked = true
                }
                return ele
            })
            setSelectedCategories(updatedCategories)
        }
        const curEvents = loadEventsFromStorage();
        const updatedEvents = curEvents.filter((event) => {
            const val = selectedCategories.find(categoryEle => {
                return categoryEle.category === event.category && categoryEle.checked === true;
            });
            return val !== undefined;
        });
        setEvents(updatedEvents);
    };


    const handleAddEventClick = () => {
        handleReset()
        setDrawerOpen(true);
        setSelectedEvent(null);
    };

    const handleDateClick = (info) => {
        setDrawerOpen(true);
        handleReset()
        const formattedStartDate = new Date(info.dateStr).toISOString().slice(0, 16);
        const endDateTime = new Date(info.dateStr);
        const formattedEndDate = endDateTime.toISOString().slice(0, 16);

        setFormData((prevData) => ({
            ...prevData,
            startDate: formattedStartDate,
            endDate: formattedEndDate,
        }));

        setSelectedEvent(null);
    };

    const handleEventClick = (info) => {
        setPrevTitle(info.event.title)
        setDrawerOpen(true);
        const start = info.event.start;
        const end = info.event.end || info.event.start;
        setFormData({
            eventTitle: info.event.title,
            calendarCategory: info.event.extendedProps.category,
            startDate: start.toISOString().slice(0, 16),
            endDate: end.toISOString().slice(0, 16),
            allDay: info.event.allDay
        });
        setSelectedEvent(info.event);
        // handleReset()
    };

    const handleCloseDrawer = () => {
        setDrawerOpen(false);
    };

    const handleEventAdd = () => {
        const newEvent = {
            title: formData.eventTitle,
            category: formData.calendarCategory,
            start: new Date(formData.startDate),
            end: new Date(formData.endDate),
            allDay: formData.allDay
        };

        const updatedEvents = [...events, newEvent];
        setEvents(updatedEvents);
        saveEventsToStorage(updatedEvents);
        setDrawerOpen(false);
        handleReset();
    };

    const handleEventUpdate = () => {
        if (selectedEvent) {
            const updatedEvent = {
                title: formData.eventTitle,
                category: formData.calendarCategory,
                start: new Date(formData.startDate),
                end: new Date(formData.endDate),
                allDay: formData.allDay
            };

            const updatedEvents = events.map((event) => (event.title === prevTitle ? updatedEvent : event));
            setEvents(updatedEvents);
            saveEventsToStorage(updatedEvents);
            setDrawerOpen(false);
            setSelectedEvent(null);
            handleReset()
        }
    };


    const handleEventDelete = () => {
        if (selectedEvent) {
            const updatedEvents = events.filter((event) => event.title !== prevTitle);
            setEvents(updatedEvents);
            saveEventsToStorage(updatedEvents);
            setDrawerOpen(false);
            setSelectedEvent(null);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleReset = () => {
        setFormData({
            eventTitle: '',
            calendarCategory: 'Work',
            startDate: '',
            endDate: '',
            startTime: '',
            endTime: '',
            allDay: false
        });
        setSelectedEvent(null);
    };

    const Legend = () => {
        return (
            <Box key="legend-box" sx={{ paddingTop: 2 }}>
                {selectedCategories.map((ele) => (
                    <Box key={ele.id} sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    sx={{
                                        color: getCategoryColor(ele.category).color,
                                    }}
                                    style={{ color: getCategoryColor(ele.category).color }}
                                    checked={ele.checked}
                                    onChange={() => handleCategoryToggle(ele.category, ele.checked)}
                                />
                            }
                            label={
                                <Typography variant='p' sx={{ fontFamily: 'Roboto', fontSize: 18 }}>
                                    {ele.category}
                                </Typography>
                            }
                        />
                    </Box>
                ))}
            </Box>
        );
    };



    const eventContent = (eventInfo) => {
        const styles = getCategoryColor(eventInfo.event.extendedProps.category);

        return (
            <Box
                sx={{
                    borderColor: styles.borderColor,
                    color: styles.color,
                    backgroundColor: styles.backgroundColor,
                    padding: 1,
                    cursor: 'pointer',
                    overflow: 'hidden',
                    fontFamily: 'Roboto',
                    borderRadius: 2,
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    height: '100%'
                }}
                onClick={() => handleEventClick(eventInfo)}
            >
                <Typography sx={{
                    position: 'sticky',
                    fontSize: 13,
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap'
                }}>{eventInfo.event.title}</Typography>
            </Box>
        );
    };

    useEffect(() => {
        // Update the calendar events when the component mounts
        setEvents(loadEventsFromStorage());
    }, []);

    return (
        <>
            <Card sx={{ display: 'flex', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)', borderRadius: 5, py: 3, paddingRight: 3, marginBottom: 10 }}>
                <Box sx={{ padding: 5 }}>
                    <Button onClick={handleAddEventClick} variant="contained" sx={{ width: '100%' }}>
                        Add Event
                    </Button>
                    <Legend />
                </Box>
                <Card style={{ width: '750px' }}>
                    <CardContent>
                        <FullCalendar
                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                            views={{
                                'dayGridMonth': { buttonText: 'Month', },
                                'timeGridWeek': { buttonText: 'Week' },
                                'timeGridDay': { buttonText: 'Day' },
                                'listMonth': { buttonText: 'List' }
                            }}
                            events={events}
                            headerToolbar={{
                                start: 'prev,next',
                                center: 'title',
                                end: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
                            }}
                            initialView="dayGridMonth"
                            selectable={true}
                            editable
                            dateClick={handleDateClick}
                            eventClick={handleEventClick}
                            eventContent={eventContent}
                            height="100vh"
                            navLinks={true}
                            dayMaxEvents={2}
                        />
                    </CardContent>
                </Card>
            </Card>
            <Drawer anchor="right" open={drawerOpen} onClose={handleCloseDrawer}>
                <Box sx={{ display: 'flex', flexDirection: 'column', padding: 5 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                        <Typography variant="h6">{selectedEvent ? 'Edit Event' : 'Add Event'}</Typography>
                        <Box>
                            {selectedEvent && (
                                <IconButton onClick={handleEventDelete} variant="text" color="error">
                                    <DeleteIcon />
                                </IconButton>
                            )}
                            <IconButton onClick={handleCloseDrawer} variant="text">
                                &#x2715;
                            </IconButton>
                        </Box>
                    </Box>
                    <TextField
                        label="Event Title"
                        sx={{ marginBottom: 2, width: '300px' }}
                        name="eventTitle"
                        value={formData.eventTitle}
                        onChange={handleInputChange}
                    />
                    <TextField
                        select
                        label="Calendar Category"
                        defaultValue="Work"
                        sx={{ marginBottom: 2 }}
                        name="calendarCategory"
                        value={formData.calendarCategory}
                        onChange={handleInputChange}
                    >
                        {['Work', 'Personal', 'Holiday', 'Family', 'Other'].map((category) => (
                            <MenuItem key={category} value={category}>
                                {category}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        label="Start Date"
                        type={formData.allDay ? "date" : "datetime-local"}
                        value={formData.allDay ? formData.startDate.slice(0, 10) : formData.startDate}
                        onChange={handleInputChange}
                        name="startDate"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        label="End Date"
                        type={formData.allDay ? "date" : "datetime-local"}
                        value={formData.allDay ? formData.endDate.slice(0, 10) : formData.endDate}
                        onChange={handleInputChange}
                        name="endDate"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        sx={{ marginBottom: 2 }}
                    />
                    <FormControlLabel
                        control={<Switch
                            checked={formData.allDay}
                            onChange={() => setFormData({ ...formData, allDay: !formData.allDay })}
                        />}
                        label="All Day"
                        sx={{ marginBottom: 2 }}
                    />

                    <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: 2 }}>
                        {selectedEvent ? (
                            <Button onClick={handleEventUpdate} variant="contained" sx={{ marginRight: 1 }}>
                                Update Event
                            </Button>
                        ) : (
                            <Button onClick={handleEventAdd} variant="contained">
                                Add Event
                            </Button>
                        )}
                        <Button type="reset" onClick={handleReset} variant="outlined" sx={{ marginRight: 1 }} color="error">
                            Reset
                        </Button>
                    </Box>
                </Box>
            </Drawer>
        </>
    );
};

export default Calendar;
