import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import type {RootState} from '../../redux/store.ts'
import {v4} from 'uuid'

export type typeTask = {
    id: string
    title: string
    value: string
    dateAdd: string
    completed: boolean
    isEditing: {
        editingTitle: boolean
        editingValue: boolean
    }
}

export type OptionsType = {
    value: string,
    label: string
}

export type EditTaskAction = {
    id: string;
    editType: 'editingTitle' | 'editingValue';
};

export type SetEditTaskParamsType = {
    editType: 'editedTitle' | 'editedValue';
    value: string;
}

export type SubmitEditingTaskType = {
    id: string;
    editType: 'editedTitle' | 'editedValue';
}
type initialState = {
    taskList: typeTask[],
    task: typeTask,
    editedTask: {
        editedTitle: string
        editedValue: string
    },
    select: OptionsType | null,
    search: string
}


const initialState: initialState = {
    taskList: [],
    task: {
        id: v4(),
        title: '',
        value: '',
        dateAdd: new Date().toString(),
        completed: false,
        isEditing: {
            editingTitle: false,
            editingValue: false
        }
    },
    editedTask: {
        editedTitle: '',
        editedValue: ''
    },
    select: null,
    search: ''
}

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        setTask: (state, action: PayloadAction<typeTask>) => {
            state.task = action.payload
        },

        setEditedTask: (state, action: PayloadAction<SetEditTaskParamsType>) => {
            const {editType, value} = action.payload
            state.editedTask = {
                ...state.editedTask,
                [editType === 'editedTitle' ? 'editedTitle' : 'editedValue']: value
            };
        },

        completeTask: (state, action: PayloadAction<string>) => {
            const findTask = state.taskList.find((item) => item.id === action.payload)
            if (findTask) {
                findTask.completed = !findTask.completed
            }
        },

        editTask: (state, action: PayloadAction<EditTaskAction>) => {
            const {id, editType} = action.payload
            const findTask = state.taskList.find((item) => item.id === id)
            if (findTask) {
                findTask.isEditing[editType] = !findTask.isEditing[editType]
                if (editType === 'editingTitle') {
                    state.editedTask.editedTitle = findTask.title
                }
                if (editType === 'editingValue') {
                    state.editedTask.editedValue = findTask.value
                }
            }
        },

        submitEditingTask: (state, action: PayloadAction<SubmitEditingTaskType>) => {
            const findTask = state.taskList.find((item) => item.id === action.payload.id)
            if (findTask) {
                if (action.payload.editType === 'editedTitle') {
                    findTask.title = state.editedTask.editedTitle
                }
                if (action.payload.editType === 'editedValue') {
                    findTask.value = state.editedTask.editedValue
                }
            }
        },
        deleteTask: (state, action: PayloadAction<typeTask>) => {
            state.taskList = state.taskList.filter((item) => item.id !== action.payload.id)
        },

        setTaskList: (state, action: PayloadAction<typeTask[]>) => {
            state.taskList = action.payload
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload
        },

    }
})

export const selectFindItemById = (id: string) => (state: RootState) => state.task.taskList.find((item: typeTask) => item.id === id)

export const {
    setTask,
    setEditedTask,
    setTaskList,
    deleteTask,
    completeTask,
    editTask,
    submitEditingTask,
    setSearch
} = taskSlice.actions
export default taskSlice.reducer