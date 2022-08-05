import { Avatar, IconButton } from '@mui/material'
import React, { useEffect } from 'react'
import './Sidebar.css'
import { DonutLarge } from '@mui/icons-material'
import { Chat } from '@mui/icons-material'
import {MoreVert} from '@mui/icons-material'
import {SearchOutlined} from '@mui/icons-material'
import SidebarChat from './SidebarChat'
import { useState } from 'react'
import db from './firebase'
import { useStateValue } from './StateProvider'
import {ErrorBoundary} from 'react-error-boundary'

function Sidebar() {
  const [rooms, setRooms] = useState([])
  const [{user}, dispatch] = useStateValue()

  useEffect(() => {
    const unsubscribe = db.collection("rooms").onSnapshot(snapshot => (
      setRooms(snapshot.docs.map(doc => 
        ({
          id: doc.id,
          data: doc.data(),
        })))
        
    ))
    return () => {
      unsubscribe()
    }
    
  },[]
  )

  return (
    <div className='sidebar'>
       <div className='sidebar__header'>
        <Avatar src={user?.photoURL}/>
        <div className='sidebar__headerRight'>
          <IconButton>
            <DonutLarge />
          </IconButton>
          <ErrorBoundary>
          <IconButton>
            <Chat />
          </IconButton>
          </ErrorBoundary>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
       </div>
       <div className='sidebar__search'>
        <div className='sidebar__searchContainer'>
          <SearchOutlined />
          <input placeholder='Search or start new chat' type="text" />
        </div>
       </div>
        <div className='sidebar__chats'>
          <SidebarChat addNewChat/>
          {rooms.map(room => (
            <SidebarChat key={room.id} id={room.id} name={room.data.name}/>
          ))}
          
        </div>
    </div>
  )
}

export default Sidebar