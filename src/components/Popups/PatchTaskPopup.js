import Popup from "../Popup/Popup"
import { useEffect, useState } from "react"
import classNames from "classnames"
import axios from "../../utils/axios.js"
import { useDispatch } from "react-redux"
import { patchTask, deleteTask, setIsUploading } from "../../redux/slice.js"

export default ({ isActive, setActive, task }) => {
    const dispatch = useDispatch()

    const [isErr, setIsErr] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)
    const [taskData, setTaskData] = useState({
        subject: "",
        type: "",
        description: "",
        deadline: 0,
        isGroupTask: false,
        files: []
    })

    useEffect(() => {
        setTaskData({
            subject: task.subject,
            type: task.type,
            description: task.description,
            deadline: task.deadline,
            isGroupTask: task.isGroupTask,
            files: []
        })
        setIsDisabled(false)
    }, [isActive])

    const dateToString = (num) => {
        const date = new Date(num)
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, 0)}-${String(date.getDate()).padStart(2, 0)}`
    }

    const stringToDate = (str) => {
        const date = String(str).split("-")
        return new Date(date[0], date[1] - 1, date[2]).getTime()
    }

    const _patchTask = async () => {
        if (!isDisabled) {
            const { files, ..._taskData } = taskData
            setIsDisabled(true)

            try {
                const taskResponse = await axios.patch(`/tasks/patch_task/${task._id}`, _taskData)
                let patchedTask = taskResponse.data.task

                for (const file of files) {
                    const formData = new FormData()
                    formData.append('file', file)
                    try {
                        let fileResponse = await axios.post(`/files/upload_file/${taskResponse.data.task._id}`, formData)
                        patchedTask.files.push({ name: fileResponse.data.file.name, _id: fileResponse.data.file._id })
                    } catch (error) { }
                }
                
                dispatch(patchTask(patchedTask))
                setActive(false)
            } catch (err) {
                setIsErr(true)
                setIsDisabled(false)
                console.log(err)
            }
        }
    }

    const _deleteTask = async () => {
        if (window.confirm("Вы уверены, что хотите удалить задание?")) {
            axios
                .delete(`/tasks/delete_task/${task._id}`)
                .then(() => dispatch(deleteTask(task._id)))
                .catch(() => {})

            setActive(false)
        }
    }

    return (
        <Popup isActive={isActive} closeCallback={setActive} title="Изменить задание" >
            <div style={{ position: "relative" }}>
                <input type="text" className="input" id={"task_subject"+task._id} value={taskData.subject} onChange={e => setTaskData({ ...taskData, subject: e.target.value })} />
                <label htmlFor={"task_subject"+task._id}>Предмет</label>
            </div>

            <div style={{ position: "relative" }}>
                <input type="text" className="input" id={"task_type"+task._id} value={taskData.type} onChange={e => setTaskData({ ...taskData, type: e.target.value })} />
                <label htmlFor={"task_type"+task._id}>Тип задания</label>
            </div>

            <div style={{ position: "relative" }}>
                <input type="date" className="input" id={"task_date"+task._id} value={dateToString(taskData.deadline)} onChange={e => setTaskData({ ...taskData, deadline: stringToDate(e.target.value) })} />
                <label htmlFor={"task_date"+task._id}>Дедлайн</label>
            </div>

            <div style={{ position: "relative" }}>
                <div className="textarea__container">
                    <textarea rows="5" type="text" id={"task_description"+task._id} value={taskData.description} onChange={e => setTaskData({ ...taskData, description: e.target.value })}></textarea>
                </div>
                <label htmlFor={"task_description"+task._id}>Описание</label>
            </div>

            <div style={{ position: "relative" }}>
                <input type="file" id={"task_files"+task._id} multiple onChange={e => setTaskData({ ...taskData, files: e.target.files })} />
                <label htmlFor={"task_files"+task._id}>{"Добавить файлы: " + taskData.files.length}</label>
            </div>

            <div className="form_separator"></div>

            <button className={classNames("submit_button", { err: isErr, disabled: isDisabled })} onClick={_patchTask} disabled={isDisabled}>Изменить</button>
            <div className="delete_task" onClick={_deleteTask}>Удалить задание</div>
        </Popup>
    )
}

// export default () => {}