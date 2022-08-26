import './chat.scss';
import { useState, useEffect } from 'react'
import queryString from 'query-string';
import io from 'socket.io-client';
import InfoBar from '../infobar/InfoBar';
import Input from '../input/Input';
import Messages from '../messages/Messages';
let socket;

function Chat() {

  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);


  const ENDPOINT = process.env.REACT_APP_ENDPOINT;
  // const ENDPOINT = 'localhost:5000/';
  const location = document.location;

  useEffect(() => {

    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit('join', { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });

    return () => {
      socket.emit('disconnect');

      socket.off();
    }

  }, [location.search, ENDPOINT])

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages(messages => [...messages, message])
    })

  }, [])


  const sendMessage = (e) => {
    e.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => {
        setMessage('');
      })
    }
  }
  console.log(message, messages);

  return (
    <div className='chat'>
      <div className="chat-container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
  )
}

export default Chat