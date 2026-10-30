import React,{ReactNode} from "react"
import { LenisProvider } from "@/providers/lenis"


export const metadata={
    title:'Buildyours',
    description:'Buildyours application'
}

const layout=({children}:{children:ReactNode})=>{
    return(                
        <LenisProvider>
            <main>
                {children}
            </main>
        </LenisProvider>
    )
}

export default layout