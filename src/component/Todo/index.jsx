import React, { useState,useEffect } from 'react'
import ListItem from '../ListItem'
import { v4 as uuidv4 } from 'uuid';


const Todo = () => {


        const [addtodo, setaddtodo] = useState({title:"",description:"",id:""})
        const [array, setarray] = useState([])
        
        const getAlldata= async ()=>{
            const options={
                method:"GET",
                // mode: "no-cors",
                headers: {
                    'Content-Type': 'application/json'
                  }

                }
                
                const response= await fetch("https://backendtask28upskillmafia.onrender.com/api/v1/",options)
                const data=await response.json()
                setarray(data.todoresult)
                console.log("initial data",data)
          }


          const postFetchData=async ()=>{
            const addlistData={
                title:addtodo.title,
                description:addtodo.description,
                id:uuidv4()
                
            }
            console.log("entered value",addlistData)
            const options={
                method:"POST",
                // mode: "no-cors",
                headers: {
                    'Content-Type': 'application/json'
                  },
                  body:JSON.stringify(addlistData)

                }
                
                const response= await fetch("https://backendtask28upskillmafia.onrender.com/api/v1/new",options)
                const data=await response.json()
                console.log(data)
                const updatedValue={
                    title:data.addedtodo.title,
                    description:data.addedtodo.description

                }
                setarray((prevState)=>{
                    return [...prevState,updatedValue]
                })
            setaddtodo({title:"",description:"",id:""})
          }

        useEffect(() => {
            
                getAlldata()
                postFetchData()
        
          return () => {
            console.log("unmounted")
          }
        },[array.length])


        
        

        const handleChange=  (e)=>{
            const {name,value}=e.target
            setaddtodo((prevState)=>{
                return {...prevState,[name]:value}
            })
           
                
            }


        const handleSubmit= async (e)=>{
            e.preventDefault()
            postFetchData()


           

        }

        const deleteItem= async (_id)=>{
            console.log(_id)

            const options={
                method:"DELETE",
                // mode: "no-cors",
                headers: {
                    'Content-Type': 'application/json'
                  }
            }

            await fetch(`https://backendtask28upskillmafia.onrender.com/api/v1/deleteproduct/${_id}`,options)

            setarray(array.filter(todo => todo._id !== _id));

        }
        const updatetheFunction=(updatedResults,_id)=>{
            console.log(updatedResults)
            getAlldata()


            // setarray((prevState)=>{
            //     prevState.map((each)=>{
            //         if(each._id===updatedResults._id){
            //             return {...each,title:updatedResults.title,description:updatedResults.description,dateCreated:updatedResults.dateCreated}

            //         }
            //         return each
            //     })
            // })
            


        }
        // console.log(addtodo)
        
  return (
    <div className=' flex flex-col justify-center items-center'>
        <h1 className='text-[35px] font-bold'>Todo</h1> 
        <h1 className='text-[28px] font-bold'>Your free instance will spin down with inactivity, which can delay requests by 50 seconds or more.</h1> 
        <form className=' w-[90%] border-2 border-indigo-500 rounded-[5px] p-[10px] flex flex-col justify-center items-center' onSubmit={handleSubmit}>
            <label className='mt-[20px] text-[20px] font-bold self-start' htmlFor='title'>TITLE</label>
            <input className='border-2 border-lime-500 rounded-[5px] pl-[10px] h-[30px] w-[100%]' value={addtodo.title} onChange={handleChange} type="text" name="title" id="title" placeholder='Eg. React' />

            <label className='mt-[20px] text-[20px] font-bold self-start' htmlFor='description'>DESCRIPTION</label>
            <input className='border-2 border-lime-500 rounded-[5px] pl-[10px] h-[30px] w-[100%]' onChange={handleChange} value={addtodo.description} type="text" name="description" id="description" placeholder='i have to do something Great.....' />


            <button className='my-[15px] rounded-[8px] h-[30px] w-[90px] bg-red-500 text-white' type="submit">Add</button>
        </form>

        <ul className='m-[0px] p-[0px] list-none w-[90%]'>{
            array.map((each)=>{
                console.log("uniuq id",each.id)
                return <ListItem key={each.id} eachItem={each} updatetheFunction={updatetheFunction} deleteItem={deleteItem}/>
            })
            }</ul>

        </div>
  )
        
}
export default Todo
