import axios from "../../utils/axios.js"
import Popup from "../Popup/Popup.jsx"
import classNames from "classnames"
import { useEffect, useState } from "react"

export default ({ isActive, setActive, curFolder, el, getFolder }) => {
    const [folderName, setFolderName] = useState(el.name)

    const [isDisabled, setIsDisabled] = useState(false)
    const [isErr, setIsErr] = useState(false)

    useEffect(() => setIsErr(false), [folderName])

    const handleClick = async () => {
        setIsDisabled(true)
        axios
            .patch(`/files/rename_folder/${el._id}`, {name: folderName})
            .then(() => {
                setActive(false)
                getFolder(curFolder._id)
            })
            .catch(() => {
                setIsErr(true)
            })
            .finally(() => {
                setIsDisabled(false)
            })
    }

    return (
        <Popup isActive={isActive} closeCallback={setActive} title="Переименовать" >
            <div style={{ position: "relative" }}>
                <input type="text" className="input" id={"fm_rename_text"+el._id} value={folderName} onChange={e => setFolderName(e.target.value)} />
                <label htmlFor={"fm_rename_text"+el._id}>Новое название</label>
            </div>
            <button className={classNames("submit_button", {disabled: isDisabled, err: isErr})} disabled={isDisabled} onClick={() => handleClick()}>Изменить</button>
        </Popup>
    )
}