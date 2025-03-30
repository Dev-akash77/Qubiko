import React, { useEffect } from "react";
import Header from "../Components/Header";
import { useStore } from "../Context/Store";
import StartChat from "../Components/StartChat";
import InputChat from "../Components/InputChat";
import { useSocket } from "../Context/Socket";
import ChatContent from "../Components/ChatContent";
import { useNavigate } from "react-router-dom";
import MainLoader from "../UI/MainLoader";

const ChatStart = () => {
  const { setheading, heading,chatID } = useStore();
  const { message } = useSocket();
  const navigate=useNavigate();

  // ! redirect the new message page
  useEffect(()=>{
    if (chatID) {
      navigate(`/chat/${chatID}`, { replace: true });
    }
  },[chatID])
  
  // ! condionally heading
  useEffect(() => {
    setheading({ name: "Qubiko AI", logo: false });
  }, [setheading]);

  const {profileLoading} = useStore();
  // ! loading state
  if (profileLoading) {
    return <div className="h-screen w-screen cc bg-black"><MainLoader /></div>
  }




  return (
    <div className="min-h-[100dvh] w-screen cc">
      <div className="mobile_Screen cc">
        <div className="h-full w-full flex flex-col justify-between border md:rounded-sm">
          <Header text={heading.name} icon={heading.logo} />
          <div className="h-full overflow-auto">
           {message.length==0?<StartChat />:<ChatContent />}
          </div>
          <InputChat chatId={""} />
        </div>
      </div>
    </div>
  );
};

export default ChatStart;
