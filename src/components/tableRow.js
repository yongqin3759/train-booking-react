import validateName from '../helpers/validator'

const TableRow = ({record, addTraveller,handleCancel}) => {
    let firstNameStyle,lastNameStyle;
    const submitData = (e) => {
        e.preventDefault();
        const firstName = e.target.parentNode.previousSibling.previousSibling.previousSibling.childNodes[0]
        const lastName = e.target.parentNode.previousSibling.previousSibling.childNodes[0]
        const seatNo = e.target.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.innerHTML
        if(!validateName(firstName.value)){
            firstName.style.background = 'red'
            setTimeout(()=>{
                firstName.style.background = ''
            },1500)
        }if(!validateName(lastName.value)){
            lastName.style.background = 'red'
            setTimeout(()=>{
                lastName.style.background = ''
            },1500)
        }
        if(validateName(lastName.value) && validateName(firstName.value)){
            addTraveller(firstName.value,lastName.value,seatNo)
        }
    }

    const cancelSeat = (e) => {
        const seatNo = e.target.parentNode.parentNode.childNodes[0].innerHTML
        handleCancel(seatNo)
    }
    if(record.time != null){
        return(
            <tr>
                <th>{record.seatNo}</th>
                <th>{record.firstName}</th>
                <th>{record.lastName}</th>
                <th>{record.time}</th>
                <th><button onClick={cancelSeat}>Cancel</button></th>
            </tr>
        )
    }else{
        return(
            <tr>
                <th>{record.seatNo}</th>
                <th><input style={firstNameStyle}/></th>
                <th><input style={lastNameStyle}/></th>
                <th></th>
                <th><button onClick={submitData}>Save</button></th>
            </tr>
        )
    }
}

export default TableRow