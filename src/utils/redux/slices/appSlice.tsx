import { ITodo } from "@/utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IPopup {
    idToDelete: number;
    isOpened: boolean;
}

interface IAppState {
    todos: ITodo[];
    confirmPopup: IPopup
}

const initialState: IAppState = {
    todos: [],
    confirmPopup: {
        idToDelete: 0,
        isOpened: false
    }

};

export const slice = createSlice({
    name: "app",
    initialState,
    reducers: {
        addTodo(state, action: PayloadAction<ITodo>) {
            state.todos = [...state.todos, action.payload];
        },
        loadTodos(state, action: PayloadAction<ITodo[]>) {
            state.todos = action.payload
        },
        deleteTodo(state, action: PayloadAction<number>) {
            state.todos = state.todos.filter(item => item.id != action.payload)
        },
        updateTodo(state, action: PayloadAction<ITodo>) {
            state.todos = state.todos.map((item) => item.id == action.payload.id ? action.payload : item)
        },
        openPopup(state, action: PayloadAction<number>) {
            state.confirmPopup = {
                idToDelete: action.payload,
                isOpened: true
            }
        },
        closePopup(state) {
            state.confirmPopup = initialState.confirmPopup
        }
    },
});
export const {
    addTodo, loadTodos, deleteTodo, updateTodo, openPopup, closePopup
} = slice.actions;

export default slice.reducer;