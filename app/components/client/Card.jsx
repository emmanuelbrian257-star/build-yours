import { Card, CardContent } from "@/components/ui/card"
import React,{useState, useLayoutEffect, useEffect, useRef} from "react"
import ImageSlider from "./ImageSlider"



const CardContainer=({cardDetails})=>{
    return(
        <Card className="overflow-y-auto py-3">
            <div className="px-2 py-3">
                <CardContent>
                    <div className="relative h-[350px]">
                        <ImageSlider images={cardDetails?.images}/>
                    </div>
                    <div className="">
                        <h2 className='cardTitle'>{cardDetails?.title}</h2>
                        <p className="text-black font-bosch sm:text-xl">{cardDetails?.description}</p>
                    </div>
                </CardContent>
            </div>
        </Card>
    )
}

export default CardContainer