import React, {useState} from 'react';
import data from '../seats.json'
import TableRow from '../components/tableRow'
import Seat from '../components/seat'
import { Link } from "react-router-dom";
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import validateName from '../helpers/validator'

const Bookings = () => {
    const [seats,setSeats] = useState(data)
    const [show, setShow] = useState(false);
    const [modal,setModal] = useState({
        seatNo: null,
        firstName: '',
        lastName: ''
    })
    let firstNameModal, lastNameModal

    const handleClose = () => {
        setShow(false)
        setModal({
            seatNo: null,
            firstName: '',
            lastName: ''
        })
    };
    const handleShow = () => setShow(true);

    const handleAddTraveller = (firstName,lastName,seatNo) => {
        console.log(seatNo)
        let seatHelper = [...seats].map((seat)=> {
            if(seat.seatNo == seatNo){
                return {
                    ...seat,
                    firstName: firstName,
                    lastName: lastName,
                    available: false,
                    time : new Date().toISOString()
                }
            }else{
                return seat
            }
        })
        setSeats(seatHelper)
    }

    const handleCancel = (seatNo) => {
        let seatHelper = [...seats].map((seat)=> {
            if(seat.seatNo == seatNo){
                return {
                    ...seat,
                    firstName: null,
                    lastName: null,
                    available: true,
                    time : null
                }
            }else{
                return seat
            }
        })
        setSeats(seatHelper)
    }
    const handleShowModal = (seatNo) => {
        handleShow()
        setModal({
            ...modal,
            seatNo: seatNo,
        })
    }

    const handleFirstNameChange = (e) => {
        setModal({
            ...modal,
            firstName: e.target.value
        })
    }
    const handleLastNameChange = (e) => {
        setModal({
            ...modal,
            lastName: e.target.value
        })
    }


    const handleSave = () => {
        console.log(modal.firstName, modal.lastName)
        if (!validateName(modal.firstName)){
            firstNameModal = document.getElementById('modalFirstName')

            setTimeout(()=>{
                firstNameModal.style.backgroundColor = 'white'
            },1200)
            firstNameModal.style.backgroundColor = 'red'
        }if(!validateName(modal.lastName)){
            lastNameModal = document.getElementById('modalLastName')

            lastNameModal.style.backgroundColor = 'red'

            setTimeout(()=>{
                lastNameModal.style.backgroundColor = 'white'
            },1200)
        }
        if(validateName(modal.firstName) && validateName(modal.lastName)){
            console.log(modal.firstName, modal.lastName)
            handleAddTraveller(modal.firstName,modal.lastName,modal.seatNo)
            handleClose()
        }
    }

    return(
        <div>
        <Link to="/" style={{display: 'block'}}>Home</Link> 
        <style>{`
            table{
            border:1px solid black;
            }
            th{
            border:1px solid black;
            }
            .container{
                display:flex;
                flex-wrap: wrap;
                flex-direction: column;
                height: 180px;
            }
        `}</style>
            This is the booking page.
            <div className='container'>
                    {seats.map(item=>{
                            return(<Seat record={item}
                                handleShow={(seatNo)=>handleShowModal(seatNo)}
                                handleCancel={handleCancel}
                            />)
                    })}
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Seat No.</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Time</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {seats.map(item=>{
                        return(<TableRow record={item} 
                                        addTraveller={(firstName,lastName,seatNo)=> 
                                        handleAddTraveller(firstName,lastName,seatNo)}
                                        handleCancel={(seatNo)=>handleCancel(seatNo)}
                                        />)
                    })}
                </tbody>
            </table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Book Seat {modal.seatNo}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h6>First Name:</h6>
                    <input
                        id="modalFirstName" 
                        type="text" 
                        name="first" 
                        value={modal.firstName} 
                        onChange={handleFirstNameChange}
                        placeholder="First Name"
                    />
                    <h6>Last Name:</h6>
                    <input 
                        id="modalLastName"
                        type="text" 
                        name="last" 
                        value={modal.lastName} 
                        onChange={handleLastNameChange}
                        placeholder="Last Name"
                    />
                    
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Bookings