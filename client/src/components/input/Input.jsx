import './input.scss'
import { RiSendPlane2Line } from 'react-icons/ri'
import { useState } from 'react';
import { BsFillEmojiLaughingFill } from 'react-icons/bs'
import Picker from 'emoji-picker-react';

const groupNames = {
    smileys_people: 'sarı suratlar',
    animals_nature: 'hayvanlar ve bitkiler',
    food_drink: 'yiyecek içecek',
    travel_places: 'gezilecek yerler',
    activities: 'aktiviteler',
    objects: 'eşyalar',
    symbols: 'semboller',
    flags: 'bayraklar',
    recently_used: 'son kullanılanlar',
}


function Input({ message, setMessage, sendMessage }) {


    const [emojiPickerIsOpen, setEmojiPickerIsOpen] = useState(false);

    const onEmojiClick = (e, emojiObject) => {
        setMessage(message + emojiObject.emoji)
    };

    return (
        <form className="chat-input">
            <input placeholder='Mesajınız...' value={message} onChange={({ target: { value } }) => setMessage(value)} onKeyDown={e => e.key === 'Enter' ? sendMessage(e) : null} />
            <div className="emoji-btn" onClick={() => setEmojiPickerIsOpen(!emojiPickerIsOpen)}>
                {emojiPickerIsOpen && <Picker onEmojiClick={onEmojiClick} groupNames={groupNames} searchPlaceholder="Emoji ara" />}
                <BsFillEmojiLaughingFill className={`emoji-icon ${emojiPickerIsOpen && "active"}`} />
            </div>
            <button onClick={(e) => sendMessage(e)} className='send-button'><RiSendPlane2Line className='send-icon' /></button>
        </form>
    )
}

export default Input