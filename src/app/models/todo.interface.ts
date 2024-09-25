export type Todo = Readonly<{
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}>