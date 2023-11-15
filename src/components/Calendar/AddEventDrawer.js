// DrawerComponent.js
import React from 'react';
import { Box, Typography, IconButton, MenuItem, Switch, FormControlLabel } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const DrawerComponent = ({
    selectedEvent,
    handleEventDelete,
    handleCloseDrawer,
    formData,
    handleInputChange,
    handleEventUpdate,
    handleEventAdd,
    handleReset
}) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 3, py: 1, alignItems: 'center', marginBottom: 2, backgroundColor: 'rgb(244, 245, 250)' }}>
                <Typography variant="h6" sx={{ color: 'rgba(58, 53, 65, 0.87)' }}>{selectedEvent ? 'Edit Event' : 'Add Event'}</Typography>
                <Box >
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
            <Box sx={{ px: 3, py: 1, display: 'flex', flexDirection: 'column' }}>
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
                        onChange={() => handleInputChange({ target: { name: 'allDay', value: !formData.allDay } })}
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
        </Box >
    );
};

export default DrawerComponent;
