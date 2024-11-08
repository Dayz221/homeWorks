import './FM_File.css'
import { useState } from 'react'
import axios from '../../utils/axios.js'
import classNames from 'classnames'
import { useSelector } from 'react-redux'

export default ({el, getFolder, curFolder}) => {
    const user = useSelector(state => state.user.user)
    const [isOpened, setIsOpened] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const downloadFile = async () => {
        setIsLoading(true)
        axios({
            method: 'GET',
            url: `/files/get_file/${el._id}`,
            responseType: 'blob'
        })
        .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', el.name);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link)
        })
        .catch(e => {})
        .finally(() => setIsLoading(false))
    }

    const _deleteFile = () => {
        if (window.confirm(`Вы точно уверены, что хотите удалить файл ${el.name}?`)) {
            axios
                .delete(`/files/delete_file/${el._id}`)
                .then(res => {
                    getFolder(curFolder._id)
                })
                .catch(err => {})
        }
    }

    return (
        <div className={classNames("fm_file__container", {sub_menu: isOpened})} onClick={e => {if (!isOpened && !isLoading) {downloadFile()}}}>
          <div className="fm_file_hueta">
            <div className="fm_file_side">
                {
                    isLoading ?
                    <div className="fm_file_loader__container">
                        <span className="fm_file_loader"></span>
                    </div>
                    :
                    <div className="fm_file_icon">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2V7L12 7.05441C11.9999 7.47848 11.9998 7.8906 12.0455 8.23052C12.097 8.61372 12.2226 9.051 12.5858 9.41421C12.949 9.77743 13.3863 9.90295 13.7695 9.95447C14.1094 10.0002 14.5215 10.0001 14.9456 10H14.9456L15 10H20V16C20 18.8284 20 20.2426 19.1213 21.1213C18.2426 22 16.8284 22 14 22H10C7.17157 22 5.75736 22 4.87868 21.1213C4 20.2426 4 18.8284 4 16V8C4 5.17157 4 3.75736 4.87868 2.87868C5.75736 2 7.17157 2 10 2H12ZM14 2.00462V7C14 7.49967 14.0021 7.77383 14.0277 7.96402L14.0287 7.97131L14.036 7.97231C14.2262 7.99788 14.5003 8 15 8H19.9954C19.9852 7.58836 19.9525 7.31595 19.8478 7.06306C19.6955 6.69552 19.4065 6.40649 18.8284 5.82843L16.1716 3.17157C15.5935 2.59351 15.3045 2.30448 14.9369 2.15224C14.684 2.04749 14.4116 2.01481 14 2.00462Z"/>
                        </svg>
                    </div>  
                }
                <div className="fm_file_name"> {el.name} </div>
            </div>
            { user.permissions > 1 ?
                <div className="folder_settings" onClick={e => e.stopPropagation()}>
                    <button className="delete_folder" onClick={_deleteFile}>
                    Удалить
                    </button>
                </div>
                : <></>
            }
          </div>
          <div className="file_settings__button" onClick={e => {e.stopPropagation(); setIsOpened(prev=>!prev)}}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="3" r="3"/>
              <circle cx="12" cy="21" r="3"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </div>
        </div>
      )
}