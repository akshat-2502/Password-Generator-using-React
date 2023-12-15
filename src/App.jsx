import { useState , useCallback, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useRef Hook
  const passwordRef = useRef(null)


  //callBack password generatr
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed){
      str = str += "0123456789"
    }
    if(charAllowed){
      str += "<>{}[]()@,.+=_-:;'!#$%^&*"
    }

    for(let i = 1; i<=length; i++){
      let char = Math.floor(Math.random()*str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  },[length, numberAllowed, charAllowed])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=> {passwordGenerator()}, [length, charAllowed, numberAllowed, setPassword])

  return (
    <>
      <div>
        <h1 className='text-4xl text-center text-white mb-5'>PASSWORD GENERATOR</h1>
        <div className="w-full max-w-lg mx-auto shadow-md rounded-lg px-4 py-8 text-blue-500 bg-gray-700">
          <div className="overflow-hidden flex shadow rounded-lg mb-6">
            <input ref={passwordRef} type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='Password' readOnly />
            <button onClick={copyPasswordToClipboard} className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">Copy</button>
          </div>
          <div className="flex text-sm gap-x-2">
            <div className="flex items-center gap-x-3">
              <input type="range" min={6} max={20} value={length} className="cursor-pointer" onChange={(e) => {setLength(e.target.value)}} />
              <label>Length: {length}</label>
            </div>
            <div className="flex items-center gap-x-3">
              <input type="checkbox" defaultChecked={numberAllowed} id='numberInput' onChange={() => { setNumberAllowed((prev) => !prev ) } } />
              <label htmlFor="numberInput">Number</label>
            </div>
            <div className="flex items-center gap-x-3">
              <input type="checkbox" defaultChecked={charAllowed} id='charInput' onChange={() => { setCharAllowed((prev) => !prev ) } } />
              <label htmlFor="charInput">Special character</label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
