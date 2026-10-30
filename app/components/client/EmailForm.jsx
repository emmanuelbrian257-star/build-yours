import React, { useContext } from 'react'
import {useForm, Controller} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import toast from "react-hot-toast"
import {Label} from "../../../components/ui/label"
import {Button} from "../../../components/ui/button"
import {Field, FieldGroup} from "../../../components/ui/field"
import { useLoader } from '@/app/hooks/LoadContext'
import { runConfetti } from './CommonForms'
import {EMAIL_PLACEHOLDER} from "../../constants/index"


const EmailForm = ({defaultValues, emailSchema}) => {
    const loader=useLoader()
    const form=useForm({
        defaultValues,
        resolver:zodResolver(emailSchema)
    })
    const handleEmailSubmit=async(data)=>{
        const {email,message}=data;
        if(!email||!message){
            toast.error("Please provide an email",{
                duration:5000
            })
            return;
        }

        loader.start()
        const response=await fetch('/api/mailsend',{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        })
        const result=await response.json()
        if(result){
            form.reset()
            runConfetti()
            toast.success(`${result.message}`,{
                duration:10000
            })
            loader.stop()
        }
    }

    
   
  return (
    <form onSubmit={form.handleSubmit(handleEmailSubmit)}>
        <FieldGroup>
            <div>
                {Object.keys(defaultValues).map((field)=>(
                    <Controller
                        name={field}
                        control={form.control}
                        render={({field})=>(
                            <Field>
                                <div>
                                    <Label className="label_wrapper">
                                        {field.name}
                                    </Label>
                                    <input required {...field} placeholder={EMAIL_PLACEHOLDER[field.name]} className="input_wrapper"/>
                                </div>
                            </Field>
                        )}
                    />
                ))}
                <Button type="submit" className="button_wrapper">
                    Email Us
                </Button>
            </div>
        </FieldGroup>
    </form>
  )
}

export default EmailForm