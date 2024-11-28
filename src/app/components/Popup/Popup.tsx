import React, { MouseEvent } from 'react'
import './Popup.scss';
import { Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/utils/redux/store';
import { closePopup } from '@/utils/redux/slices/appSlice';

interface props {
    onConfirm: (id: number) => void;
}

export default function Popup({ onConfirm }: props) {
    const dispatch = useAppDispatch();
    const { confirmPopup } = useAppSelector(state => state.appSlice)

    function handleClosePopup() {
        dispatch(closePopup())
    }

    function handleBackgroundClick(e: MouseEvent<HTMLDivElement>) {
        const target = e.target;
        const currTarget = e.currentTarget;
        if (target == currTarget) {
            handleClosePopup();
        }
    }

    return (
        <div className='popup' onClick={handleBackgroundClick}>
            <div className='popup__content'>
                Подтвердить удаление?
                <div className='popup__container'>
                    <Button variant="contained" onClick={() => onConfirm(confirmPopup.idToDelete)}>Да</Button>
                    <Button variant="contained" onClick={handleClosePopup}>Нет</Button>
                </div>
            </div>
        </div>
    )
}
