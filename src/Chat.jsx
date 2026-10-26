import "./Chat.css";
import {useContext, useState, useEffect} from "react";
import MyContext from "./MyContext.jsx";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

//react-markdown rehype-highlight


function Chat(){
    // const {newChat, prevChats, reply, prompt, isLoggedIn, setIsLoggedIn} = useContext(MyContext);
    const { newChat, prevChats, reply, isLoggedIn, username } = useContext(MyContext);
    const [latestReply, setLatestReply] = useState(null);

    useEffect(() =>{
        if(reply === null ){
           setLatestReply(null);
           return;
        }

        if(!prevChats?.length) return;

        const content = reply.split(" ");
        let idx = 0;

        const interval = setInterval(()=>{
          setLatestReply(content.slice(0, idx+1).join(" "));

          idx++;
          // if( idx>=interval.length) clearInterval(interval);
          if( idx>=content.length) clearInterval(interval);
        }, 40);

        return() => clearInterval(interval);

    }, [prevChats, reply])

    return(
        <>
            {newChat && reply === null && (
                  isLoggedIn && username ? (
                      <h1 className="startNewChath1">
                          Nice to see you, {username}. What's new?
                      </h1>
                  ) : (
                      <div>
                          <div className="userDiv">
                              {/* <strong>You</strong> */}
                              <p className="userMsg">Explain JWT authentication in simple terms.</p>
                          </div>

                          <div className="gptDiv">
                              {/* <strong>OmniChatAI</strong> */}
                              <p className="gptMsg">
                                  JWT (JSON Web Token) is like a digital entry pass.
                                  After you log in, the server issues a token that
                                  your app sends with future requests to prove
                                  you're authenticated.
                              </p>
                              <small>Sample conversation · Illustrative response</small>
                          </div>
                      </div>
                  )
              )}
            <div className="chats">
              {/* dynamic data */}
              {
                prevChats?.slice(0, -1).map((chat,idx) =>
                  <div className = {chat.role === "user"? "userDiv" : "gptDiv"} key={idx}>
                    {
                        chat.role === "user"? 
                        <p className="userMsg">{chat.content}</p>: 
                        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{chat.content}</ReactMarkdown>
                    }
                  </div>
                )
              }

              {
                prevChats.length > 0 && (
                  <>
                   {
                     latestReply !== null ? 
                    (<div className="gptDiv" key={"typing"}> <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{latestReply}</ReactMarkdown></div>):
                    (<div className="gptDiv" key={"non-typing"}> <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{prevChats[prevChats.length-1].content}</ReactMarkdown> </div>)
                   }
                  </>
                )
              }
            </div>
        </>
    )
};

export default Chat;