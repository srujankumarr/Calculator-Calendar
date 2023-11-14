export const getCategoryColor = (category) => {
    switch (category) {
        case 'Work':
            return {
                'borderColor': 'transparent',
                'color': 'rgb(145, 85, 253)',
                'backgroundColor': ' rgba(145, 85, 253, 0.12)'
            };
        case 'Personal':
            return {
                'borderColor': 'transparent',
                'color': 'rgb(255, 76, 81)',
                'backgroundColor': 'rgba(255, 76, 81, 0.12)'
            };
        case 'Holiday':
            return {
                'borderColor': 'transparent',
                'color': 'rgb(86, 202, 0)',
                'backgroundColor': 'rgba(86, 202, 0, 0.12)'
            };
        case 'Other':
            return {
                'borderColor': 'transparent',
                'color': 'rgb(22, 177, 255)',
                'backgroundColor': 'rgba(22, 177, 255, 0.12)'
            };
        case 'Family':
            return {
                'borderColor': 'transparent',
                'color': 'rgb(255, 180, 0)',
                'backgroundColor': 'rgba(255, 180, 0, 0.12)'
            };
        default:
            return {
                'borderColor': 'transparent',
                'color': 'rgba(58, 53, 65, 0.8)',
                'backgroundColor': 'rgba(58, 53, 65, 0.12)'
            };
    }
};

export const defaultEvents = [
    {
        publicId: 1,
        title: 'Meeting with Hod',
        category: 'Work',
        start: new Date('2023-11-10T09:00:00'),
        end: new Date('2023-11-10T12:00:00'),
        allDay: false
    },
    {
        publicId: 2,
        title: 'Dinner',
        category: 'Personal',
        start: new Date('2023-11-15T14:00:00'),
        end: new Date('2023-11-15T17:00:00'),
        allDay: false
    },

    {
        publicId: 3,
        title: 'Trip to Vij',
        category: 'Family',
        start: new Date('2023-11-01T14:00:00'),
        end: new Date('2023-11-03T17:00:00'),
        allDay: true
    },
    {
        publicId: 4,
        title: "Children's Day",
        category: 'Holiday',
        start: new Date('2023-11-14T00:00:00'),
        end: new Date('2023-11-14T23:59:59'),
        allDay: true
    },
    {
        publicId: 5,
        title: "Date",
        category: 'Other',
        start: new Date('2023-11-20T21:00:00'),
        end: new Date('2023-11-20T21:59:59'),
        allDay: false
    }
];

export const loadEventsFromStorage = () => {
    const storedEvents = localStorage.getItem('calendarEvents');
    return storedEvents ? JSON.parse(storedEvents) : defaultEvents;
};

export const saveEventsToStorage = (events) => {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
};