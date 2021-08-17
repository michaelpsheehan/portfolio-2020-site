import * as THREE from 'three'
import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame} from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useUpdate }from '../../../hooks/useUpdate'
import { vertexShader, fragmentShader } from './shaders/shaders'

const getRandomVector = () =>  Math.random() * 2 - 1


import useWindowSize from '../../../hooks/useWindowSize'




const Sphere = ({ spherePosition, userScale = 1.5 }) => {
  const [hovered, setHover] = useState(false)

  const geoRef = useRef()
  const matRef = useRef()

  
  // useUpdate allows me to do some of the initial sphere mesh setup imperatively
  const meshRef = useUpdate((currentMesh) => {
    const geometry  = currentMesh.geometry
    const positions = geometry.getAttribute('position')
    const vertexCount = positions.count
    const triangleCount = vertexCount / 3

    const randomDirections = []
    const randomStrengths = []
    for (let i = 0; i < triangleCount; i++) {
      // Get a random vector
      const dir = new THREE.Vector3(
        getRandomVector(),
        getRandomVector(),
        getRandomVector()
      )
        .normalize()
        .toArray()

      // Triplicate it and turn into a flat list of x, y, z, x, y, z...
      const directions = [dir, dir, dir, dir, dir, dir, dir, dir, dir].flat()

      // Concat into array
      randomDirections.push(...directions)

      // Do the same but with the 1 random strength float
      const str = Math.random()
      randomStrengths.push(str, str, str)
    }

    // Define the attributes
    const randomDirectionsAttribute = new THREE.BufferAttribute(
      new Float32Array(randomDirections),
      3
    )
    geometry.setAttribute('randomDirection', randomDirectionsAttribute)

    const randomStrengthsAttribute = new THREE.BufferAttribute(
      new Float32Array(randomStrengths),
      1
    )
    geometry.setAttribute('randomStrength', randomStrengthsAttribute)
  }, [])

  //  useFrame works similar to request animation frame and allows me to make updates at 60fps
  useFrame((frame) => {
    const { clock } = frame
    // update the uniforms on the shaders every second

    // the explosion value is different depending if the hovered state is true
    if(matRef.current !== undefined ) { 
      matRef.current.uniforms.explosion.value =
      Math.sin(clock.elapsedTime * 0.8 - Math.PI / 4) * (hovered ? 0.15 : 0.002)

      matRef.current.uniforms.time.value =
      (clock.elapsedTime * 0.8 - Math.PI / 4) * 0.2 + 0.2

    } 
    // only rotate the sphere automatically when it is not hovered
    if (meshRef.current !== undefined && !hovered) {
      meshRef.current.rotation.z += 0.0005
      meshRef.current.rotation.x += 0.0005
      meshRef.current.rotation.y += 0.003
    }
  })

  const shadTest =  <shaderMaterial
  attach="material"
  args={[
    {
      vertexShader,
      fragmentShader,
     
      uniforms: {
        explosion: { type: 'f', value: 1 },
        time: { type: 'f', value: 0 },
      },
      side: THREE.DoubleSide,
    },
  ]}

  ref={matRef}
/>

  return (
    <>
      <mesh
        ref={meshRef}
        scale={[userScale, userScale, userScale]}
        onPointerOver={(e) => setHover(true)}
        onPointerOut={(e) => setHover(false)}
        position={spherePosition}
      >
        <icosahedronBufferGeometry
          attach="geometry"
          args={[1, 35]
          }
          ref={geoRef}
          uniforms={{
            explosion: { type: 'f', value: 1 },
            time: { type: 'f', value: 0 },
          }}
          vertexShader={vertexShader}
        />
        <shaderMaterial
          attach="material"
          args={[
            {
              vertexShader,
              fragmentShader,
              uniforms: {
                explosion: { type: 'f', value: 1 },
                time: { type: 'f', value: 0 },
              },
              side: THREE.DoubleSide,
            },
          ]}
          ref={matRef}
        />
      </mesh>
    </>
  )
}

// don't do 3D things during ssr, check browser exists
const isBrowser = typeof window !== 'undefined'

export default function BreakingSphere({ userScale }) {
  const [spherePosition, setPosition] = useState([0, 0, 1])

  if (isBrowser) {
    const windowSize = useWindowSize()
    const  width = windowSize?.width

    useEffect(() => {
      if(!width) return
      if (width > 768) {
        setPosition([2, 0, -1])
      }
      if (width > 1024) {
        setPosition([2, 0, 0])
      }
    }, [width])
  }

  return (
    <>
      {isBrowser && (
        <>
          <Canvas camera={{ fov: 70 }}>
            <Sphere userScale={userScale} spherePosition={spherePosition} />
            <OrbitControls
              mouseButtons={{
                LEFT: THREE.MOUSE.ROTATE,
                MIDDLE: THREE.MOUSE.DOLLY,
                RIGHT: THREE.MOUSE.PAN,
              }}
              enableZoom={false}
            />
          </Canvas>
        </>
      )}
    </>
  )
}


