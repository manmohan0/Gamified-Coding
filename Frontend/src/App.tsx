import { useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
   
  const [code, setCode] = useState("")
  const [output, setOutput] = useState("")

  const handleCodeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value)
  } 

  const handleSubmit = async () => {
    const result = await axios.post('http://127.0.0.1:1010/', { code })
    setOutput(result.data)
  }

  return (
    <>
      <input type="text" name="code" id="code" onInput={handleCodeInput}/>
      <button type="submit" onClick={handleSubmit}>submit</button>
      <pre style={{marginTop: 20}}>{output}</pre>
    </>
  )
}

export default App
