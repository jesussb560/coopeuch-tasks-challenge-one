import * as yup from "yup";
import { CreateTask, UpdateTask } from "../interfaces/task.interface";

export const createValidationSchema: yup.Schema<CreateTask> = yup.object().shape({
    description: yup.string().trim().required('Campo obligatorio').max(255, 'Máximo 255 caracteres')
});

export const updateValidationSchema: yup.Schema<UpdateTask> = yup.object().shape({
    id: yup.number().default(0),
    description: yup.string().trim().required('Campo obligatorio').max(255, 'Máximo 255 caracteres')
});