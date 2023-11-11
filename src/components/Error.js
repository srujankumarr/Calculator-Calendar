import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Error() {
    return (
        <>
            <Typography>Page Not Found</Typography>
            <Link to='/'>
                <Button variant="contained">Go to Home</Button>
            </Link>
        </>
    )
}