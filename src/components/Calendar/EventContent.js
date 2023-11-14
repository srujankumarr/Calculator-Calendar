
import React from 'react';
import { Box, Typography } from '@mui/material';
import { getCategoryColor } from './util';
export const eventContent = (eventInfo, handleEventClick) => {
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
