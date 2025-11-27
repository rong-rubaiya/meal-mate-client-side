import React from 'react'
import Breakfast from '../components/Breakfast'
import Lunch from '../components/Lunch'
import Dinner from '../components/Dinner'


export default function menu() {
  return (
    <div className=' w-11/12 mx-auto py-10'>

     
   
     <Breakfast/>
     <Lunch/>
     <Dinner/> 
    </div>
  )
}
