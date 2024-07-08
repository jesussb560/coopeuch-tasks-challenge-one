import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import { Response } from "../interfaces/response.interface";
import { CreateTask, Task, UpdateTask } from "../interfaces/task.interface";
import { apiInstance } from "./api-instance.api";

const endpoint: string = '/tasks'

const findAll: AsyncThunk<Task[], void, {}> = createAsyncThunk<Task[], void>(
    'task/findAll',
    async () => {
        const { data: { data } } = await apiInstance.get<Response>(`${endpoint}/active`);
        return data;
    }
);

const create: AsyncThunk<string, CreateTask, {}> = createAsyncThunk<string, CreateTask>(
    'task/create',
    async (task) => {
        const { data: { data } } = await apiInstance.post<Response>(`${endpoint}/create`, task);
        return data;
    }
);

const findById: AsyncThunk<Task, number, {}> = createAsyncThunk<Task, number>(
    'task/findById',
    async (id) => {
        const { data: { data } } = await apiInstance.get<Response>(`${endpoint}/${id}`);
        return data;
    }
);

const update: AsyncThunk<string, UpdateTask, {}> = createAsyncThunk<string, UpdateTask>(
    'task/update',
    async (task) => {
        const { data: { data } } = await apiInstance.patch<Response>(`${endpoint}/update`, task);
        return data;
    }
);

const remove: AsyncThunk<string, number, {}> = createAsyncThunk<string, number>(
    'task/remove',
    async (id) => {
        const { data: { data } } = await apiInstance.delete<Response>(`${endpoint}/${id}`);
        return data;
    }
);

const taskApi = {
    findAll,
    create,
    findById,
    update,
    remove
};

export default taskApi;