"use client"

import React, {useContext} from "react"
import {DotLoader} from "react-spinners"
import {LoaderContext} from "../../../providers/loader"

const Loader=()=>{
    const {isLoading}=useContext(LoaderContext)
    return(
        <section className={`fixed top-0 bottom-0 left-0 right-0 h-screen bg-black flex justify-center items-center`}>
            <div className="flex flex-col items-center">
                <DotLoader
                    color="#fff"
                    size={30}
                    loading={isLoading}
                />
            </div>
        </section>
    )
}

export default Loader;