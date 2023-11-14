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
import { Box, } from '@mui/material';
import { loadEventsFromStorage, saveEventsToStorage } from './util';
import Legend from './Legend';
import { eventContent } from './EventContent';
import AddEventDrawer from './AddEventDrawer';

const Calendar = () => {
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
        { id: 6, category: 'Other', checked: true },
    ]);

    const handleAddEventClick = () => {
        handleReset();
        setDrawerOpen(true);
        setSelectedEvent(null);
    };

    const handleEventDelete = () => {
        if (selectedEvent) {
            const updatedEvents = events.filter((event) => event.title !== selectedEvent.title);
            setEvents(updatedEvents);
            saveEventsToStorage(updatedEvents);
            setDrawerOpen(false);
            setSelectedEvent(null);
        }
    };

    const handleCloseDrawer = () => {
        setDrawerOpen(false);
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

            const updatedEvents = events.map((event) => (event.title === selectedEvent.title ? updatedEvent : event));
            setEvents(updatedEvents);
            saveEventsToStorage(updatedEvents);
            setDrawerOpen(false);
            setSelectedEvent(null);
            handleReset();
        }
    };

    const handleEventClick = (info) => {
        setDrawerOpen(true);
        setFormData({
            eventTitle: info.event.title,
            calendarCategory: info.event.extendedProps.category,
            startDate: info.event.start.toISOString().slice(0, 16),
            endDate: (info.event.end || info.event.start).toISOString().slice(0, 16),
            allDay: info.event.allDay
        });
        setSelectedEvent(info.event);
    };

    const handleDateClick = (info) => {
        setDrawerOpen(true);
        handleReset();
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

    const eventContentComponent = (eventInfo) => {
        return eventContent(eventInfo, handleEventClick);
    };

    useEffect(() => {
        setEvents(loadEventsFromStorage());
    }, []);

    return (
        <>
            <Card sx={{ display: 'flex', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)', borderRadius: 5, py: 3, paddingRight: 3, marginBottom: 10 }}>
                <Box sx={{ padding: 5 }}>
                    <Button onClick={handleAddEventClick} variant="contained" sx={{ width: '100%' }}>
                        Add Event
                    </Button>
                    <Legend selectedCategories={selectedCategories} handleCategoryToggle={handleCategoryToggle} />
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
                            eventContent={eventContentComponent}
                            height="100vh"
                            navLinks={true}
                            dayMaxEvents={2}
                        />
                    </CardContent>
                </Card>
            </Card>
            <Drawer anchor="right" open={drawerOpen} onClose={handleCloseDrawer}>
                <AddEventDrawer
                    selectedEvent={selectedEvent}
                    handleEventDelete={handleEventDelete}
                    handleCloseDrawer={handleCloseDrawer}
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handleEventUpdate={handleEventUpdate}
                    handleEventAdd={handleEventAdd}
                    handleReset={handleReset}
                />
            </Drawer>
        </>
    );
};

export default Calendar;
