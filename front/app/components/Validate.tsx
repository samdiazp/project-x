'use client'
import React, {useState} from "react"

export default function Validate() {
  const [jwt, setJwt] = useState('')
  const [data, setData] = useState<Object | null>(null)
  async function validate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const response = await fetch('http://localhost:8000/api/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({jwt})
    })
    const json = await response.json()
    setData(json)
    setJwt('')
  }
  return (
    <div className='flex flex-col'>
      <h2>Validate</h2>
      <form onSubmit={validate}>
        <input
          type="text"
          placeholder='validate JWT'
          value={jwt}
          onChange={event => setJwt(event.target.value)}
        />
        <button type="submit">validate</button>
      </form>
      {data && JSON.stringify(data, null, 2)}
    </div>
  )

}
