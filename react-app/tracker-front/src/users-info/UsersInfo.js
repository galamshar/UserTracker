import { makeStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import React, { useEffect, useState } from "react";
import UserChart from './UserChart';
import ControlForm from '../users-control-form/ControlForm';
import RollingRetentionCalculateForm from '../users-control-form/RollingRetentionCalculateForm'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(() => ({
    table: {
        minWidth: 650,
    },
    paddingtop: {
        paddingTop: "70px",
        paddingLeft: "20px",
        paddingRight: "20px",
        marginLeft: "auto",
        marginRight: "auto",
    }
}));

export default function UsersInfo() {
    const { table, paddingtop } = useStyles();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch("https://localhost:5001/api/v1/User")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    result.map((element) => (
                        element.registrationDate = new Date(element.registrationDate),
                        element.lastActivity = new Date(element.lastActivity)
                    ))
                    setItems(result);

                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Загрузка...</div>;
    } else {
        return (
            <div>
                <Container maxWidth="md">
                    <ControlForm className={paddingtop} />
                    <Grid container spacing={4}>
                        <Grid item xs={6}>
                            <UserChart data={items} />
                        </Grid>
                        <Grid item xs={6}>
                        <RollingRetentionCalculateForm data={items} />
                        </Grid>
                    </Grid>
                    <TableContainer component={Paper}>
                        <Table className={table} aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Id</TableCell>
                                    <TableCell align="center">Registration Date</TableCell>
                                    <TableCell align="center">Last activity</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {items.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell component="th" scope="row">
                                            {row.id}
                                        </TableCell>
                                        <TableCell align="center">{row.registrationDate.toString().substring(0, 24)}</TableCell>
                                        <TableCell align="center">{row.lastActivity.toString().substring(0, 24)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            </div>
        );
    }
}