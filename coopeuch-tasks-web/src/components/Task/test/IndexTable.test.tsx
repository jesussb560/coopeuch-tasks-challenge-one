import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { apiInstance } from "../../../api/api-instance.api";
import { Task } from "../../../interfaces/task.interface";
import taskReducer from '../../../redux/slices/task.slice';
import IndexTable from "../IndexTable";
import { MemoryRouter } from "react-router-dom";

describe('IndexTable', () => {

    let store: EnhancedStore;

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
                    message: 'test',
                    status: 200,
                    timestamp: '2024-01-01',
                    data: [
                        { id: 1, description: 'Task 1', createdAt: '2023-01-01', updatedAt: '2023-01-02' },
                        { id: 2, description: 'Task 2', createdAt: '2023-02-01', updatedAt: '2023-02-02' }
                    ]
                }
            });
        });

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <IndexTable />
                </MemoryRouter>
            </Provider>
        );

    });

    test('should load data', async () => {

        await waitFor(() => {
            expect(screen.getByText('Task 1')).toBeDefined();
            expect(screen.getByText('Task 2')).toBeDefined();
        });

        const state = store.getState().task;

        expect(state.tasks).toHaveLength(2);
        expect(state.tasks[0]).toEqual({ id: 1, description: 'Task 1', createdAt: '2023-01-01', updatedAt: '2023-01-02' });
        // expect(state.tasks[1]).toEqual({ id: 2, description: 'Task 2', createdAt: '2023-02-01', updatedAt: '2023-02-02' });

    });
});