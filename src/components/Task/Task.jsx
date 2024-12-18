import axios from '../../utils/axios.js'
import { setTaskStatus } from '../../redux/slice'
import './Task.css'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useState } from 'react'
import classNames from 'classnames'
import File from '../File/File.jsx'
import PatchTaskPopup from '../Popups/PatchTaskPopup.jsx'

export default ({task}) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)
    
    const [isOpened, setIsOpened] = useState(false)
    const [patchTaskPopup, setPatchTaskPopup] = useState(false)

    const getDate = (timestamp) => {
        const date = new Date(timestamp);

        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()

        return `${day}.${month}.${year}`
    }

    const [timeoutId, setTimeoutId] = useState(null);
  
    const onChangeAction = useCallback((event) => {
      dispatch(setTaskStatus({utask_id: task.utask_id, status: event.target.checked}))

      if (timeoutId) {
        clearTimeout(timeoutId)
      }

      const newTimeoutId = setTimeout(() => {
        axios
            .patch(`/tasks/set_task_status/${task.utask_id}`, { isCompleted: event.target.checked })
            .catch(() => {})
      }, 1000)
      setTimeoutId(newTimeoutId)
    }, [timeoutId])

    return (
        <>
            <PatchTaskPopup isActive={patchTaskPopup} setActive={setPatchTaskPopup} task={task} />
            <div className={classNames("task__container", {opened: isOpened})} onClick={() => setIsOpened(prev => !prev)}>
                <div className="task__header">
                    <div className="subject_info">
                        <div className="subject_name">{task.subject}</div>
                        <div className='task_data'>
                            { task.type != '' ? <div className="task_type">{task.type}</div> : <></>}
                            <div className="task_deadline">{getDate(task.deadline)}</div>
                        </div>
                    </div>
                <div className='right_side'>
                    {
                        (!task.isGroupTask) || (task.isGroupTask && user.permissions > 1) ?
                        <div className="patch_task" onClick={e => {e.stopPropagation(); setPatchTaskPopup(true)}}>
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M12 1.48459C11.3425 1.48459 10.7706 1.90617 9.62667 2.74933L7.90576 4.01778C7.72555 4.15061 7.63545 4.21702 7.53871 4.27287C7.44198 4.32872 7.33941 4.37355 7.13427 4.4632L5.1753 5.31932C3.87315 5.8884 3.22208 6.17294 2.89336 6.74229C2.56464 7.31165 2.64376 8.01777 2.802 9.43L3.04006 11.5546C3.06499 11.7771 3.07745 11.8883 3.07745 12C3.07745 12.1117 3.06499 12.2229 3.04006 12.4454L2.802 14.57C2.64376 15.9822 2.56464 16.6883 2.89336 17.2577C3.22208 17.8271 3.87315 18.1116 5.1753 18.6807L7.13427 19.5368C7.33941 19.6264 7.44198 19.6713 7.53871 19.7271C7.63545 19.783 7.72555 19.8494 7.90576 19.9822L9.62667 21.2507C10.7706 22.0938 11.3425 22.5154 12 22.5154C12.6574 22.5154 13.2294 22.0938 14.3733 21.2507L14.3733 21.2507L16.0942 19.9822C16.2744 19.8494 16.3645 19.783 16.4612 19.7271C16.558 19.6713 16.6605 19.6264 16.8657 19.5368L18.8246 18.6807C20.1268 18.1116 20.7779 17.8271 21.1066 17.2577C21.4353 16.6883 21.3562 15.9822 21.1979 14.57L20.9599 12.4454L20.9599 12.4454C20.935 12.2229 20.9225 12.1117 20.9225 12C20.9225 11.8883 20.9349 11.7771 20.9599 11.5546L20.9599 11.5546L21.1979 9.43C21.3562 8.01777 21.4353 7.31165 21.1066 6.74229C20.7779 6.17294 20.1268 5.8884 18.8246 5.31932L16.8657 4.4632L16.8657 4.46319C16.6605 4.37355 16.558 4.32872 16.4612 4.27287C16.3645 4.21702 16.2744 4.15061 16.0942 4.01778L14.3733 2.74933C13.2294 1.90617 12.6574 1.48459 12 1.48459ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79083 8 7.99997 9.79086 7.99997 12C7.99997 14.2091 9.79083 16 12 16Z"/>
                            </svg>
                        </div>
                        : <></>    
                    }
                    
                    <div className="taskStatusCheckbox">
                        <input type="checkbox" checked={task.isCompleted} onChange={e => onChangeAction(e)} id={task._id} />
                        <label htmlFor={task._id}></label>
                    </div>
                </div>
                </div>

                <div className="task_description__container">
                    <div style={{minHeight: "0"}}>
                        <div className="task_description" onClick={e => e.stopPropagation()}>
                            <div className="task_description__text">
                                { !!task.description
                                    ? task.description
                                    : "Нет описания"
                                }
                            </div>
                        </div>
                        {
                            task.files.length > 0 ?
                            <div className="task_files__container" onClick={e => e.stopPropagation()}>
                                {
                                    task.files.map(file => {
                                        return <File editMode={(!task.isGroupTask) || (task.isGroupTask && user.permissions > 1)} task_id={task._id} file={file} key={file._id}/>
                                    })
                                }
                            </div>
                            :
                            <></>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}