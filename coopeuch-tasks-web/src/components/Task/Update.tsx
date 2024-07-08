import { Button, CircularProgress, Grid, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import taskApi from "../../api/task.api";
import { UpdateTask } from "../../interfaces/task.interface";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { updateValidationSchema } from "../../validation/task.validation";
import { resetTaskSuccess } from "../../redux/slices/task.slice";

const title = 'Actualizar tarea';
const Update = () => {

    const task = useAppSelector((state) => state.task);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const formik = useFormik<UpdateTask>({
        enableReinitialize: true,
        initialValues: {
            id: task.task.id,
            description: task.task.description
        },
        onSubmit: (values) => {
            dispatch(taskApi.update(values));
        },
        validationSchema: updateValidationSchema
    })

    useEffect(() => {
        if (!id || isNaN(Number(id))) return navigate('/');
        dispatch(taskApi.findById(Number(id)));
    }, [id]);

    useEffect(() => {
        if (task.success) {
            return navigate('/')
        };

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
                                        placeholder="lorem"
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
                                                task.loading ? <CircularProgress data-testid='circular-progress' /> : 'Actualizar'
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

export default Update;

