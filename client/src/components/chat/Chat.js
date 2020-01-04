import React,{ useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import './Chat.css';
import InfoBar from '../infoBar/InfoBar';
import Input from '../input/Input';
import Messages from '../messages/Messages';
import TextContainer from '../textContainer/TextContainer';

let socket;
const Chat = props=>{
    const [users, setUsers] = useState('');
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const ENDPOINT = 'localhost:5000';
    useEffect(()=>{
        const {name,room} = queryString.parse(props.location.search);
        setRoom(room);
        setName(name);

        socket = io(ENDPOINT);
        
        socket.emit('join',{name,room},error=>{
            if(error){
                alert(error);
            }
        });

        socket.on('roomData', ({ users }) => {
            setUsers(users);
          })

        return ()=>{
            socket.emit('disconnect');
            socket.off();
        }
    },[ENDPOINT,props.location.search]);

    useEffect(()=>{
        socket.on('message',message=>{
            setMessages([...messages,message])
        });
    },[messages]);

    const sendMessage = event=>{
        event.preventDefault();

        if(message){
            socket.emit('sendMessage',message,()=>setMessage(''));
        }
    }

    console.log(message,messages);

    return (
        <div className='outerContainer'>
            <div className='container'>
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                {/* <input 
                value={message}
                onChange={event =>setMessage(event.target.value)}
                onKeyPress={event=> event.key ==='Enter' ? sendMessage(event) : null}
                /> */}
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            <TextContainer users={users}/>
        </div>
    );
}

export default Chat;