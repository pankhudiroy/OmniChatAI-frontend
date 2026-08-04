import "./ChatWindow.css";
import Chat from "./Chat.jsx"
import MyContext from "./MyContext.jsx";
import {useContext, useState, useEffect} from "react";
import { PulseLoader } from "react-spinners";

function ChatWindow(){
    const {prompt, setPrompt, reply, setReply, currentThreadId, prevChats, setPrevChats, sidebarOpen, setSidebarOpen} = useContext(MyContext);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] =  useState(false);

    const getReply = async ()=>{
         setLoading(true);
         const options = {
            method: "POST",
            headers: {
               "Content-Type" : "application/json"
            },
            body: JSON.stringify({
               message: prompt,
               threadId: currentThreadId
            })
         };

         
         try{
            // console.log(import.meta.env.VITE_API_URL);
            // const response = await fetch("http://localhost:8080/api/chat", options);
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/chat`, options);
            const res = await response.json();
            // console.log(res);
            setReply(res.reply);

         }catch(err){
            console.log(err);
         }
         setLoading(false);
    }

    //Append new chat in prevChats
    useEffect(()=>{
      if(prompt && reply){
         setPrevChats(prevChats =>(
            [...prevChats, {
               role: "user",
               content: prompt
            },{
               role: "assistant",
               content: reply
            }]
         ))
      }

      setPrompt("");
    }, [reply]);

    const handleProfileClick = () => {
      setIsOpen(!isOpen);
    }

    return(
        <div className="chatWindow">
          <div className="navbar">
             <div
  className="hamburger"
  onClick={() => setSidebarOpen(true)}
>
  <i className="fa-solid fa-bars"></i>
</div>
             <span>OmniChatAI<i className="fa-solid fa-angle-down"></i></span>
             <div className="userIconDiv" onClick={handleProfileClick}>
                 <span className="userIcon"><i className="fa-solid fa-user"></i></span>
             </div>
          </div>
          {
            isOpen &&
            <div className="dropDown">
               <div className="dropDownItems"><i className="fa-solid fa-user-plus"></i> &nbsp; Upgrade Plan</div>
               <div className="dropDownItems"><i className="fa-solid fa-gear"></i> &nbsp; Settings</div>
               <div className="dropDownItems"><i className="fa-solid fa-arrow-right-from-bracket"></i> &nbsp;
               Log out</div>
            </div>
          }

          <Chat></Chat>
          <PulseLoader color="#fff" loading={loading} />

          <div className="chatInput">
            <div className="inputBox">
               <div id="query">
                  <textarea placeholder="Ask anything" 
                     value={prompt}
                     onChange={(e) => setPrompt(e.target.value)}
                     onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                           e.preventDefault();
                           getReply();
                        }
                     }}
                   >
                  </textarea>
               </div>

               <div id="submit" onClick={getReply} >
                  <i className="fa-solid fa-circle-arrow-up"></i>
               </div>
            </div>
            <p className="info">
               OmniChatAI can make mistakes. Check important info.
            </p>
          </div>
        </div>
    )
};

export default ChatWindow;