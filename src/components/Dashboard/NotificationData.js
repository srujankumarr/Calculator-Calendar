import userIcon1 from '../../images/student7.jpg'
import notificationIcon from '../../images/notificationicon.svg'
import userIcon2 from '../../images/avatar-person.jpg'

export const notifications = [
    {
        id: 1,
        sender: 'Srujan',
        message: 'Uploaded Details!',
        avatar: userIcon1,
        timestamp: '2 minutes ago',
        isRead: false,
    },
    {
        id: 2,
        sender: 'Sweshik',
        message: 'Added an event',
        avatar: notificationIcon,
        timestamp: '1 hour ago',
        isRead: true,
    },
    {
        id: 3,
        sender: 'John',
        message: 'Meeting tomorrow at 2:00 PM',
        avatar: userIcon2,
        timestamp: '2 hours ago',
        isRead: false,
    },
    {
        id: 4,
        sender: 'Ram',
        message: 'Request Deatils!',
        avatar: notificationIcon,
        timestamp: '1 day ago',
        isRead: false,
    },

];