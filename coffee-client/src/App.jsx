
import { Link, useLoaderData } from 'react-router-dom'
import './App.css'
import Card from './compnenets/Card';
import { useState } from 'react';

function App() {
  const loadedData = useLoaderData();
  const [data,setData]=useState(loadedData)


  return (
    <>
      
      <h1 className='text-6xl text-orange-400'>Coffees number {data.length}</h1>
     <Link to={'/addCoffe'}><button className='btn btn-outline'>Add coffe</button></Link>
     <div className='max-w-6xl mx-auto grid grid-cols-2 gap-4'>
      {
        data.map(aData=><Card key={aData._id} props={aData} setData={setData} data={data}></Card>)
      }
     </div>
    </>
  )
}

export default App
