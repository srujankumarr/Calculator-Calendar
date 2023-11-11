import styled from "@emotion/styled";
import { Box, Button, Card, CardContent, CssBaseline, Link as AnchorLink, TextField, Typography } from "@mui/material";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { loginActions } from "../../store/store";



export default function Signup() {
    const CustomTextField = styled(TextField)(({ theme }) => ({
        width: 300
    }))
    const CustomButton = styled(Button)(({ theme }) => ({
        background: 'rgb(33, 43, 54)',
        marginTop: 20,
        width: 300,
        padding: 12,
        '&:hover': {
            background: 'rgb(23, 31, 41)'
        }
    }))
    const CustomTypography = styled(Typography)(({ theme }) => ({
        marginBottom: 15
    }))


    const dispatch = useDispatch()

    const email = useRef()
    const password = useRef()
    const submitHandler = (event) => {
        event.preventDefault()
        const enteredEmail = email.current.value
        const enteredPassword = password.current.value
        console.log(enteredEmail, enteredPassword);
        dispatch(loginActions.login({ email: enteredEmail, password: enteredPassword }))
    }
    return (
        <Card sx={{
            width: 400,
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
            borderRadius: 3,
            marginTop: 15,
            padding: 5,
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)'
        }}>
            <CssBaseline />
            <CardContent >
                <CustomTypography variant="h5">Welcome !</CustomTypography>
                <CustomTypography variant="p">Don't have a account? <AnchorLink href="#">Get started</AnchorLink> </CustomTypography>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: 3
                }}>
                    <form onSubmit={submitHandler}>
                        <CustomTextField inputRef={email} margin="normal" id="email" name="email" label="Enter Email" />
                        <CustomTextField inputRef={password} margin="normal" type="password" id="password" name="password" label="Enter Password" />
                        <CustomButton type="submit" variant="contained">Login</CustomButton>
                    </form>
                </Box>
                <AnchorLink sx={{
                    float: 'right',
                    marginTop: 3
                }} href="#">Forget password?</AnchorLink>
            </CardContent>
        </Card>
    )
}