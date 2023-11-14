// Legend.js
import React from 'react';
import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
import { getCategoryColor } from './util';
export default function Legend({ selectedCategories, handleCategoryToggle }) {
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
