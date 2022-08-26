import './infobar.scss'
import closeIcon from '../../icons/closeIcon.png'
import onlineIcon from '../../icons/onlineIcon.png'

function InfoBar({ room }) {
  return (
    <div className='info-bar'>
      <div className="left-container">
        <img src={onlineIcon} alt="" className="online-icon" />
        <h3 className="room-name">{room}</h3>
      </div>
      <div className="right-container">
        <a href="/"><img src={closeIcon} alt="" /> </a>
      </div>
    </div>
  )
}

export default InfoBar