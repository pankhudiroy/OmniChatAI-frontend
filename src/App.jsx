import './App.css'
import Sidebar from "./Sidebar.jsx";
import ChatWindow from "./ChatWindow.jsx";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import MyContext from "./MyContext.jsx";
import {useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import {BrowserRouter, Routes, Route} from "react-router";

function App() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currentThreadId, setcurrentThreadId] = useState(uuidv4());
  const [prevChats, setPrevChats] = useState([]);
  const [newChat, setNewChat] = useState(true);
  const [allThreads, setAllThreads] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  // const [collapsed, setCollapsed] = useState(false);

  const providerValues = {
    prompt, setPrompt,
    reply, setReply,
    currentThreadId, setcurrentThreadId,
    prevChats, setPrevChats,
    newChat, setNewChat,
    allThreads, setAllThreads,
    sidebarOpen, setSidebarOpen,
    isLoginOpen, setIsLoginOpen,
    isLoggedIn, setIsLoggedIn,
    username, setUsername,
    // collapsed, setCollapsed
  };    // passing values


  return (
    <BrowserRouter>
      <MyContext.Provider value = {providerValues}>
        <Routes>
          <Route
            path='/'
            element = {
              <div className='app'>
                <Sidebar
                  sidebarOpen={sidebarOpen}
                />

                <ChatWindow
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                />
              </div>
            }
          />

          <Route path='/login' element = {<Login/>} />
          <Route path='/signup' element = {<Signup/>} />
        </Routes>
      </MyContext.Provider>
    </BrowserRouter>
  )
}

export default App;
