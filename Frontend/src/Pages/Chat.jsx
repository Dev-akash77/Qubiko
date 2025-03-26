import React, { useEffect } from 'react'
import { useStore } from '../Context/Store';

const Chat = () => {
    const {setheading} = useStore();

    useEffect(()=>{
        setheading({name:"Qubiko AI",logo:false})
    },[setheading])
  return (
    <div className='cc'>
        <div className="container">Chat</div>
    </div>
  )
}

export default Chat