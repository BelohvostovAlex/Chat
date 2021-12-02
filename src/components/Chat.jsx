import React from 'react'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

function Chat({users, messages}) {
    const [messageValue, setMessageValue] = React.useState('')
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
                    <div className="message">
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam tempore sapiente rerum quia exercitationem excepturi!</p>
                        <span>User 1</span>
                    </div>

                    <div className="message">
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam tempore sapiente rerum quia exercitationem excepturi!</p>
                        <span>User 1</span>
                    </div>
                    </div>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Control as="textarea" rows={3}
                            placeholder="Type a message..." value={messageValue} onChange={(e) => setMessageValue(e.target.value)}/>
                            <Button variant="primary" className="btn-send">Send</Button>
                        </Form.Group>
                    </Form>
                
            </div>
            
        </div>
    )
}

export default Chat
