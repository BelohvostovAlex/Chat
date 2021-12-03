import React from 'react'
import socket from '../socket'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

function Chat({users, messages, userName, roomId}) {
    const messagesRef = React.useRef(null)
    const [messageValue, setMessageValue] = React.useState('')
    const onSendMessage = () => {
        let dateS = new Date()
        const obj = {
            roomId,
            userName,
            text: messageValue,
            date: dateS.toLocaleTimeString()
        }
        socket.emit('ROOM:NEW_MESSAGE', obj)
        setMessageValue('')
    }

    React.useEffect(() => {
        messagesRef.current.scrollTo(0,99999)
    }, [messages])
    return (
        <div className="chat">
            <div className="chat-left">
                <img className="chat-left_img" src="/img/like.png" alt="like" height={60} width={60}/>
                <h1>Online ({users.length})</h1>
                <ul>
                   {users.map((item,i) => <li key={i}>{item} <img className="liImg" src="/img/flash.png" alt="online" /></li>)}
                </ul>
            </div>
            <div className="chat-right">
                <div className="messages" ref={messagesRef}>
                <div className="messages-title">
                    <h1>chat: {roomId}</h1>
                </div>
                   {
                       messages.map((message,id) => 
                        (<div className={`message__wrapper ${message.userName === userName ? '' : 'message__wrapper_right'}`}>
                            <div className={`message ${message.userName === userName ? '' : 'message-right'}`} key={id}>
                        <p>{message.text}</p>
                        <span>{message.userName}, {message.date}</span>
                    </div>
                        </div>)
                       )
                   }
                    </div>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Control as="textarea" rows={3}
                            placeholder="Type a message..." value={messageValue} onChange={(e) => setMessageValue(e.target.value)}/>
                            <Button variant="primary" className="btn-send" onClick={onSendMessage}>Send</Button>
                        </Form.Group>
                    </Form>
                
            </div>
            
        </div>
    )
}

export default Chat
