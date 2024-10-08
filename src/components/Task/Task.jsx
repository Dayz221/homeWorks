import axios from '../../utils/axios.js'
import { setTaskStatus } from '../../redux/slice'
import './Task.css'
import { useDispatch } from 'react-redux'

export default ({task}) => {
    const dispatch = useDispatch()

    const getDate = (timestamp) => {
        const date = new Date(timestamp);

        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()

        return `${day}.${month}.${year}`
    }

    const onChangeAction = async (e) => {
        axios
            .patch(`/tasks/set_task_status/${task.utask_id}`, { isCompleted: e.target.checked })
            .then((res) => {
                dispatch(setTaskStatus({utask_id: task.utask_id, status: res.data.status}))
            })
            .catch((err) => console.log(err))
    }

    return (
        <div className="task__container">
            <div className="subject_info">
                <div className="subject_name">{task.subject}</div>
                <div className="task_data">
                    <div className="task_type">{task.type}</div>
                    <div className="task_deadline">{getDate(task.deadline)}</div>
                </div>
            </div>
            <div className="task_description">
                <div className="task_description__text">
                    { task.description
                        ? task.description
                        : "Нет описания"
                    }
                </div>
            </div>
            <div className="taskStatusCheckbox">
                <input type="checkbox" checked={task.isCompleted} onChange={e => onChangeAction(e)} id={task._id} />
                <label htmlFor={task._id}></label>
            </div>
        </div>
    )
}