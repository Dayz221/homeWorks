import classNames from 'classnames'
import './Popup.css'

export default ({ children, isActive, closeCallback, title }) => {
    return (
        <div className={classNames("popup__background", {active: isActive})} onClick={() => closeCallback(false)}>
            <div className="popup__container" onClick={e => e.stopPropagation()}>
                <div className="popup_header">
                    <div className="popup_title">{title}</div>
                    <div className="close_button" onClick={() => closeCallback(false)}>
                        <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.5 3.75L7.5 11.25" strokeWidth="2" strokeLinecap="round"/>
                            <path d="M11.25 7.5L3.75 7.5" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    </div>
                </div>
                <div className="popup_childrens">
                    { children }
                </div>
            </div>
        </div>
    )
}