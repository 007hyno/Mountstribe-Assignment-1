import React from 'react'
import {useState}  from 'react'

function Home() {


  const [data,setData] = useState('Dummy data')


  async function handleClick(e) {
    e.preventDefault();

  fetch('http://localhost:3001/')
  .then(response => response.text())
  .then(response => {console.log("♾♾ - "+response)})
}
  
  return (
    <div className='container'>
        <h1>-: Home :-</h1>
        
        <h1>{data}</h1>
      
    </div>
  )
}

export default Home