import CreateIcon from "@mui/icons-material/Create";
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import { nanoid } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import taskApi from "../../api/task.api";
import { Task } from "../../interfaces/task.interface";
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { white } from "../../theme";
import RemoveTask from "./RemoveTask";

const headers = [
    "Acciones",
    "id",
    "Descripción",
    "Fecha registro",
    "Fecha modificación"
];

const IndexTable = () => {

    const task = useAppSelector(state => state.task);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(taskApi.findAll());
    }, [dispatch]);

    const handleTaskRemoved = useCallback(() => {
        dispatch(taskApi.findAll());
    }, [dispatch]);

    return (
        <Paper data-testid='index-tasks-table'>
            <TableContainer>
                <Table
                    sx={{ minWidth: 550 }}
                    size="medium"
                    aria-label="tasks table"
                >
                    <TableHead>
                        <TableRow>
                            {headers.map((header) => (
                                <TableCell style={{ color: white }} align="left" key={header}>
                                    {header}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {task.tasks.map((task: Task) => (
                            <TableRow
                                key={task.id}
                                sx={{
                                    "&:last-child td, &:last-child th": { border: 0 },
                                }}
                            >
                                <TableCell align="left" style={{ color: white }}>
                                    <RemoveTask key={nanoid(1)} id={task.id} description={task.description} onTaskRemoved={handleTaskRemoved} />
                                    <Tooltip title="Editar">
                                        <IconButton
                                            key={task.id}
                                            style={{ color: white }}
                                            onClick={() =>
                                                navigate(`/${task.id}`, {
                                                    replace: true,
                                                })
                                            }
                                        >
                                            <CreateIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                                <TableCell align="left" style={{ color: white }}>
                                    {task.id}
                                </TableCell>
                                <TableCell align="left" style={{ color: white }} title={task.description}>
                                    <Typography noWrap style={{ maxWidth: 200 }}>
                                        {task.description}
                                    </Typography>
                                </TableCell>
                                <TableCell align="left" style={{ color: white }}>
                                    {dayjs(task.createdAt).format("DD-MM-YYYY hh:mm")}
                                </TableCell>
                                <TableCell align="left" style={{ color: white }}>
                                    {task.updatedAt ? dayjs(task.updatedAt).format("DD-MM-YYYY hh:mm") : ""}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {task.tasks.length < 1 && (
                <Typography variant="h5" >
                    Sin datos
                </Typography>
            )}
        </Paper>
    )
}

export default IndexTable;