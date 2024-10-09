import classNames from 'classnames'
import './Popup.css'

export default ({ children, isActive, closeCallback }) => {
    return (
        <div className={classNames("popup__background", {active: isActive})} onClick={() => closeCallback(false)}>
            <div className="popup__container" onClick={e => e.stopPropagation()}>
                { children }
            </div>
        </div>
    )
}