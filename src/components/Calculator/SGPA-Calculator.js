import { Box, Button, Card, IconButton, TextField, Typography } from "@mui/material";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { calActions } from "../../store/store";
import DeleteIcon from '@mui/icons-material/Delete';
import { motion, AnimatePresence } from 'framer-motion';
import { getRandomImage } from "../../store/data";



export default function SGPACalculator() {
    const dispatch = useDispatch()
    const [sgpa, setSgpa] = useState("")
    const [subIds, setSubIds] = useState([1]);
    const stName = useRef();
    const stId = useRef();
    const stSemNo = useRef()
    const subNameRefs = useRef([]);
    const subCodeRefs = useRef([]);
    const subGradeRefs = useRef([]);
    const subCreditsRefs = useRef([]);

    const addSubjectHandler = () => {
        setSubIds((prev) => [...prev, subIds.length + 1]);
    };

    const deleteSubComponent = (id) => {
        const updatedSubIds = subIds.filter(subId => subId !== id);
        setSubIds(updatedSubIds);
    };

    const calculateSGPA = (event) => {
        event.preventDefault();
        const subjects = subIds.map((id) => ({
            name: subNameRefs.current[id - 1].value,
            code: subCodeRefs.current[id - 1].value,
            grade: subGradeRefs.current[id - 1].value,
            credits: parseFloat(subCreditsRefs.current[id - 1].value),
        }));

        if (subjects.length === 0) {
            return;
        }

        const data = {
            name: stName.current.value,
            rollNo: stId.current.value,
            semNo: stSemNo.current.value,
            subjects: subjects,
            logo: getRandomImage()
        };

        const totalCredits = subjects.reduce((credits, sub) => {
            return credits + sub.credits;
        }, 0);

        const gpa = subjects.reduce((val, sub) => {
            return val + sub.grade * sub.credits;
        }, 0);

        const sgpa = gpa / totalCredits;
        setSgpa(sgpa);

        const updatedData = { ...data, gradePoints: sgpa.toFixed(2), type: "SGPA" };
        dispatch(calActions.addSgpaData(updatedData));
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Typography variant="h4" component="h1" sx={{ fontSize: "35px", color: '#212B36', fontFamily: 'Roboto' }}>SGPA Calculator</Typography>
            <Card sx={{ padding: 5, borderRadius: 7, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)', marginTop: 5 }}>

                <form onSubmit={calculateSGPA}>
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
                            size="small"
                            sx={{ marginRight: 5 }}
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
                        <TextField
                            inputRef={stSemNo}
                            fullWidth
                            margin="normal"
                            label="Enter Semester No"
                            name="st-semnum"
                            variant="outlined"
                            required
                            sx={{ marginRight: 5 }}
                            type="number"
                            size="small"
                            inputProps={{ min: 1, max: 8 }}
                            InputLabelProps={{
                                style: { fontSize: '14px' }
                            }}
                        />

                        <Button
                            size="small"
                            variant="contained"
                            onClick={addSubjectHandler}
                            sx={{ marginLeft: 4, marginTop: 2, height: '40px', width: '30px' }}
                        >
                            +
                        </Button>
                    </Box>
                    <AnimatePresence>
                        {subIds.map((id) => (
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
                                    <TextField
                                        inputRef={(el) => (subNameRefs.current[id - 1] = el)}
                                        label="Enter Subject Name"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        sx={{ margin: 2 }}
                                        size="small"
                                        required
                                        InputLabelProps={{
                                            style: { fontSize: '14px' }
                                        }}
                                    />
                                    <TextField
                                        inputRef={(el) => (subCodeRefs.current[id - 1] = el)}
                                        label="Enter Subject Code"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        sx={{ margin: 2 }}
                                        size="small"
                                        required
                                        InputLabelProps={{
                                            style: { fontSize: '14px' }
                                        }}
                                    />
                                    <TextField
                                        inputRef={(el) => (subGradeRefs.current[id - 1] = el)}
                                        label="Enter Grade"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        sx={{ margin: 2 }}
                                        size="small"
                                        required
                                        type="number"
                                        inputProps={{ min: 4, max: 10 }}
                                        InputLabelProps={{
                                            style: { fontSize: '14px' }
                                        }}
                                    />
                                    <TextField
                                        inputRef={(el) => (subCreditsRefs.current[id - 1] = el)}
                                        label="Enter Credits"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        sx={{ margin: 2 }}
                                        size="small"
                                        required
                                        type="number"
                                        inputProps={{ min: 0, max: 4 }}
                                        InputLabelProps={{
                                            style: { fontSize: '14px' }
                                        }}
                                    />
                                    {subIds.length > 1 && <IconButton onClick={() => deleteSubComponent(id)}>
                                        <DeleteIcon color="error" />
                                    </IconButton>}
                                </Box>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    <Box >
                        <Button
                            size="small"
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ marginTop: 2, padding: 1, ml: 38 }}
                        >
                            Calculate SGPA
                        </Button>
                    </Box>
                    <Box mt={2}>
                        <strong>Overall SGPA: {sgpa}</strong>
                    </Box>
                </form>
            </Card>
        </motion.div>
    );
}
