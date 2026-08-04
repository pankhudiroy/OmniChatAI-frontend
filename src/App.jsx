import './App.css'
import Sidebar from "./Sidebar.jsx";
import ChatWindow from "./ChatWindow.jsx";
import MyContext from "./MyContext.jsx";
import {useState} from "react";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currentThreadId, setcurrentThreadId] = useState(uuidv4());
  const [prevChats, setPrevChats] = useState([]);
  const [newChat, setNewChat] = useState(true);
  const [allThreads, setAllThreads] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // const [collapsed, setCollapsed] = useState(false);

  const providerValues = {
    prompt, setPrompt,
    reply, setReply,
    currentThreadId, setcurrentThreadId,
    prevChats, setPrevChats,
    newChat, setNewChat,
    allThreads, setAllThreads,
    sidebarOpen, setSidebarOpen,
    // collapsed, setCollapsed
  };    // passing values


  return (
    <div className='app'>
      <MyContext.Provider value = {providerValues}>
        {/* <Sidebar></Sidebar>
        <ChatWindow></ChatWindow> */}
        <Sidebar
          sidebarOpen={sidebarOpen}
          // collapsed={collapsed}
          // setCollapsed={setCollapsed}
        />

        <ChatWindow
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
      </MyContext.Provider>
      
    </div>
  )
}

export default App;
