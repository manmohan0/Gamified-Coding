import { SetStateAction, useState } from 'react'
import './App.css'
import { useData } from '../utils/cloudStorage'
import axios from 'axios'
import AceEditor from 'react-ace'
import 'brace'
import 'brace/mode/python'
import "ace-builds/src-noconflict/ext-language_tools"
import "ace-builds/src-noconflict/mode-python"
import { useRecoilValue } from 'recoil'
import { dialogue, urls } from '../utils/atoms'
import React from 'react'

export const Editor = () => {
   
  const [number, setNumber] = useState<number>(0)
  const [code, setCode] = useState<string>("")
  const [output, setOutput] = useState<string>("")

  useData()

  const url = useRecoilValue(urls)
  const dialogues = useRecoilValue(dialogue)

  const handleCodeInput = (e: SetStateAction<string>) => {
    setCode(e)
  } 

  const handleSubmit = async () => {
    const result = await axios.post('http://127.0.0.1:1010/', {
      code
    })
    setOutput(result.data)
  }

  const Next = () => {
    setNumber(number + 1)
  }

  return (
    <>
      <div className='flex'>
        <AceEditor
            theme='monokai'
            mode='python'
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              tabSize: 4
            }}
            onChange={handleCodeInput}
            name='Game Playground'
            height='100vh'
            width='45vw'
            fontSize='16px'
        />
        <button className='h-12 w-16 absolute translate-x-168.5 bg-[url(/Run.jpeg)]' onClick={handleSubmit}>Run</button>
        <div className='flex flex-col'>
          <div className='relative h-[70vh] w-[55vw] border-l border-[#555651] bg-[#272822]'>
            <div className='flex justify-center'>
              <img src={url[number]} className='h-[45vh]' alt="x" />
            </div>
            <div className='absolute rounded-2xl bottom-0 left-0 bg-[#2f302a] h-[25vh] w-[55vw] flex items-center justify-center'>
              <span className='absolute m-10 text-center text-white'>{dialogues[number]}</span>
              <span onClick={Next} className='absolute bottom-6 right-10 w-2 h-2 cursor-pointer text-white'>Next</span>
            </div>
          </div>
          <div className='bg-[#272822] border-l border-t-1 border-[#555651]'>
            <pre className='overflow-auto h-[30vh] mx-2 text-amber-50' >
              Output&gt;
              <br />
              {output}
            </pre>
          </div>
        </div>
      </div>
    </>
  )
}