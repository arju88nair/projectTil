import React, {useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {ThemeProvider, makeStyles, createMuiTheme} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import logo from "../../resources/images/main.png";
import {green} from "@material-ui/core/colors/green";
import {useDispatch, useSelector} from "react-redux";
import {userActions} from "../../_actions/userActions";
import {alertActions, miscActions} from "../../_actions";
import {Link} from 'react-router-dom';


const theme = createMuiTheme({
    palette: {
        primary: green,
    },
});
const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxHeight: '100vh'
    },
    formDiv: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(8),
        borderRadius: '2%',
        backgroundColor: '#ffffff'

    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export function RegisterForm() {
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: ''
    });
    const dispatch = useDispatch();

    // reset login status
    useEffect(() => {
        dispatch(userActions.logout());
    }, []);

    function handleChange(e) {
        const {name, value} = e.target;
        setUser(user => ({...user, [name]: value}));
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (user.username && user.email && user.password) {
            dispatch(miscActions.openSpinner(true))
            dispatch(userActions.register(user));
        }
    }

    const classes = useStyles();


    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline/>
            <Grid container spacing={3} container
                  direction="column"
                  justify="center"
                  alignItems="center">
                <Grid item xs={12}>
                    <img src={logo}/>
                </Grid>

                <Grid className={classes.formDiv}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <ThemeProvider theme={theme}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="username"
                                        label="username"
                                        name="username"
                                        autoComplete="username"
                                        value={user.username}
                                        onChange={handleChange}
                                    />
                                </ThemeProvider>
                            </Grid>
                            <Grid item xs={12}>
                                <ThemeProvider theme={theme}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        onChange={handleChange}
                                        margin="normal"
                                        value={user.email}
                                        type="email"
                                    />
                                </ThemeProvider>
                            </Grid>
                            <Grid item xs={12}>
                                <ThemeProvider theme={theme}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        value={user.password} onChange={handleChange}
                                        inputProps={{minLength: 2}}
                                    />
                                </ThemeProvider>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign Up
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link to="/login" style={{textDecoration: 'none'}}> Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </Container>
    );
}
