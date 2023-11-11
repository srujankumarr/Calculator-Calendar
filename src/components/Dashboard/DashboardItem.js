import { ListItemIcon, ListItemButton, ListItemText } from "@mui/material";
import { NavLink } from "react-router-dom";
import { alpha } from '@mui/material/styles';
export default function DashboardItem({ name, icon, link, curPath }) {
    const active = curPath === link
    return (
        <NavLink to={link}
            style={{
                textDecoration: 'none',
                color: 'black'
            }}
        >
            <ListItemButton sx={
                {
                    minHeight: 44,
                    borderRadius: 2,
                    marginTop: 0.5,
                    typography: 'body2',
                    color: 'text.secondary',
                    textTransform: 'capitalize',
                    fontWeight: 'fontWeightMedium',
                    ...(active && {
                        color: 'primary.main',
                        fontWeight: 'fontWeightSemiBold',
                        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                        '&:hover': {
                            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
                        },
                    }),
                }
            } >
                <ListItemIcon sx={{ ...(active && { color: (theme) => alpha(theme.palette.primary.main, 1) }) }}>
                    {icon}
                </ListItemIcon>

                <ListItemText sx={
                    {
                        fontFamily: 'Roboto'
                    }
                } primary={name} />
            </ListItemButton>
        </NavLink >



    )
}