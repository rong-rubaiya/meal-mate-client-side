import React from 'react'
import Breakfast from '../components/Breakfast'
import Lunch from '../components/Lunch'
import Dinner from '../components/Dinner'


export default function menu() {
  return (
    <div className='flex flex-col md:flex-row justify-between gap-4 w-11/12 mx-auto py-10'>

     
   
     <Breakfast/>
     <Lunch/>
     <Dinner/> 
    </div>
  )
}
