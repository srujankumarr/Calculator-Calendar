import { Box, Button, Card, TextField, Typography, IconButton } from "@mui/material";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { calActions } from "../../store/store";
import DeleteIcon from '@mui/icons-material/Delete';
import { motion, AnimatePresence } from 'framer-motion';
import { getRandomImage } from "../../store/data";
export default function CGPACalculator() {
    const dispatch = useDispatch()
    const [cgpa, setCgpa] = useState("")
    const [semIds, setsemIds] = useState([1]);
    const stName = useRef();
    const stId = useRef();
    const totalCreditsRefs = useRef([]);
    const creditsAwardedRefs = useRef([]);
    const sgpaRefs = useRef([]);

    const addSubjectHandler = () => {
        if (semIds.length > 7) return
        setsemIds((prev) => [...prev, semIds.length + 1]);
    };

    const calculateCGPA = (event) => {
        event.preventDefault();
        const semsData = semIds.map((id) => ({
            semNo: id,
            totalCredits: Number(totalCreditsRefs.current[id - 1].value),
            creditsAwarded: Number(creditsAwardedRefs.current[id - 1].value),
            sgpa: Number(sgpaRefs.current[id - 1].value),
        }));

        if (semsData.length === 0) {
            return;
        }

        const data = {
            name: stName.current.value,
            rollNo: stId.current.value,
            semesters: semsData,
            logo: getRandomImage()
        };

        const totalCredits = semsData.reduce((credits, sem) => {
            return credits + sem.totalCredits;
        }, 0);

        const gpa = semsData.reduce((val, sem) => {
            return val + sem.creditsAwarded * sem.sgpa;
        }, 0);

        const cgpa = (gpa / totalCredits).toFixed(2);

        setCgpa(cgpa);

        const updatedData = { ...data, gradePoints: cgpa, type: "CGPA" };
        dispatch(calActions.addCgpaData(updatedData));
    };

    const deleteLastSem = () => {
        setsemIds(semIds.slice(0, semIds.length - 1));
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Typography component="p" sx={{ fontSize: "35px", color: '#212B36', fontFamily: 'Roboto' }}>CGPA Calculator</Typography>
            <Card
                sx={{

                    width: 'auto',
                    display: 'block',
                    padding: 5,
                    borderRadius: 7,
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)',
                    marginTop: 5,
                    mr: 'auto', ml: 'auto'
                }}
            >

                <form onSubmit={calculateCGPA}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-around',
                        }}
                    >
                        <TextField
                            inputRef={stName}
                            fullWidth
                            margin="normal"
                            label="Enter Student Name"
                            name="st-name"
                            variant="outlined"
                            required
                            sx={{ marginRight: 5, }}
                            size="small"
                            InputLabelProps={{
                                style: { fontSize: '14px' }
                            }}
                        />
                        <TextField
                            inputRef={stId}
                            fullWidth
                            margin="normal"
                            label="Enter Student Id"
                            name="st-id"
                            variant="outlined"
                            required
                            sx={{ marginRight: 5 }}
                            size="small"
                            InputLabelProps={{
                                style: { fontSize: '14px' }
                            }}
                        />


                        <Button
                            size="small"
                            variant="contained"
                            onClick={addSubjectHandler}
                            sx={{ marginLeft: 3, height: 40, marginTop: 2 }}
                        >
                            +
                        </Button>
                    </Box>
                    <AnimatePresence>
                        {semIds.map((id) => {
                            if (id > 8) {
                                return null;
                            }
                            return (
                                <motion.div
                                    key={id}
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                >
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <Typography variant="h6" sx={{ fontFamily: 'Nunito Sans, sans-serif', marginRight: 2 }}>{`Semester${id}`}</Typography>
                                        <TextField
                                            inputRef={(el) => (totalCreditsRefs.current[id - 1] = el)}
                                            label="Total Credits"
                                            variant="outlined"
                                            fullWidth
                                            margin="normal"
                                            sx={{ margin: 2 }}
                                            size="small"
                                            InputLabelProps={{
                                                style: { fontSize: '14px' }
                                            }}
                                            required
                                        />
                                        <TextField
                                            inputRef={(el) => (creditsAwardedRefs.current[id - 1] = el)}
                                            label="Credits Awarded"
                                            variant="outlined"
                                            fullWidth
                                            margin="normal"
                                            sx={{ margin: 2 }}
                                            size="small"
                                            InputLabelProps={{
                                                style: { fontSize: '14px' }
                                            }}
                                            required
                                            type="number"
                                        />
                                        <TextField
                                            inputRef={(el) => (sgpaRefs.current[id - 1] = el)}
                                            label="Enter SGPA"
                                            variant="outlined"
                                            fullWidth
                                            margin="normal"
                                            sx={{ margin: 2 }}
                                            size="small"
                                            InputLabelProps={{
                                                style: { fontSize: '14px' }
                                            }}
                                            required
                                        />
                                        {(id === semIds.length && id !== 1) ? (
                                            <IconButton onClick={deleteLastSem}>
                                                <DeleteIcon color="error" />
                                            </IconButton>
                                        ) : (
                                            null
                                        )}
                                    </Box>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="small"
                        sx={{ marginTop: 2, padding: 1, ml: 40 }}
                    >
                        Calculate CGPA
                    </Button>
                    <Box mt={2}>
                        <strong>Overall CGPA: {cgpa}</strong>
                    </Box>
                </form>
            </Card>
        </motion.div>
    );
}
