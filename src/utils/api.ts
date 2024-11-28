import { ITodo } from "./types";
import { _fetch } from "./utils";

export function apiPostTodo(todo: string) {
    return _fetch<ITodo>({
        url: `data`,
        method: 'POST',
        body: {
            'title': todo,
        }
    })
}

export function apiGetTodos() {
    return _fetch<ITodo[]>({ url: 'data' })
}

export function apiDeleteTodo(id: number) {
    return _fetch<ITodo>({
        url: `data/${id}`,
        method: "DELETE"
    })
}

export function apiUpdateTodo(dto: ITodo) {
    return _fetch<ITodo>({
        url: `data/${dto.id}`,
        method: "PUT",
        body: { ...dto }
    })
}