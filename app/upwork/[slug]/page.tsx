"use client"
import Player from '@/app/components/client/Player';
import { LoaderContext } from '@/providers/loader';
import { useParam } from '@/providers/paramcontext';
import React, { useState } from 'react'



interface PageProps {
  params: Promise<{ slug: string }>;
}

const BlogPage = () => {
  const [isLoading, setIsLoading]=useState(false)
  const {slug}=useParam()

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
      {/* <Player src="/assets/upwork.mp4"/> */}
      <h1>Online Services</h1>
    </LoaderContext.Provider>
        
  )
}

export default BlogPage