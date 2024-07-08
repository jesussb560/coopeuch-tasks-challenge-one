import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { apiInstance } from "../../../api/api-instance.api";
import { Task } from "../../../interfaces/task.interface";
import taskReducer from '../../../redux/slices/task.slice';
import RemoveTask from "../RemoveTask";

describe('RemoveTask', () => {
    let store: EnhancedStore;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                task: taskReducer
            },
            preloadedState: {
                task: {
                    loading: false,
                    tasks: [
                    ] as Task[],
                    task: {} as Task,
                    success: false,
                    error: false
                }
            }
        });

        vi.spyOn(apiInstance, 'delete').mockResolvedValue({
            data: {
                message: 'Ok',
                status: 200,
                timestamp: '2024-01-01',
                data: 'Task removed successfully'
            }
        });
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <RemoveTask id={1} key={1} description="test-repeat" onTaskRemoved={() => { }} />
                </MemoryRouter>
            </Provider>
        );
    });

    test('renders delete button', async () => {
        const deleteButton = screen.getByTitle('Borrar');
        expect(deleteButton).toBeDefined();
    });

    test('opens confirmation dialog on click', async () => {
        const deleteButton = await waitFor(() => screen.getByTitle('Borrar'));
        userEvent.click(deleteButton);

        const confirmationDialogTitle = await screen.findByText(/¿Eliminar tarea?/i);
        expect(confirmationDialogTitle).toBeDefined();
    });

    test('executes removal on confirmation', async () => {

        const deleteButton = screen.getByTitle('Borrar');
        userEvent.click(deleteButton);

        const confirmButton = await screen.findByRole('button', {
            name: /eliminar/
        });

        userEvent.click(confirmButton);

        await waitFor(() => {
            expect(apiInstance.delete).toHaveBeenCalled();
            const state = store.getState().task;
            expect(state.success).toBe(true);
        });

    });

});