import Popup from "../Popup/Popup"
import { useEffect, useState } from "react"
import classNames from "classnames"
import axios from "../../utils/axios.js"
import { useDispatch, useSelector } from "react-redux"
import { addTask } from "../../redux/slice.js"

export default ({ isActive, setActive }) => {
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()

    const [isErr, setIsErr] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)

    const oneDayInMillis = 1000 * 60 * 60 * 24
    const [newTaskData, setNewTaskData] = useState({
        subject: "",
        type: "",
        description: "",
        deadline: 0,
        isGroupTask: false,
        files: []
    })

    useEffect(() => {
        setNewTaskData({
            subject: "",
            type: "",
            description: "",
            deadline: Math.floor((new Date().getTime() + 7 * oneDayInMillis) / oneDayInMillis) * oneDayInMillis,
            isGroupTask: user.permissions > 1,
            files: []
        })
        setIsDisabled(false)
    }, [isActive])

    useEffect(() => setIsErr(false), [newTaskData])

    const dateToString = (num) => {
        const date = new Date(num)
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, 0)}-${String(date.getDate()).padStart(2, 0)}`
    }

    const stringToDate = (str) => {
        const date = String(str).split("-")
        return new Date(date[0], date[1] - 1, date[2]).getTime()
    }

    const createNewTask = async () => {
        if (!isDisabled) {
            const { files, ...taskData } = newTaskData
            setIsDisabled(true)

            try {
                const taskResponse = await axios.post('/tasks/create_task', taskData)
                let newTask = taskResponse.data.task
            
                for (const file of files) {
                    const formData = new FormData()
                    formData.append('file', file)
                    try {
                        const fileResponse = await axios.post(`/files/upload_file/${taskResponse.data.task._id}`, formData)
                        newTask.files.push({name: fileResponse.data.file.name, _id: fileResponse.data.file._id})
                    } catch (error) { 
                    }
                }
                
                dispatch(addTask(newTask))
                console.log(newTask)
                setActive(false)
            } catch {
                setIsErr(true)
                setIsDisabled(false)
            }
        }
    }

    return (
        <Popup isActive={isActive} closeCallback={setActive} title="Новое задание" >
            <div style={{ position: "relative" }}>
                <input type="text" className="input" id="reg__task_subject" value={newTaskData.subject} onChange={e => setNewTaskData({ ...newTaskData, subject: e.target.value })} />
                <label htmlFor="reg__task_subject">Предмет</label>
            </div>

            <div style={{ position: "relative" }}>
                <input type="text" className="input" id="reg__task_type" value={newTaskData.type} onChange={e => setNewTaskData({ ...newTaskData, type: e.target.value })} />
                <label htmlFor="reg__task_type">Тип задания</label>
            </div>

            <div style={{ position: "relative" }}>
                <input type="date" className="input" id="reg__task_date" value={dateToString(newTaskData.deadline)} onChange={e => setNewTaskData({ ...newTaskData, deadline: stringToDate(e.target.value) })} />
                <label htmlFor="reg__task_date">Дедлайн</label>
            </div>

            {
                user.permissions > 1 ?
                    <div className="is_group_task__container">
                        <label className="checkbox_label">Групповое задание</label>
                        <div className="is_group_checkbox">
                            <input type="checkbox" id="new_task_is_group" checked={newTaskData.isGroupTask} onChange={e => setNewTaskData({ ...newTaskData, isGroupTask: e.target.checked })} />
                            <label htmlFor="new_task_is_group"></label>
                        </div>
                    </div>
                    : <></>
            }

            <div style={{ position: "relative" }}>
                <div className="textarea__container">
                    <textarea rows="5" type="text" id="reg__task_description" value={newTaskData.description} onChange={e => setNewTaskData({ ...newTaskData, description: e.target.value })}></textarea>
                </div>
                <label htmlFor="reg__task_description">Описание</label>
            </div>

            <div style={{ position: "relative" }}>
                <input type="file" id="reg__task_files" multiple onChange={e => setNewTaskData({ ...newTaskData, files: e.target.files })} />
                <label htmlFor="reg__task_files">{"Файлов: " + newTaskData.files.length}</label>
            </div>

            <div className="form_separator"></div>

            <button className={classNames("submit_button", { err: isErr, disabled: isDisabled })} onClick={createNewTask} disabled={isDisabled}>Создать</button>
        </Popup>
    )
}