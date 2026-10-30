import React,{ReactNode} from "react"


export const metadata={
    title:'Buildyours',
    description:'Buildyours Admin'
}

const layout=({children}:{children:ReactNode})=>{
    return(                
            <main>
                {children}
            </main>
    )
}

export default layout