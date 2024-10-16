const regEx = {
    "REQUIRED":{
        pattern:/./,
        message:'Required !!!'
    },
    "EMAIL":{
        pattern:/^[a-zA-Z]{1}[a-zA-Z0-9._/]*@[a-zA-z]{3,10}\.[a-zA-Z]{2,3}$/,
        message:"Should be in the email format"
    },
    "MIN5CHAR":{
        pattern:/[a-zA-Z0-9@_.]{5,}/,
        message:"Minimum 5 characters required"
    },
    "PHONENUMBER":{
        pattern:/^[0-9]{10}$/,
        message:"Exactly 10 digits required"
    }
}

function validate(inputObj){
    inputObj.errorMsg = ""
    for(let val of inputObj?.criteria){
        const{pattern,message} = regEx[val]
        if(!pattern.test(inputObj?.value)){
            inputObj.errorMsg = message
            break
        }
    }
}
export function handleFieldLevelValidation(event,inputControls,setinputControls){
    const{name,value} = event?.target
    const clonedInputControls = JSON.parse(JSON.stringify(inputControls))
    let inputObj  = clonedInputControls.find((obj )=>obj.name === name)
    inputObj.value = value
    validate(inputObj)
    // console.log(inputControls)
    setinputControls(clonedInputControls)
}

export function handleFormLevelValidation(inputControls,setInputControls){
    const dataObj  = {}
        const clonedInputControls = JSON.parse(JSON.stringify(inputControls))
        clonedInputControls.forEach((obj ) =>{                 //check each input field have data or not
            dataObj[obj.name] = obj.value
            validate(obj)                           //if data is there then update hasError is false otherwise true
        })
        const isInValid = clonedInputControls.some((obj)=> obj.errorMsg) //If any of the input object with hasError is true then it is invalid
        setInputControls(clonedInputControls)
        return[isInValid,dataObj]
}

export function setFormData(inputControls,setInputControls,rowData,isEdit,fieldName){
    const clonedInputControls = JSON.parse(JSON.stringify(inputControls))
    clonedInputControls.forEach((obj ) =>{    
        if(isEdit && obj.name === fieldName){
            obj.isDisabled = true
        }     
        obj.value = rowData[obj.name]         
    })
    setInputControls(clonedInputControls)
}

export function clearFormData(){
    
}
