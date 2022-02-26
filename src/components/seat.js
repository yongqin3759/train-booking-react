const Seat = ({record,handleShow,handleCancel}) => {
    let seatStyle = {width:40, height:40, display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid', borderRadius: '5px'}
    let handleClick;
    if(record.available == false){
        seatStyle = {...seatStyle,
                        background: "grey"}
        handleClick = handleCancel
    }else{
        handleClick = handleShow
    }
    return(
        <button style={seatStyle} onClick={()=>handleClick(record.seatNo)}>
            <div>
                {record.seatNo}
            </div>
        </button>
    )
}

export default Seat