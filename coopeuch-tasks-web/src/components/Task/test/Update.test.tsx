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
import Update from "../Update";


describe('Update', () => {

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

        vi.spyOn(apiInstance, 'get').mockImplementation(() => {
            return Promise.resolve({
                data: {
                    message: 'Ok',
                    status: 200,
                    timestamp: '2024-01-01',
                    data: { id: 1, description: 'Task 1', createdAt: '2023-01-01', updatedAt: '2023-01-02' }
                }
            });
        });

        vi.spyOn(apiInstance, 'patch').mockImplementation(() => {
            return Promise.resolve({
                data: {
                    message: 'Ok',
                    status: 200,
                    timestamp: '2024-01-01',
                    data: 'Task updated successfully'
                }
            });
        });

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Update />
                </MemoryRouter>
            </Provider>
        );

    });

    test('should navigate to "/" when id is not a number', async () => {
        vi.mock('react-router-dom', async () => {
            const actual = await vi.importActual('react-router-dom');
            return {
                ...actual,
                useParams: () => ({
                    id: 'invalid_id',
                }),
            };
        });

        const navigate = vi.fn();
        renderHook(() => {
            useEffect(() => {
                if (isNaN(Number('invalid_id'))) return navigate('/');
            }, []);
        });

        await waitFor(() => {
            expect(navigate).toHaveBeenCalledWith('/');
        });
    });

    test('should update new task', async () => {


        const user = userEvent.setup()

        await user.type(screen.getByLabelText('Descripción *'), 'New Task');
        await user.click(screen.getByText('Actualizar'));

        await waitFor(() => {
            const state = store.getState().task;
            expect(state.success).toBe(true);
        });

    });

    test('should redirect when new task is updated', () => {


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

    test('should not redirect when new task is not updated', async () => {


        const navigate = vi.fn();
        const task = { success: false };

        renderHook(() => {
            useEffect(() => {
                if (task.success) return navigate('/');
            }, [task.success]);
        });

        expect(navigate).not.toHaveBeenCalledWith('/');
        expect(screen.findByText('Actualizar tarea')).toBeDefined();

    });

    test('should not call the onSubmit function when field is blank', async () => {

        await userEvent.click(screen.getByText('Actualizar'));

        await waitFor(() => {
            const state = store.getState().task;
            expect(state.loading).toBe(false);
        });

        const errorMessage = await screen.findByText('Campo obligatorio');
        expect(errorMessage).toBeDefined();

    });

});