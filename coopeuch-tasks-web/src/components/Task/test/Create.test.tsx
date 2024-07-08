import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { render, renderHook, screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { useEffect } from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { apiInstance } from "../../../api/api-instance.api";
import { Task } from "../../../interfaces/task.interface";
import taskReducer from '../../../redux/slices/task.slice';
import Create from "../Create";


describe('Create', () => {

    let store: EnhancedStore;

    vi.mock('react-router-dom', async () => {
        const actual = await vi.importActual('react-router-dom');
        return {
            ...actual,
            useNavigate: () => vi.fn(), // Mock de useNavigate para que devuelva una función mock
        };
    });

    beforeEach(() => {

        store = configureStore({
            reducer: {
                task: taskReducer
            },
            preloadedState: {
                task: {
                    loading: false,
                    tasks: [] as Task[],
                    task: {} as Task,
                    success: false,
                    error: false
                }
            }
        });

        vi.spyOn(apiInstance, 'post').mockImplementation(() => {
            return Promise.resolve({
                data: {
                    message: 'Created',
                    status: 200,
                    timestamp: '2024-01-01',
                    data: 'Task created successfully'
                }
            });
        });

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Create />
                </MemoryRouter>
            </Provider>
        );


    });

    test('should save new task', async () => {

        const user = userEvent.setup()

        await user.type(screen.getByLabelText('Descripción *'), 'New Task');
        await user.click(screen.getByText('Crear'));

        await waitFor(() => {
            const state = store.getState().task;
            expect(state.success).toBe(true);
        });

    });

    test('should redirect when new task is saved', () => {
        const navigate = vi.fn();
        const task = { success: true };

        renderHook(() => {
            useEffect(() => {
                if (task.success) return navigate('/');
            }, [task.success]);
        });

        expect(navigate).toHaveBeenCalledWith('/');
        expect(screen.findByText('Tareas')).toBeDefined();

    });

    test('should not redirect when new task is not saved', async () => {

        const navigate = vi.fn();
        const task = { success: false };

        renderHook(() => {
            useEffect(() => {
                if (task.success) return navigate('/');
            }, [task.success]);
        });

        expect(navigate).not.toHaveBeenCalledWith('/');
        expect(screen.findByText('Crear tarea')).toBeDefined();

    });

    test('should not call the onSubmit function when field is blank', async () => {

        await userEvent.click(screen.getByText('Crear'));

        await waitFor(() => {
            const state = store.getState().task;
            expect(state.loading).toBe(false);
        });

        const errorMessage = await screen.findByText('Campo obligatorio');
        expect(errorMessage).toBeDefined();

    });

});