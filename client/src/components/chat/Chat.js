import React,{ useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
const Chat = props=>{
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const ENDPOINT = 'localhost:5000';
    useEffect(()=>{
        const {name,room} = queryString.parse(props.location.search);
        setRoom(room);
        setName(name);

        const socket = io(ENDPOINT);
        
        socket.emit('join',{name,room});

        return ()=>{
            socket.emit('disconnect');
            socket.off();
        }
    },[ENDPOINT,props.location.search]);
    return (
        <h1>this is chat</h1>
    );
}

export default Chat;