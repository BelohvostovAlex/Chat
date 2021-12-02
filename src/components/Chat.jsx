import React from 'react'
import socket from '../socket'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

function Chat({users, messages, userName, roomId}) {
    const [messageValue, setMessageValue] = React.useState('')
    const onSendMessage = () => {
        socket.emit('ROOM:NEW_MESSAGE', {
            roomId,
            userName,
            text: messageValue
        })
        console.log('q')
    }
    return (
        <div className="chat">
            <div className="chat-left">
                <h1>Online ({users.length})</h1>
                <ul>
                   {users.map((item,i) => <li key={i}>{item}</li>)}
                </ul>
            </div>
            <div className="chat-right">
                <div className="messages">
                   {
                       messages.map((message,id) => {
                        <div className="message">
                        <p>{message.text}</p>
                        <span>{message.userName}</span>
                    </div>
                       })
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
