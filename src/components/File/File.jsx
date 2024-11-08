import './File.css'
import axios from '../../utils/axios.js'
import { useDispatch } from 'react-redux'
import { deleteFile } from '../../redux/slice.js'
import { useState } from 'react'

export default ({task_id, file, editMode}) => {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)

    const downloadFile = async () => {
        setIsLoading(true)
        axios({
            method: 'GET',
            url: `/files/get_file/${file._id}`,
            responseType: 'blob'
        })
        .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', file.name);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link)
        })
        .catch(e => {})
        .finally(() => setIsLoading(false))
    }

    const _deleteFile = () => {
        if (window.confirm(`Вы точно уверены, что хотите удалить файл ${file.name}?`)) {
            axios
                .delete(`/files/unpin_file/${task_id}/${file._id}`)
                .then(res => {
                    dispatch(deleteFile({task_id, file_id: file._id}))
                })
                .catch(err => {})
        }
    }

    return (
        <div className="file__container" onClick={downloadFile}>
            <div className="file_name">{file.name}</div>
            { isLoading ?
                <div className="file_loader__container">
                    <span className="file_loader"></span>
                </div>
                :
                editMode ? 
                    <div className="delete_file" onClick={e => {e.stopPropagation(); _deleteFile()}}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M21.0001 6H3.00006V9C4.10463 9 5.00006 9.89543 5.00006 11V15C5.00006 17.8284 5.00006 19.2426 5.87874 20.1213C6.75742 21 8.17163 21 11.0001 21H13.0001C15.8285 21 17.2427 21 18.1214 20.1213C19.0001 19.2426 19.0001 17.8284 19.0001 15V11C19.0001 9.89543 19.8955 9 21.0001 9V6ZM10.5001 11C10.5001 10.4477 10.0523 10 9.50006 10C8.94778 10 8.50006 10.4477 8.50006 11V16C8.50006 16.5523 8.94778 17 9.50006 17C10.0523 17 10.5001 16.5523 10.5001 16V11ZM15.5001 11C15.5001 10.4477 15.0523 10 14.5001 10C13.9478 10 13.5001 10.4477 13.5001 11V16C13.5001 16.5523 13.9478 17 14.5001 17C15.0523 17 15.5001 16.5523 15.5001 16V11Z"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M13.4059 2.12123C12.982 2.0399 12.4893 2 12 2C11.5108 2 11.0181 2.0399 10.5941 2.12123C10.3822 2.16189 10.1747 2.21529 9.98666 2.28562C9.81591 2.34951 9.58302 2.45558 9.38598 2.63942C8.98217 3.01618 8.96024 3.64897 9.33701 4.05278C9.69253 4.43384 10.276 4.47484 10.68 4.16168C10.6823 4.16078 10.6848 4.15982 10.6875 4.15881C10.7409 4.13884 10.8336 4.11176 10.9709 4.08542C11.2455 4.03274 11.6087 4 12 4C12.3913 4 12.7545 4.03274 13.0292 4.08542C13.1665 4.11176 13.2592 4.13884 13.3125 4.1588C13.3153 4.15982 13.3178 4.16078 13.3201 4.16168C13.724 4.47484 14.3075 4.43384 14.6631 4.05278C15.0398 3.64897 15.0179 3.01618 14.6141 2.63942C14.417 2.45558 14.1841 2.34951 14.0134 2.28562C13.8254 2.21529 13.6179 2.16189 13.4059 2.12123Z"/>
                        </svg>
                    </div>
                    :
                    <div className="save_file">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2V7L12 7.05441C11.9999 7.47848 11.9998 7.8906 12.0455 8.23052C12.097 8.61372 12.2226 9.051 12.5858 9.41421C12.949 9.77743 13.3863 9.90295 13.7695 9.95447C14.1094 10.0002 14.5215 10.0001 14.9456 10H14.9456L15 10H20V16C20 18.8284 20 20.2426 19.1213 21.1213C18.2426 22 16.8284 22 14 22H10C7.17157 22 5.75736 22 4.87868 21.1213C4 20.2426 4 18.8284 4 16V8C4 5.17157 4 3.75736 4.87868 2.87868C5.75736 2 7.17157 2 10 2H12ZM14 2.00462V7C14 7.49967 14.0021 7.77383 14.0277 7.96402L14.0287 7.97131L14.036 7.97231C14.2262 7.99788 14.5003 8 15 8H19.9954C19.9852 7.58836 19.9525 7.31595 19.8478 7.06306C19.6955 6.69552 19.4065 6.40649 18.8284 5.82843L16.1716 3.17157C15.5935 2.59351 15.3045 2.30448 14.9369 2.15224C14.684 2.04749 14.4116 2.01481 14 2.00462Z"/>
                        </svg>
                    </div>  
            }
        </div>
    )
}