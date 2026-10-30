import React from 'react'
import EmailForm from './EmailForm'
import confetti from "canvas-confetti"


export const runConfetti=()=>{
    confetti({
        particleCount:100,
        spread:70,
        origin:{y:0.6}
    })
}
const Form = ({formElement, defaultValues, emailSchema, inputTextStyle}) => {
    switch(formElement){
        case "email":
            return(
                <EmailForm inputTextStyle={inputTextStyle} emailSchema={emailSchema} defaultValues={defaultValues}/>
            )
        default:
            return null;
    }
}


const CommonForms=({emailSchema, defaultValues,formElement,inputTextStyle})=>{
    return(
        <Form inputTextStyle={inputTextStyle} emailSchema={emailSchema} defaultValues={defaultValues} formElement={formElement}/>
    )
}
export default CommonForms