import React, { useState } from "react"


export const Output = () => {

    const [output, setOutput] = useState<string>("")
    
    const handleSubmit = async () => {
        const result = await axios.post('http://127.0.0.1:1010/', {
            code
        })
        setOutput(result.data)
    }

    return <>
        <div className='bg-[#272822] border-l border-t-1 border-[#555651]'>
            <pre className='overflow-auto h-[30vh] mx-2 text-amber-50' >
                Output&gt;
                <br />
                {output}
            </pre>
        </div>
    </>
}