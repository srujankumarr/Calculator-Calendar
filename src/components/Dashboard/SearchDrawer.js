import { InputBase, Drawer, Paper, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { dashboardActions } from '../../store/store'
export default function SearchDrawer() {
    const openSearchDrawer = useSelector((state) => state.dashboard.openSearchDrawer)
    const dispatch = useDispatch()
    const searchDrawerHandler = () => {
        dispatch(dashboardActions.toggleSearchDrawer())
    }
    return (
        <Drawer hideBackdrop={true} open={openSearchDrawer} anchor='top'
            onClose={searchDrawerHandler} >
            <Paper style={{
                backgroundColor: 'rgba(249, 250, 251, 0.8)',
                padding: 25,
                display: 'flex',
                justifyContent: 'space-between'
            }}>

                <InputBase sx={{ marginLeft: 10 }} type='text' id='search' placeholder="Search..." />
                <Button variant='contained'>Search</Button>
            </Paper>

        </Drawer>
    )
}