import React from 'react'

const chatMessages = [
    {
        "from": "ai",
        "text": "hello"
    },
    {
        "from": "user",
        "text": "hi"
    }
]

export default function Chat() {
  return (
    <main className='flex h-96 border-2 border-gray w-full flex-col px-4 py-4'>
        {chatMessages.map((value, key) => {
            if(value.from == "ai") {
                return (<div key={key} className='w-full text-left'>{value.text}</div>)
            } else {
                return (<div key={key} className='w-full text-right'>{value.text}</div>)
            }
        })}
    </main>
  )
}
