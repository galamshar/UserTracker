import React, { props, useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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

export default function RollingRetentionCalculateForm(props) {
    const [items, setItems] = useState([]);
    const classes = useStyles();
    const [date, setDate] = useState(1);
    const [rollingRetention, setRollingRetention] = useState();

    useEffect(() => {
        setItems(props.data)
    })

    const handleChange = (event) => {
        setDate({ date, [event.target.name]: parseInt(event.target.value) });
    }

    const getDays = (regDate, lastDate) => {
        let difference_time = lastDate.getTime() - regDate.getTime();
        return difference_time / (1000 * 3600 * 24)
    }

    const calculate = () => {
        let today = new Date().getTime()
        let requiredDateInMill = date.date * 24 * 60 * 60 * 1000
        let filtedDate = new Date(today - requiredDateInMill).getTime()
        let countOfLastActivityUsers = items.filter(item => getDays(item.registrationDate, item.lastActivity) >= date).length
        let countOfRegistratedUsers = items.filter(item => item.registrationDate.getTime() <= filtedDate).length
        setRollingRetention((countOfLastActivityUsers / countOfRegistratedUsers) * 100)
    }

    return (
        <form className={classes.container} autoComplete="off">
            <TextField
                id="date"
                name="date"
                label="Standard"
                defaultValue="1"
                required
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={handleChange}
            />
            <Button variant="contained" color="primary" onClick={calculate}>
                Calculate
            </Button>
            <Typography variant="subtitle1" component="h2">
                {rollingRetention}%
            </Typography>
        </form>
    )
}