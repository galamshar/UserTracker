import React, { props, useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

export default function ControlFormComponent() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        registerDate: new Date(),
        lastActivity: new Date()
    });
    const [error, setError] = useState();
    const [isError, setIsError] = useState();
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.valueAsDate });
        if (new Date(state.lastActivity) < new Date(state.registerDate)) {
            setIsError(true)
            setError("Invalid date")
        }
    };

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
        fetch("https://localhost:5001/api/v1/User", {
            method: 'POST',
            body: JSON.stringify(state),
            headers: {
                'Content-Type': 'application/json'
              }
        }).then(res => res, err => setError(err))
    }
    let today = todayDate()
    return (
        <form className={classes.container} autoComplete="off" error={isError}>
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
            <Button variant="contained" color="primary" onClick={submit}>
                Confirm
            </Button>
        </form>
    );
}