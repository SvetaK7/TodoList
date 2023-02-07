import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import {log} from "util";
import {useAppDispatch} from "../../app/store";
import {loginTC} from "./auth-reducer";

type FormikErrorType = {
    email?: string
    password?: string
}

export const Login = () => {
    const dispatch = useAppDispatch();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            console.log('RENDER')
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length < 2) {
                errors.password = 'Length should be more 2 symbols';
            }
            return errors
        },
        onSubmit: values => {
            dispatch(loginTC(values))
            formik.resetForm();
        },
    })
    console.log(formik.values);

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <FormControl>
                <FormLabel>
                    <p>To log in get registered
                        <a href={'https://social-network.samuraijs.com/'}
                           target={'_blank'}> here
                        </a>
                    </p>
                    <p>or use common test account credentials:</p>
                    <p>Email: free@samuraijs.com</p>
                    <p>Password: free</p>
                </FormLabel>
                <form onSubmit={formik.handleSubmit}>
                    <FormGroup>
                        <TextField label="Email"
                                   margin="normal"
                            // name={'email'}
                            // onChange={formik.handleChange}
                            // value={formik.values.email}
                            // onBlur={formik.handleBlur}
                                   {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email ?
                            <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
                        <TextField type="password" label="Password" margin="normal"
                                   {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password &&
                            <div style={{color: 'red'}}>{formik.errors.password}</div>}
                        <FormControlLabel label={'Remember me'} control={
                            <Checkbox checked={formik.values.rememberMe} {...formik.getFieldProps('rememberMe')}/>}
                        />
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </form>
            </FormControl>
        </Grid>
    </Grid>
}