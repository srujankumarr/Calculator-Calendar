import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Avatar, Box, IconButton } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import { TextField } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import styled from '@emotion/styled';
import { calActions } from '../../store/store';
import TablePagination from '@mui/material/TablePagination';

const CustomTableCell = styled(TableCell)(({ theme }) => ({
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontSize: '15px'
}));

const History = () => {
    const dispatch = useDispatch();
    const cgpaData = useSelector((state) => state.cal.cgpaData);
    const sgpaData = useSelector((state) => state.cal.sgpaData);
    const [searchTerm, setSearchTerm] = useState('');
    const data = [...cgpaData, ...sgpaData].filter((row) =>
        row.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const deleteItemFromHistory = (id, type) => {
        dispatch(calActions.removeItemFromHistory({ id, type }));
        dispatch(calActions.setData());
    };

    const searchHistory = (event) => {
        setSearchTerm(event.target.value);
    };


    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Card
                    sx={{
                        borderRadius: 5,
                        boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.15)',
                        width: '70vw',
                        mb: 10,
                        mt: 12,
                        ml: 20,
                        padding: '25px 25px 0 25px'
                    }}
                >
                    <Typography variant="h4" component="div" gutterBottom>
                        History
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', }}>
                        <TextField
                            label="Search"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            sx={{ width: 300 }}
                            InputProps={{
                                endAdornment: (
                                    <IconButton>
                                        <SearchOutlined />
                                    </IconButton>
                                ),
                            }}
                            onChange={searchHistory}
                        />

                    </Box>

                    <Box sx={{ padding: '25px', textAlign: 'center' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontFamily: 'Roboto', fontSize: '15px' }}>Student Name</TableCell>
                                    <CustomTableCell>Roll Number</CustomTableCell>
                                    <CustomTableCell>Type</CustomTableCell>
                                    <CustomTableCell>Semester Number</CustomTableCell>
                                    <CustomTableCell>GradePoints</CustomTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {data.slice((page) * rowsPerPage, (page + 1) * rowsPerPage).map((row, index) => (
                                    <TableRow key={row.id + row.type}>
                                        <CustomTableCell sx={{ display: 'flex' }}>
                                            <Avatar>
                                                <img style={{ width: '45px' }} src={row.logo} alt={`${row.name}'s Avatar`} />
                                            </Avatar>
                                            <Typography sx={{ marginTop: 1, marginLeft: 2 }} variant="p">
                                                {row.name}
                                            </Typography>
                                        </CustomTableCell>
                                        <CustomTableCell>{row.rollNo}</CustomTableCell>
                                        <CustomTableCell>{row.type}</CustomTableCell>
                                        <CustomTableCell>
                                            {row.type === 'SGPA' ? `Sem ${row.semNo}` : `Upto Sem ${row.semesters.length}`}
                                        </CustomTableCell>
                                        <CustomTableCell>{row.gradePoints}</CustomTableCell>
                                        <CustomTableCell>
                                            <IconButton onClick={() => deleteItemFromHistory(row.id, row.type)}>
                                                <DeleteIcon color="error" />
                                            </IconButton>
                                        </CustomTableCell>
                                    </TableRow>

                                ))}

                            </TableBody>
                        </Table>
                        {data.length === 0 && <Typography sx={{ fontFamily: 'Roboto', fontSize: '30px', my: 10 }}>No Results Found</Typography>}
                    </Box>
                    {data.length !== 0 && <TablePagination
                        component="div"
                        count={data.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        rowsPerPageOptions={[5, 10, 15, 25]}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />}
                </Card>
            </motion.div >
        </>
    );
};

export default History;
