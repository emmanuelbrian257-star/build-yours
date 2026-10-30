"use client"

import { LoaderContext } from '@/providers/loader'
import React,{useState} from 'react'
import LazyLoader from "../components/client/LazyLoader"
import Loader from '../components/client/Loader'

const Page = () => {
    const [isLoading, setIsLoading]=useState(false)

    const start=()=>{
        setIsLoading(true)
    }

    const stop=()=>{
        setIsLoading(false)
    }
  return (
    <LoaderContext.Provider
        value={{
            isLoading,
            start,
            stop
        }}
    >
        <LazyLoader/>
        {isLoading&&(
            <Loader/>
        )}
    </LoaderContext.Provider>
  )
}

export default Page