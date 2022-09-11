interface ITodo {
    _id?: string;
    title: string;
    isCompleted: boolean;
    created_at: Date;
}

export type { ITodo };