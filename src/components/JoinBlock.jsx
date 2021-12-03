import React from 'react'
import socket from "../socket";
import axios from 'axios';

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

function JoinBlock({onLogin}) {
  const [roomId, setRoomId] = React.useState('')
  const [userName, setUserName] = React.useState('')
  const [isLoading, setLoading] = React.useState(false)

  const onEnter = async () => {
    if(!roomId || !userName) {
      return alert('Incorrect data')
    }
    const obj = {
      roomId,
      userName
    }
    setLoading(true)
    await axios.post('/rooms', obj)
    onLogin(obj)
  }
    return (
      <div className="join-block">
        <img src="/img/like.png" alt="login" height={100} width={100}/>
        <h1 className="join-block_title">Liker Chat</h1>
        <Form.Control 
        type="text" 
        placeholder="Room ID" 
        value={roomId}
        onChange={e => setRoomId(e.target.value)}
        maxLength={10}/>
        <Form.Control 
        type="text" 
        placeholder="Type ur name" 
        value={userName}
        onChange={e => setUserName(e.target.value)}
        maxLength={14}/>
        <Button
        disabled={isLoading}
        onClick={onEnter} 
        variant="success">
          {isLoading ? 'CONNECTION..' : 'SIGN IN'}</Button>
      </div>
    );
}

export default JoinBlock
