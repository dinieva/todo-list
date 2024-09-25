/* export type NewTodo  = Readonly<{
    userId: number; 
    title: string;
    completed: boolean;
}> */
import { Todo } from "./todo.interface";
export type NewTodo  = Readonly<Omit<Todo, 'id'>>;