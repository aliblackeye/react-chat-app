import './join.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';


function Join() {

  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  return (
    <div className='join'>
      <div className="join-container">
        <h1 className="title">Katıl</h1>
        <div className="join-input"><input placeholder="İsim" type="text" onChange={(e) => setName(e.target.value)} /></div>
        <div className="join-input"><input placeholder="Oda İsmi" type="text" onChange={(e) => setRoom(e.target.value)} /></div>
        <Link onClick={(e) => (!name || !room) && e.preventDefault()} to={`/chat?name=${name}&room=${room}`}>
          <button className="button">GİRİŞ YAP</button>
        </Link>
      </div>
    </div>
  )
}

export default Join