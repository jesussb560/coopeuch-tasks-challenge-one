import { Button, CircularProgress, Grid, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import taskApi from "../../api/task.api";
import { CreateTask } from "../../interfaces/task.interface";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { createValidationSchema } from "../../validation/task.validation";
import { resetTaskSuccess } from "../../redux/slices/task.slice";

const title = 'Crear tarea';
const Create = () => {

    const task = useAppSelector((state) => state.task);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const formik = useFormik<CreateTask>({
        initialValues: {
            description: ''
        },
        onSubmit: (values) => {
            dispatch(taskApi.create(values));
        },
        validationSchema: createValidationSchema
    })

    useEffect(() => {
        if (task.success) {
            return navigate('/');
        }
    }, [task.success]);

    useEffect(() => {
        return () => {
            if (task.success) {
                dispatch(resetTaskSuccess());
            }
        };
    }, [dispatch, task.success]);

    return (
        <>
            <Container maxWidth="xl">
                <Grid container item spacing={4} justifyContent="flex-start">
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Typography variant="h1">{title}</Typography>
                        <Typography variant="subtitle1">
                            Todos los campos con * son obligatorios.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <form onSubmit={formik.handleSubmit}>
                            <Grid container spacing={4}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="description"
                                        name="description"
                                        label="Descripción *"
                                        type="text"
                                        multiline
                                        variant="outlined"
                                        color="secondary"
                                        placeholder="At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium"
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                        helperText={
                                            formik.touched.description &&
                                            formik.errors.description
                                        }
                                    />
                                </Grid>
                                <Grid item={true} xs={12} md={12} lg={12} xl={12} container >
                                    <Grid item={true} xs={6} container>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            size="large"
                                            type="button"
                                            href="/"
                                        >
                                            Volver
                                        </Button>
                                    </Grid>

                                    <Grid item={true} xs={6} justifyContent="flex-end" container>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            size="large"
                                            type="submit"
                                        >
                                            {
                                                task.loading ? <CircularProgress data-testid='circular-progress' /> : 'Crear'
                                            }
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default Create;

