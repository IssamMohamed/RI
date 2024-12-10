import { useState } from 'react'
import SearchDocs from './components/SearchDocs';
import AddDocs from './components/AddDocs';
import './App.css'

function App() {
  const [count, setCount] = useState(true);

  return (
    <>
      <div className='main'>
        <header className='Header'>
          <button onClick={()=>{setCount(true)}}>Inter your Query</button>
          <button onClick={()=>{setCount(false)}}>Index Documents</button>
        </header>
        {count?<SearchDocs/>
        :<AddDocs/>}
      </div>
    </>
  )
}

export default App
