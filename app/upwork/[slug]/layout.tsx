import React,{ReactNode} from "react"
import type {Metadata} from "next"
import {ParamProvider} from "../../../providers/paramcontext"
const metadata:Metadata={
    title:'',
    description:''
}



const BlogsPage=async({children, params}:{children:ReactNode, params:Promise<{slug:string}>})=>{
    const {slug}=await params;
    return(
           <ParamProvider slug={slug}>
                <main>
             {children} 
            </main>
           </ParamProvider>
        
    )
}

export default BlogsPage