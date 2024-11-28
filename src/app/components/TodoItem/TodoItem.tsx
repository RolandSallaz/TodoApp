import React, { ChangeEvent, useState } from 'react'
import './TodoItem.scss';
import { ITodo } from '@/utils/types';
import { Button, TextField } from '@mui/material';
import { useAppDispatch } from '@/utils/redux/store';
import { openPopup } from '@/utils/redux/slices/appSlice';

interface props {
    item: ITodo;
    onUpdate: (item: ITodo, successCb: () => void) => void;
}

export default function TodoItem({ item, onUpdate }: props) {
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [titleValue, setTitleValue] = useState<string>(item.title);
    const dispatch = useAppDispatch();
    function handleDelteClick() {
        dispatch(openPopup(item.id))
    }

    function startEditing() {
        setIsEdit(true);
    }

    function stopEditing() {
        setIsEdit(false)
    }

    function handleChangeTitle(e: ChangeEvent<HTMLInputElement>) {
        setTitleValue(e.target.value)
    }

    function handleUpdate() {
        onUpdate({ ...item, title: titleValue }, () => setIsEdit(false))
    }

    return (
        <div className='todo-item'>
            {isEdit
                ?
                (<TextField id="outlined-basic" label="Новое задание" variant="outlined" onChange={handleChangeTitle} value={titleValue} fullWidth />)
                :
                <p className='todo-item__text'>{item.title}</p>
            }
            <div className='todo-item__button-container'>
                {isEdit
                    ?
                    (
                        <>
                            <Button variant="contained" onClick={handleUpdate}>Сохранить</Button>
                            <Button variant="contained" onClick={stopEditing}>Отмена</Button>
                        </>
                    )
                    :
                    (
                        <>
                            <Button variant="contained" onClick={startEditing}>Изменить</Button>
                            <Button variant="contained" onClick={handleDelteClick}>Удалить</Button>
                        </>
                    )
                }
            </div>
        </div>
    )
}
