import './App.css'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import { JoinWindow } from './components/JoinWindow'
import { ChatWindow } from './components/ChatWindow'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<JoinWindow/>}/>
          <Route path='/chat' element={<ChatWindow/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
