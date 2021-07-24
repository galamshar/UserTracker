import React, { props, useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    }
}));

export default function ControlFormComponent() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        registerDate: new Date(),
        lastActivity: new Date()
    });
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = useState();
    const [severity, setSeverity] = useState();
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.valueAsDate });
        if (new Date(state.lastActivity) < new Date(state.registerDate)) {
            setSeverity("error")
            setMessage("Invalid date")
        }
    };

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const todayDate = () => {
        var d = new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }
    const submit = () => {
        fetch("https://tracker-back.azurewebsites.net/api/v1/User", {
            method: 'POST',
            body: JSON.stringify(state),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if(res.status == 400){
                    throw new Error();
                }
            })
            .then(
                (result) => {
                    setSeverity("success");
                    setMessage("Succesfully added!")
                },
            )
            .catch((error) => {
                setSeverity("error")
                setMessage("Something went wrong!")
            })
            .finally(() => {
                setOpen(true)
                window.setTimeout(function(){window.location.reload()},3000)
            })
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    let today = todayDate()
    return (
        <form autoComplete="off" error={severity}>
            <Grid container spacing={4} alignItems="center" justifyContent="center">
                <Grid item xs={3}>
                    <TextField
                        id="registerDate"
                        name="registerDate"
                        label="Registration date"
                        type="date"
                        defaultValue={today}
                        required
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        id="lastActivity"
                        name="lastActivity"
                        label="Last Activity"
                        type="date"
                        defaultValue={today}
                        required
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Button variant="contained" color="primary" onClick={submit}>
                        Confirm
                    </Button>
                </Grid>
            </Grid>

            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity}>
                    {message}
                </Alert>
            </Snackbar>
        </form>
    );
}