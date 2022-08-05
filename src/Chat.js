import { Avatar, IconButton } from '@mui/material'
import { AttachFile, Message, MoreVert, SearchOutlined } from '@mui/icons-material'
import MoodIcon from '@mui/icons-material/Mood';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import React, { useEffect, useState } from 'react'
import "./Chat.css"
import { useParams } from 'react-router-dom';
import db from './firebase';
import { useStateValue } from './StateProvider';
import firebase from 'firebase/compat/app';
import { doc, addDoc, collection } from "firebase/firestore";

function Chat() {
    const [input, setInput] = useState("")
    const [seed, setSeed] = useState("")
    const {roomId} = useParams()
    const [roomName, setRoomName] = useState("")
    const [{user}, dispatch] = useStateValue()

    const [messages, setMessages] = useState([])

    useEffect(() => {
        if(roomId){
            db.collection('rooms')
            .doc(roomId)
            .onSnapshot(snapshot => setRoomName(snapshot.data().name))

            db.collection('rooms').doc(roomId)
            .collection('messages')
            .orderBy('timestamp','asc')
            .onSnapshot(snapshot => 
                (setMessages(snapshot.docs.map(doc => doc.data()))
                ))
        }
    },[roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random()*10))
    },[])

    const sendMessage = (e) => {
        e.preventDefault()
        console.log("You typed >>>", input,{user})
        db.collection('rooms').doc(roomId).collection('messages').add({
            message:input,
            name:user.displayName,
            timestamp:firebase.firestore.FieldValue.serverTimestamp()
        })
        setInput("")
    }


  return (
    <div className='chat'>
        <div className='chat__header'>
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
            <div className='chat__headerInfo'>
                <h3>{roomName}</h3>
                <p>Last Seen {" "}
                {
                new Date(
                    messages[messages.length - 1] ?.
                    timestamp?.toDate()
                ).toUTCString()}</p>
            </div>
            <div className='chat__headerRight'>
                <IconButton>
                    <SearchOutlined />
                </IconButton>
                <IconButton>
                    <AttachFile />
                </IconButton>
                <IconButton>
                    <MoreVert />
                </IconButton>
            </div>

        </div>
       
        <div className='chat__body'>
            {messages.map((message,i) => (
                <p key={i} className={`chat__message ${message.name === user.displayName && 'chat__reciever'}`}>
                    <span className='chat__name'>{message.name}</span>
                    {message.message}
                    <span className='chat__timestamp'>
                        {new Date(message.timestamp?.toDate()).toUTCString()}
                    </span>
                </p>
            ))}
            
            
            
            {/* <span className='chat__name'>{
            Message.name}</span></p> */}
        </div>
        
        <div className='chat__footer'>
            <MoodIcon />
            <form>
                <input type="text" placeholder='Type a message ..' value={input} onChange={(e) => setInput(e.target.value)}/>
                <button type='submit' onClick={sendMessage}>Send a  message</button>
            </form>
            <KeyboardVoiceIcon />
        </div>
    </div>
  )
}

export default Chat