import React, { props, useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid } from "@material-ui/core";
import Divider from '@material-ui/core/Divider';


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
    header: {
        fontFamily: "'Ubuntu', sans-serif",
        fontWeight: 400,
        color: "##3C5AA8",
        opacity: 0.4
    }
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
        let returnValue = difference_time / (1000 * 3600 * 24)
        return returnValue
    }

    const calculate = () => {
        let today = new Date().getTime()
        let requiredDateInMill = date.date * 24 * 60 * 60 * 1000
        let filtedDate = new Date(today - requiredDateInMill).getTime()
        let countOfLastActivityUsers = items.filter(item => getDays(item.registrationDate, item.lastActivity) >= date.date)
        let countOfRegistratedUsers = items.filter(item => item.registrationDate.getTime() <= filtedDate)
        let result = (countOfLastActivityUsers.length / countOfRegistratedUsers.length) * 100
        result = isFinite(result) || isNaN(result) ? result : 0.0
        setRollingRetention( result + "%")
    }

    return (
        <form className={classes.container} autoComplete="off">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography className={classes.header} variant="subtitle1" component="h2">Rolling Retention Calculation</Typography>
                    <Divider light />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="date"
                        name="date"
                        label="X Day"
                        defaultValue="0"
                        type="number"
                        required
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={calculate}>
                        Calculate
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle1" component="h2">
                        {rollingRetention}
                    </Typography>
                </Grid>
            </Grid>
        </form>
    )
}