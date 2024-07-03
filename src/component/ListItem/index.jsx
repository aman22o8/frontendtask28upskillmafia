import React,{ useState } from 'react'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

const ListItem = (props) => {
   {/* for update form  */}
   const [updatetodo, setupdatetodo] = useState({updatetitle:"",updatedesc:""})
  const [show, setShow] = useState(false);
  const {eachItem,deleteItem,updatetheFunction}=props
  const {title,description,_id}=eachItem

  //used for closing update form 
  const handleClose = () =>{
          setShow(false)
  } 

  const handlesaveChanges= async()=>{
    console.log(_id)
    const updateData={
      title:updatetodo.updatetitle,
      description:updatetodo.updatedesc
    }
    const options={
      method:"PUT",
      // mode: "no-cors",
      headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(updateData)

      }

    const response= await fetch(`https://backendtask28upskillmafia.onrender.coms/api/v1/updateproduct/${_id}`,options)
    const data= await response.json()
    console.log("Updated data",data)

    setShow(false)
    updatetheFunction(data.todoupdateresult,_id)
  }

  //used for updating the status
  const updateChanges=(event)=>{
    const {name,value}=event.target
    setupdatetodo((prevState)=>{
      return {...prevState,[name]:value}
    })
  }
    
  //used for showing the update form
  const handleShow = () => setShow(true);



   {/* for update form  */}
  const handleDeletebutton=()=>{
    deleteItem(_id)
  }

  
  
  return (
    <li className='border-[2px] my-[8px] border-lime-400 rounded-md p-[10px]'>
      <h1 className='text-[22px] font-bold '>{title}</h1>
      <p className='text-[18px] font-normal'>{description}</p>
      <div className='flex items-center '>

      {/*Pop Up for update form  */}
   
      <Button className='mx-[5px] h-[35px] w-[90px] rounded-lg  font-semibold text-[16px] ' variant="primary" onClick={handleShow}>
        Update
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='font-bold text-[25px]'>Update Todo Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>UPDATE TITLE</Form.Label>
              <Form.Control
              name='updatetitle'
              onChange={updateChanges}
              value={updatetodo.updatetitle}
                type="text"
                placeholder="eg. React Js"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>UPDATE DESCRIPTION</Form.Label>
              <Form.Control type="text"
               name='updatedesc'
              onChange={updateChanges}
              value={updatetodo.updatedesc}
                placeholder="eg. Update....." />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handlesaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
  




  {/*Pop Up for update form ends here */}


       
        <button onClick={handleDeletebutton} className='mx-[5px] h-[35px] w-[90px] rounded-lg text-white  bg-red-600 font-semibold text-[16px]' type="button">Delete</button>
      </div>
    </li>
  )
}

export default ListItem