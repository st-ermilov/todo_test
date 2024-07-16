import React from 'react';
import {setEditedTask} from "../../redux/slices/tasksSlice.ts";
import {useAppDispatch, useAppSelector} from "../../redux/hooks.ts";
import s from './input_for_edit.module.css'
import doneBtn from '../../assets/done-btn.svg'

type InputForEditPropsType = {
    isEditingType: 'editingTitle' | 'editingValue'
    editedType: 'editedTitle' | 'editedValue'
    saveChanges: () => void
    placeholderText: string
    inputValue: string
}

function InputForEdit(props: InputForEditPropsType) {
    const dispatch = useAppDispatch()
    const editedTask = useAppSelector(state => state.task.editedTask)
    const inputRef = React.useRef(null);
    const textareaRef = React.useRef(null)

    React.useEffect(() => {
        if (props.editedType === 'editedTitle' && inputRef.current) {
            inputRef.current.focus();
        } else if (props.editedType === 'editedValue' && textareaRef.current) {
            const length = editedTask[props.editedType].length;
            textareaRef.current.setSelectionRange(length, length);
            textareaRef.current.focus();
        }
    }, [props.editedType]); //

    return (
        <>
            {props.editedType === 'editedTitle'
                ? <div className={s.input_container}>
                    <input className={s.input} type="text" placeholder={props.placeholderText} ref={inputRef}
                           onChange={(e) => {
                               dispatch(setEditedTask({editType: props.editedType, value: e.currentTarget.value}))
                           }} value={editedTask[props.editedType]} onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            props.saveChanges()
                        }
                    }}
                    />
                    <button type={'button'}
                            onClick={props.saveChanges}
                    >
                        <img src={doneBtn} className={s.btn} alt="done"/>
                    </button>
                </div>
                : <div className={s.textarea_container}>
                    <textarea className={s.textarea}
                                 placeholder={props.placeholderText}
                                 ref={textareaRef}
                                 onChange={(e) => {
                                     dispatch(setEditedTask({editType: props.editedType, value: e.currentTarget.value}))
                                 }}
                                 value={editedTask[props.editedType]}
                                 cols="30" rows="10">
        </textarea>
                    <button type={'button'}
                            onClick={props.saveChanges}
                    >
                        <img src={doneBtn} className={s.btn} alt="done"/>
                    </button>
                </div>
            }
        </>
    )
}

export default InputForEdit;