export interface Task {
    id: number,
    description: string,
    createdAt: string,
    updatedAt: string,
    active: boolean
}

export type CreateTask = Pick<Task, 'description'>;
export type UpdateTask = Pick<Task, 'id' | 'description'>;
