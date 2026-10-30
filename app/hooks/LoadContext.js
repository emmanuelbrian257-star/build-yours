import { LoaderContext } from "@/providers/loader"
import {useContext} from "react"

export const useLoader=()=>{
    const loaderContext=useContext(LoaderContext)
    return{
        start:loaderContext.start,
        stop:loaderContext.stop
    }
}