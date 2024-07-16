import React from 'react';
import {useAppDispatch, useAppSelector} from "../../../src/redux/hooks.ts";
import {setSearch, setTaskList, typeTask} from "../../redux/slices/tasksSlice.ts";
import {v4} from "uuid";
import {formatDate} from "../../../src/utils/formatDate.ts";
import Task from "../../../src/components/Task/Task.tsx";
import s from './task_list.module.css'
import createBtn from '../../assets/create-btn.svg'
import searchIcn from '../../assets/search-btn.svg'


function TaskList() {
    const dispatch = useAppDispatch()
    const taskList = useAppSelector(state => state.task.taskList)
    const search = useAppSelector(state => state.task.search)
    const [taskTitle, setTaskTitle] = React.useState('')
    const [taskText, setTaskText] = React.useState('')
    const titleRef = React.useRef(null)
    const textRef = React.useRef(null)


    return (
        <div className={s.container}>
            <div className={s.inputs_container}>
                <div className={s.search}>
                    <input type='text' placeholder={'Поиск'} className={s.search} onChange={(e) =>
                    dispatch(setSearch(e.currentTarget.value))} value={search}/>
                    <img src={searchIcn} alt="search"/>
                </div>
                <form>
                    <input type="text" placeholder={'Заголовок'} ref={titleRef}
                           onChange={(e) => setTaskTitle(e.currentTarget.value)}
                           value={taskTitle}/>
                    <input type="text" placeholder={'Заметка'} ref={textRef}
                           onChange={(e) => setTaskText(e.currentTarget.value)}
                           value={taskText}/>
                    <button onClick={(e) => {
                        e.preventDefault()
                        const newTask: typeTask = {
                            id: v4(),
                            title: taskTitle,
                            value: taskText,
                            completed: false,
                            isEditing: {
                                editingTitle: false,
                                editingValue: false
                            },
                            dateAdd: formatDate(new Date())
                        }
                        dispatch(setTaskList([...taskList, newTask]))
                        setTaskTitle('')
                        setTaskText('')
                    }}><img className={s.btn} src={createBtn}/>
                    </button>
                </form>
            </div>
            <ul>{taskList.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.value.toLowerCase().includes(search.toLowerCase()) ? item : '').map((item) => (
                <Task
                    key={item.id}
                    id={item.id}
                    value={item.value}
                    title={item.title}
                    dateAdd={item.dateAdd}
                    completed={item.completed}
                    isEditing={item.isEditing}
                    task={item}
                />))}</ul>
        </div>)
}

export default TaskList;