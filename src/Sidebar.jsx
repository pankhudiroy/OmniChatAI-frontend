import "./Sidebar.css";
import {useContext, useEffect, useState} from "react";
import MyContext from "./MyContext.jsx";
import { v4 as uuidv4 } from 'uuid';
import blacklogo from "./assets/blacklogo.png";

function Sidebar(){
    const {allThreads, setAllThreads, currentThreadId, setNewChat, setReply, setPrompt, setcurrentThreadId, setPrevChats, sidebarOpen, setSidebarOpen} = useContext(MyContext);
    // const [option, setOption] = useState(true);
    const [openThreadId, setOpenThreadId] = useState(null); 
    const [editingThreadId, setEditingThreadId] = useState(null);
    const [editingTitle, setEditingTitle] = useState("");


    const getAllThreads = async () =>{
        try{
        //   const response = await fetch("http://localhost:8080/api/thread");
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/thread`);
          const res = await response.json();
          const filterData = res.map(thread => ({threadId: thread.threadId, title: thread.title}));
        //   console.log(filterData);
          setAllThreads(filterData);
        }catch(err){
          console.log(err);
        }
    };

   useEffect(() =>{
        getAllThreads();
   }, [currentThreadId]);


   const createNewChat = () =>{
        setNewChat(true);
        setPrompt("");
        setReply(null);
        setcurrentThreadId(uuidv4());
        setPrevChats([]);
   }

   const changeThread = async (newThreadId) =>{
        setcurrentThreadId(newThreadId);

        try{
        //   const response = await fetch(`http://localhost:8080/api/thread/${newThreadId}`);
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/thread/${newThreadId}`);
          const res = await response.json();
          setPrevChats(res);
          setNewChat(false);
          setPrompt("");
          setReply(null);

        }catch(err){
          console.log(err);
        }
        
   }

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest(".sidebar")) {
            setOpenThreadId(null);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    useEffect(() => {
        if (openThreadId) localStorage.setItem("openThreadId", openThreadId);
        else localStorage.removeItem("openThreadId");
    }, [openThreadId]);

    useEffect(() => {
        const saved = localStorage.getItem("openThreadId");
        if (saved) setOpenThreadId(saved);
    }, []);

    const deleteThread = async(threadId) =>{
        console.log("delete");
        try{
           const response = await fetch(`${import.meta.env.VITE_API_URL}/api/thread/${threadId}`, {method: "DELETE"});
           const res = await response.json();
           console.log(res);

           //updated threads re-render
           setAllThreads(prev => prev.filter(thread => thread.threadId !== threadId));

           if(threadId === currentThreadId){
            createNewChat();
           }

        }catch(err){
           console.log(err);
        }
    }

    
    const handleRename = async (threadId) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/thread/${threadId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: editingTitle }),
            });
            const res = await response.json();

            // Update local state
            setAllThreads((prev) =>
            prev.map((t) =>
                t.threadId === threadId ? { ...t, title: editingTitle } : t
            )
            );

            setEditingThreadId(null);
            setEditingTitle("");
        } catch (err) {
            console.log(err);
        }
    };


    return(
//         <div
// className={`sidebar
//   ${sidebarOpen ? "open" : ""}
//   ${collapsed ? "collapsed" : ""}`}
// ></div>
        // <section className="sidebar">
        <section className={`sidebar ${sidebarOpen ? "open" : ""}`}>
            {/* New chat button */}
            <button onClick={createNewChat}>
                <img src={blacklogo} alt="GPT logo" className="logo" ></img>
                {/* <p>OmniChatAI</p> */}
                <span><i className="fa-regular fa-pen-to-square">New Chat</i></span>

                {/* <button className="mobileToggle" onClick={() => setCollapsed(!collapsed)}>
  <i className="fa-solid fa-xmark"></i>

  {!collapsed && <span>Collapse</span>}
</button> */}

            <i
  className="fa-solid fa-xmark mobileToggle"
  onClick={(e) => {
      e.stopPropagation();
      setSidebarOpen(false);
    //   setCollapsed(!collapsed);
  }}
></i>
            </button>



            {/* { allThreads && <h3>Recents</h3>} */}

            {/* Hitsory */}
            <ul className="history">
                { allThreads && <h4>Recents</h4>}
                {
                    allThreads?.map((thread, idx) =>(
                        // <li key={idx}  
                        //     onClick={(e) => changeThread(thread.threadId)}
                        //     className={thread.threadId === currentThreadId ? "highlighted" : ""}
                        // >
                        //     <div className="thread-title">
                        //         {thread.title}
                        //     </div>
                        //     <i className="fa-solid fa-ellipsis" 
                        //        onClick={(e) =>{
                        //          e.stopPropagation();
                        //          console.log("clicked");
                        //         //  setOption(true);
                        //          setOpenThreadId(openThreadId === thread.threadId ? null : thread.threadId);
                        //        }}>
                        //     </i>
                        //     { openThreadId === thread.threadId && (
                        //         <div className="options">
                        //             <i className="fa-regular fa-pen-to-square" 
                        //               onClick={(e) =>{
                        //                 e.stopPropagation();
                        //                 renameThread(thread.threadId);
                        //                }}
                        //             >
                        //                 &nbsp; 
                        //                 Rename
                        //             </i>
                        //             <i className="fa-regular fa-trash-can"
                        //                 onClick={(e) =>{
                        //                     e.stopPropagation();
                        //                     deleteThread(thread.threadId);
                        //                 }}
                        //             >
                        //                 &nbsp; 
                        //                 Delete
                        //             </i>
                        //         </div>
                        //     )}
                        // </li>
                        <li key={idx} className={thread.threadId === currentThreadId ? "highlighted" : ""}  onClick={(e) => changeThread(thread.threadId)}>
                            {editingThreadId === thread.threadId ? (
                                <input
                                    type="text"
                                    value={editingTitle}
                                    autoFocus
                                    className="renameInput"
                                    onChange={(e) => setEditingTitle(e.target.value)}
                                    onBlur={() => handleRename(thread.threadId)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") handleRename(thread.threadId);
                                    }}
                                />
                                ) : (
                                <div className="thread-title">{thread.title}</div>
                            )}

                            <i
                                className="fa-solid fa-ellipsis"
                                onClick={(e) => {
                                e.stopPropagation();
                                setOpenThreadId(openThreadId === thread.threadId ? null : thread.threadId);
                                }}
                            ></i>

                            {openThreadId === thread.threadId && (
                                <div className="options">
                                <i
                                    className="fa-regular fa-pen-to-square"
                                    onClick={(e) => {
                                    e.stopPropagation();
                                    setEditingThreadId(thread.threadId);
                                    setEditingTitle(thread.title);
                                    setOpenThreadId(null); // close dropdown
                                    }}
                                >
                                    Rename
                                </i>
                                <i
                                    className="fa-regular fa-trash-can"
                                    onClick={(e) => {
                                    e.stopPropagation();
                                    deleteThread(thread.threadId);
                                    }}
                                >
                                    Delete
                                </i>
                                </div>
                            )}
                        </li>
                    ))
                }
               
            </ul>

            {/* sign */}
            <div className="sign">
                <p>Built with &hearts;</p>
            </div>
        </section>
    )
}

export default Sidebar;