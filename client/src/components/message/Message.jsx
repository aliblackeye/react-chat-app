import './message.scss'

import ReactEmoji from 'react-emoji';


function Message({ message: { user, text }, name }) {
    let isSentByCurrentUser = false;

    const trimmedName = name.trim().toLowerCase();

    if (user === trimmedName) {
        isSentByCurrentUser = true;
    }

    return (
        isSentByCurrentUser ? (
            <div className="message-container justify-end current">
                <span className="sender">{trimmedName}</span>
                <div className="message-box">
                    <p className="message-text">{ReactEmoji.emojify(text)}</p>
                </div>
            </div>
        ) :
            <div className={`message-container justify-start other ${user === "admin" && "admin"}`}>
                <div className="message-box">
                    <p className="message-text">{ReactEmoji.emojify(text)}</p>
                </div>
                <span className="sender">{user}</span>
            </div>
    )
}

export default Message