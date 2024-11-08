import axios from "../../utils/axios.js"
import Popup from "../Popup/Popup.jsx"
import classNames from "classnames"
import { useEffect, useState } from "react"

export default ({ isActive, curFolder, setActive, getFolder }) => {
    const [addType, setAddType] = useState(true)
    
    const [files, setFiles] = useState([])
    const [folderName, setFolderName] = useState("")

    const [isDisabled, setIsDisabled] = useState(false)
    const [isErr, setIsErr] = useState(false)

    useEffect(() => setIsErr(false), [files, folderName])
    useEffect(() => {
        setFiles([])
        setFolderName("")
    }, [isActive])

    const handleClick = async () => {
        if (addType) {
            setIsDisabled(true)
            try {
                for (const file of files) {
                    const formData = new FormData()
                    formData.append('file', file)
                    try {
                        await axios.post(`/files/upload_file/${curFolder._id}`, formData)
                    } catch (error) {}
                }
                    
                setActive(false)
                getFolder(curFolder._id)
            } catch {
                setIsErr(true)
            } finally {
                setIsDisabled(false)
            }
        } else {
            setIsDisabled(true)
            try {
                await axios.post(`/files/create_folder`, {name: folderName, parent: curFolder._id})

                setActive(false)
                getFolder(curFolder._id)
            } catch {
                setIsErr(true)
            } finally {
                setIsDisabled(false)
            }
        }
    }

    return (
        <Popup isActive={isActive} closeCallback={setActive} title="Добавить" >
            <div className="add_element__container">
                <div className={classNames("type_selector",{"active": !addType})} onClick={() => setAddType(prev => !prev)} >
                    <div className="type_item" >Файл</div>
                    <div className="type_item" >Папка</div>
                </div>    
                { addType ?
                    <div style={{ position: "relative" }}>
                        <input type="file" id="fm__task_files" multiple onChange={e => {setFiles(e.target.files)}} />
                        <label htmlFor="fm__task_files">{"Выбрано: " + files.length}</label>
                    </div>
                    :
                    <input type="text" className="input" id="fm__folder_name" placeholder="Название папки" value={folderName} onChange={e => setFolderName(e.target.value)} />
                }
            </div>
            <button className={classNames("submit_button", {disabled: isDisabled, err: isErr})} disabled={isDisabled} onClick={() => handleClick()}>{addType ? "Загрузить" : "Создать"}</button>
        </Popup>
    )
}