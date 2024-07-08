import { createSlice } from "@reduxjs/toolkit";
import taskApi from "../../api/task.api";
import { Task } from "../../interfaces/task.interface";

const initialState = {
    loading: false,
    tasks: [] as Task[],
    task: {} as Task,
    success: false,
    error: false
}

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        resetTaskSuccess: (state) => {
            state.success = false;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(taskApi.findAll.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(taskApi.create.fulfilled, (state, _action) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(taskApi.findById.fulfilled, (state, action) => {
                state.loading = false;
                state.task = action.payload;
            })
            .addCase(taskApi.update.fulfilled, (state, _action) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(taskApi.remove.fulfilled, (state, _action) => {
                state.loading = false;
                state.success = true;
            })
            .addMatcher(
                (action) => action.type.endsWith('/pending'),
                (state) => {
                    state.loading = true;
                }
            )
            .addMatcher(
                (action) => action.type.endsWith('/rejected'),
                (state) => {
                    state.loading = false;
                    state.error = true;
                }
            )

    },
});

export const { resetTaskSuccess } = taskSlice.actions;
export default taskSlice.reducer;