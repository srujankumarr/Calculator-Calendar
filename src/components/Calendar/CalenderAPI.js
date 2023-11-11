import React, { useEffect, useState } from "react";
import axios from "axios";

const CalendarComponent = () => {
    const [holidays, setHolidays] = useState([]);
    const API_KEY = "OooNSRMeTpKy9vk5SrHkxY8kSvEOdGe6"; // Replace with your Calendarific API key

    useEffect(() => {
        const api = axios.create({
            baseURL: "https://calendarific.com/api/v2",
            params: {
                api_key: API_KEY,
            },
        });

        const fetchHolidays = async () => {
            try {
                const response = await api.get("/holidays", {
                    params: {
                        country: "IN",
                        year: 2023,
                    },
                });

                setHolidays(response.data.response.holidays);
            } catch (error) {
                console.error("Error fetching holidays:", error.message);
            }
        };

        fetchHolidays();
    }, []);

    // Group holidays by month
    const holidaysByMonth = holidays.reduce((acc, holiday) => {
        const month = new Date(holiday.date.iso).getMonth();
        if (!acc[month]) {
            acc[month] = [];
        }
        acc[month].push(holiday);
        return acc;
    }, {});

    return (
        <div>
            <h2>Holidays in India</h2>
            {Object.keys(holidaysByMonth).map((month) => (
                <div key={month}>
                    <h3>{new Date(2023, month, 1).toLocaleString('default', { month: 'long' })}</h3>
                    <ul>
                        {holidaysByMonth[month].map((holiday, index) => (
                            <li key={index}>
                                {holiday.name} - {holiday.date.iso}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default CalendarComponent;
