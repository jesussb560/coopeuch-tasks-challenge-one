import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test } from 'vitest';

import Index from '../Index';
import { Provider } from "react-redux";
import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { Task } from "../../../interfaces/task.interface";
import taskReducer from '../../../redux/slices/task.slice';
import { MemoryRouter } from "react-router-dom";

describe('Index', () => {

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

        render(
            <Provider store={store}>
                <MemoryRouter>

                    <Index />
                </MemoryRouter>
            </Provider>
        );
    })

    test('should show principal content', () => {
        expect(screen.getByText('Tareas')).toBeDefined();
        expect(screen.getByTestId('index-tasks-table')).toBeDefined();
        expect(screen.getByTestId('create-task-btn')).toBeDefined();
    });

});