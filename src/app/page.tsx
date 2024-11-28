'use client'
import { Button, TextField } from "@mui/material";
import styles from "./page.module.scss";
import { useAppDispatch, useAppSelector } from "@/utils/redux/store";
import TodoItem from "./components/TodoItem/TodoItem";
import { ChangeEvent, SyntheticEvent, useState, MouseEvent, useEffect } from "react";
import { apiDeleteTodo, apiGetTodos, apiPostTodo, apiUpdateTodo } from "@/utils/api";
import { addTodo, closePopup, deleteTodo, loadTodos, updateTodo } from "@/utils/redux/slices/appSlice";
import { ITodo } from "@/utils/types";
import Popup from "./components/Popup/Popup";

export default function Home() {
  const [newTodo, setNewTodo] = useState<string>('');
  const { todos, confirmPopup } = useAppSelector(state => state.appSlice);
  const dispatch = useAppDispatch();
  function handleChangeNewTodo(e: ChangeEvent<HTMLInputElement>) {
    setNewTodo(e.target.value);
  }

  function handleAddNewTodo(e: MouseEvent<HTMLButtonElement>) {
    apiPostTodo(newTodo).then((res) => {
      dispatch(addTodo(res))
    }).catch(console.log)
  }

  function handleDeleteTodo(id: number) {
    apiDeleteTodo(id).then((res) => {
      dispatch(deleteTodo(id))
      dispatch(closePopup());
    }).catch(console.log)
  }

  function handleUpdateTodo(item: ITodo, successCb: () => void) {
    apiUpdateTodo(item).then((res) => {
      successCb();
      dispatch(updateTodo(res))
    }).catch(console.log)
  }

  useEffect(() => {
    apiGetTodos().then((res) => {
      dispatch(loadTodos(res))
    }).catch(console.log)
  }, [])

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.addContainer}>
          <TextField id="outlined-basic" label="Дело" variant="outlined" onChange={handleChangeNewTodo} value={newTodo} fullWidth />
          <Button variant="contained" onClick={handleAddNewTodo}>Добавить</Button>
        </div>
        <div className={styles.todosContainer}>
          {todos?.map(item => (<TodoItem key={item.id} item={item} onUpdate={handleUpdateTodo} />))}
        </div>
      </main>
      {confirmPopup.isOpened &&
        <Popup onConfirm={handleDeleteTodo} />
      }
    </div>
  );
}
