import classNames from "classnames"
import axios from '../../utils/axios.js'
import { useState } from "react"
import './Folder.css'
import { useSelector } from "react-redux"
import RenameFolderPopup from "../Popups/RenameFolderPopup.jsx"

export default ({el, curFolder, getFolder}) => {
    const [isOpened, setIsOpened] = useState(false)
    const user = useSelector(state => state.user.user)
    const [renameFolder, setRenameFolder] = useState(false)

    const deleteFolder = () => {
        if (window.confirm(`Вы уверены, что хотите удалить папку ${el.name}?`)) {
          axios
          .delete(`/files/delete_folder/${el._id}`)
          .then(() => {
            getFolder(curFolder._id)
          })
          .catch(() => {})
        }
    }

    return (
        <>
          <RenameFolderPopup isActive={renameFolder} setActive={setRenameFolder} el={el} curFolder={curFolder} getFolder={getFolder} />
          <div className={classNames("folder__container", {sub_menu: isOpened})} onClick={() => {if (!isOpened) {getFolder(el._id)}}} > 
            <div className="folder_hueta">
              <div className="folder_side">
                  <div className="folder_icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 8H16.2C17.8802 8 18.7202 8 19.362 8.32698C19.9265 8.6146 20.3854 9.07354 20.673 9.63803C21 10.2798 21 11.1198 21 12.8V14.2C21 15.8802 21 16.7202 20.673 17.362C20.3854 17.9265 19.9265 18.3854 19.362 18.673C18.7202 19 17.8802 19 16.2 19H7.8C6.11984 19 5.27976 19 4.63803 18.673C4.07354 18.3854 3.6146 17.9265 3.32698 17.362C3 16.7202 3 15.8802 3 14.2V8Z"/>
                      <path d="M3 8C3 7.06812 3 6.60218 3.15224 6.23463C3.35523 5.74458 3.74458 5.35523 4.23463 5.15224C4.60218 5 5.06812 5 6 5H8.34315C9.16065 5 9.5694 5 9.93694 5.15224C10.3045 5.30448 10.5935 5.59351 11.1716 6.17157L13 8H3Z"/>
                  </svg>
                  </div>
                  <div className="folder_name"> {el.name} </div>
              </div>
              { user.permissions > 1 ?
                <div className="folder_settings" onClick={e => e.stopPropagation()}>
                  <button className="delete_folder" onClick={deleteFolder}>Удалить</button>
                  <button className="rename_folder" onClick={() => {setRenameFolder(true); setIsOpened(false)}}>Переименовать</button>
                </div>
                :
                <></>
              }
            </div>
            <div className="folder_settings__button" onClick={e => {e.stopPropagation(); setIsOpened(prev => !prev)}}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="3" r="3"/>
                <circle cx="12" cy="21" r="3"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </div>
          </div>
        </>
      )
}