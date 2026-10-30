import React, {useState, useLayoutEffect,useEffect, useRef} from "react"
import {gsap} from "gsap"
import {ScrollTrigger} from "gsap/ScrollTrigger"
import useAppReady from "@/app/hooks/AppReady"

gsap.registerPlugin(ScrollTrigger)






const ImageSlider=({images})=>{
    const ready=useAppReady()
    const parentContainer=useRef()
    const imageContainer=useRef()

    const parentContainerRef=parentContainer.current
    const imageContainerRef=imageContainer.current

    useLayoutEffect(()=>{
        if(!parentContainerRef||!imageContainerRef) return;

        const ctx=gsap.context(()=>{
            let sections=gsap.utils.toArray(imageContainer?.current.children)
            const timeline=gsap.timeline({repeat:-1,scrollTrigger:{
                trigger:parentContainer.current,
                start:'top 50%',
                end:'bottom top',
                //markers:true
            }})

            gsap.set(sections,{opacity:(index)=>index===0?1:0})

            sections.forEach((section,index)=>{
                const nextSection=sections[(index+1)%sections.length]
                timeline.to({},{duration:2})
                timeline.to(section,{
                    opacity:0,
                    duration:0.8,
                    ease:'power2.inOut'
                })
                timeline.to(nextSection,{
                    opacity:1,
                    duration:0.8,
                    ease:'power2.inOut'
                },"<")
            })
        })

        return ()=>ctx.revert()
    },[parentContainerRef,imageContainerRef])
    return(
        <section ref={parentContainer} className="relative w-full h-full">
            <ul ref={imageContainer}>
                {images.map((img,index)=>(
                    <li key={index} className="absolute left-0 right-0 sxs:p-3 sm:p-0 top-0 w-full h-full">
                        <img src={img} className="object-cover w-full h-full"/>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default ImageSlider