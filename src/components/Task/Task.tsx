import s from './task.module.css'
import {useAppDispatch} from "../../redux/hooks.ts";
import {
    completeTask,
    deleteTask,
    editTask,
    setEditedTask,
    submitEditingTask,
    typeTask
} from "../../redux/slices/tasksSlice.ts";
import InputForEdit from "../../components/InputForEdit/InputForEdit.tsx";
import createBtn from '../../assets/create-btn.svg'
import deleteBtn from '../../assets/delete-btn.svg'
import doneBtn from '../../assets/done-btn.svg'
import editBtn from '../../assets/edit-btn.svg'


export type TaskPropsType = {
    id: string
    title: string
    value: string
    dateAdd: string
    completed: boolean
    isEditing: {
        editingTitle: boolean
        editingValue: boolean
    }
    task: typeTask
}

function Task(props: TaskPropsType) {
    const dispatch = useAppDispatch()

    function complete() {
        dispatch(completeTask(props.id))
    }

    function deleteItem() {
        dispatch(deleteTask(props.task))
    }

    function edit(editParams, setEditedTaskParams) {
        dispatch(editTask(editParams))
        dispatch(setEditedTask(setEditedTaskParams))

    }

    function saveChanges(editedParams, editingParams) {
        dispatch(submitEditingTask(editedParams))
        dispatch(editTask(editingParams))
    }

    return (
        <div className={`${s.container} ${props.completed ? s.task_done : ''}`}>
            <li>
                <div className={s.title}>
                    {props.isEditing.editingTitle
                        ? <InputForEdit task={props.task}
                                        isEditingType={'editingTitle'}
                                        editedType={'editedTitle'}
                                        saveChanges={() => saveChanges({
                                            id: props.id,
                                            editType: 'editedTitle'
                                        }, {id: props.id, editType: 'editingTitle'})}
                                        placeholderText={props.title}
                        />
                        : <>
                            <h4 onDoubleClick={() => edit(
                                {id: props.id, editType: 'editingTitle'},
                                {editType: 'editedTitle', value: props.task.title})}>{props.title}</h4>
                            <button onClick={() => {
                                edit(
                                    {id: props.id, editType: 'editingTitle'},
                                    {editType: 'editedTitle', value: props.task.title})
                            }}><img className={s.btn} src={editBtn}/>
                            </button>
                        </>
                    }
                </div>
                <div className={s.text}>
                    {props.isEditing.editingValue
                        ? <InputForEdit task={props.task}
                                        isEditingType={'editingValue'}
                                        editedType={'editedValue'}
                                        saveChanges={() => saveChanges({
                                            id: props.id,
                                            editType: 'editedValue'
                                        }, {id: props.id, editType: 'editingValue'})}
                                        placeholderText={props.value}
                        />
                        : <> <p onDoubleClick={() => {
                            edit(
                                {id: props.id, editType: 'editingValue'},
                                {editType: 'editedValue', value: props.task.value})
                        }}>{props.value}</p>
                            <button onClick={() => {
                                edit(
                                    {id: props.id, editType: 'editingValue'},
                                    {editType: 'editedValue', value: props.task.value})
                            }}><img className={s.btn} src={editBtn}/>
                            </button>
                        </>}
                </div>
                <div className={s.task_footer}>
                    <span>{props.dateAdd}</span>
                    <div className={s.footer_btns}>
                        <button onClick={complete}><img className={s.btn} src={doneBtn}/>
                        </button>
                        <button onClick={deleteItem}><img className={s.btn} src={deleteBtn}/>
                        </button>
                    </div>
                </div>
            </li>
        </div>
    )
        ;
}

export default Task;