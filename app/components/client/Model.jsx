import {useRef, useLayoutEffect, forwardRef} from "react"
import * as THREE from "three"
import {useGLTF} from "@react-three/drei"
import { useThree, useFrame } from "@react-three/fiber"


const Model=forwardRef((props, ref)=>{
    const {scene}=useGLTF('/assets/water_bottle.glb')
    const {camera,gl}=useThree()
    let currentRotation=useRef(0)

    const {scrollState}=props

    const smoothProgress=useRef(0)

    const currentWidth=window.innerWidth;
    const currentHeight=window.innerHeight;


    useLayoutEffect(()=>{
        if(!scene) return;

        let modelSize;
        const cameraDistance=1.45
        const isMobile=currentWidth<1080

        const box=new THREE.Box3().setFromObject(scene)
        const size=box.getSize(new THREE.Vector3())
        const center=box.getCenter(new THREE.Vector3())
        modelSize=size;

        camera.aspect=currentWidth/currentHeight;
        camera.position.set(0,0,Math.max(modelSize.x, modelSize.y, modelSize.z)*cameraDistance)
        camera.lookAt(0,0,0)
        gl.setSize(currentWidth,currentHeight);
        gl.setPixelRatio(Math.min(window.devicePixelRatio,2));

        if (isMobile) {
            scene.position.set(-center.x - modelSize.x * 0.28, 0, -center.z);
        } else {
            scene.position.set(-center.x - modelSize.x * 3.7, 0, -center.z);
        }

        scene.rotation.z=THREE.MathUtils.degToRad(-25);
    },[scene])

    const UP_AXIS=new THREE.Vector3(0,1,0)

    useFrame((state,delta)=>{
        smoothProgress.current=THREE.MathUtils.lerp(
            smoothProgress.current,
            scrollState.current.progress,
            0.1
        )

        const p=smoothProgress.current

        if(p>0.05){
            const rotationProgress=(p-0.05)/0.95
            const targetRotation=Math.PI*2*4*rotationProgress;
            const rotationDiff=targetRotation-currentRotation.current

            if(Math.abs(rotationDiff)>0.001){
                ref?.current?.rotateOnAxis(UP_AXIS,rotationDiff)
                currentRotation.current=targetRotation
            }
        }else{
            //ref.current.quaternion.setFromAxisAngle(UP_AXIS,0)
            //ref.current.rotation.y=0
        }
})

    
    return(
        <primitive ref={ref} object={scene}/>
    )
})

export default Model;
