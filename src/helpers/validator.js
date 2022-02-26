const regName = /^[a-zA-Z]/;

const validateName = (name) => {
    if(!regName.test(name)){
        return false
    }else{
        return true
    }
}

export default validateName