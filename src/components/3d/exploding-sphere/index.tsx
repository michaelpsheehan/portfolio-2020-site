import * as THREE from 'three'
import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useUpdate } from 'react-three-fiber'
import { OrbitControls } from 'drei'

const getRandomVector = () =>  Math.random() * 2 - 1


import useWindowSize from '../../../hooks/useWindowSize'
import { IUniform } from 'three'
interface Props {
  spherePosition: THREE.Vector3 | [x: number, y: number, z: number] 
  userScale: number
}

interface IMeshAttributes {
  count: number
}

// interface IMesh {
//   geometry: {
//     getAttribute: (att: string) =>  IMeshAttributes
//     setAttribute: (att: string, attType: THREE.BufferAttribute) =>  IMeshAttributes
//   }
// }

interface ITest extends THREE.IUniform {
    // explosion: {
    //         value: number
    //       }
    //       time: {
    //         value: number
    //       } 


          explosion: { type: string, value: number },
          time: { type: string, value: number },
          //   time: { type: 'f', value: 0 },
}

interface IMaterialRef extends THREE.ShaderMaterial {
  args?: {

    uniforms:{ 
      // explosion: { type: 'f', value: 1 }
      explosion: { type: string, value: number };
      time:{ type: string, value: number };
      
    }[]
}

  //   uniforms: {
  //     explosion: {
  //       value: number
  //     }
  //     time: {
  //       value: number
  //     } 
  // }
}


interface testGeoRef extends THREE.IcosahedronBufferGeometry { 
  uniforms:{ 
    // explosion: { type: 'f', value: 1 }
    explosion: {type: string; value: number}
    // THREE.IUniform ;
    time: THREE.IUniform
  
  }
}

const Sphere: React.FC<Props> = ({ spherePosition, userScale = 1.5 }: Props) => {
  const [hovered, setHover] = useState(false)

  // const geoRef = useRef<THREE.IcosahedronBufferGeometry>()
  const geoRef = useRef<any>()
  // const matRef = useRef<IMaterialRef>()
  // const matRef = useRef<THREE.ShaderMaterial>()
  const matRef = useRef<IMaterialRef>()

  // custom shaders to handle the geometry explosion effect and the fragment colour effect
  
  const fragmentShader: string = `
  varying vec3 vOriginalPosition;
  uniform float time;
  
  void main() {
    vec3 color = normalize( sin(vOriginalPosition)) * 0.5 + 0.5;
    gl_FragColor = vec4(color,1.0);
  }`
  
  const vertexShader: string = `
    uniform float time;
    uniform float explosion;
    attribute vec3 randomDirection;
    attribute float randomStrength;
    varying vec3 vOriginalPosition;
  
    void main () {
      vOriginalPosition = position.xyz;
      float stretch = time; 
      vec3 pos = position.xyz;
      pos += randomDirection * randomStrength * explosion;
      pos.xz *= sin(pos.y + stretch);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos.xyz, 1.0);
    }`
  
  // useUpdate allows me to do some of the initial sphere mesh setup imperatively
  const meshRef = useUpdate((currentMesh: THREE.Mesh<THREE.BufferGeometry>) => {
    const geometry  = currentMesh.geometry
    const positions = geometry.getAttribute('position')
    const vertexCount = positions.count
    const triangleCount = vertexCount / 3

    const randomDirections: number[] = []
    const randomStrengths: number[] = []
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

  const shadTest:IMaterialRef =  <shaderMaterial
  attach="material"
  args={[
    {
      vertexShader,
      fragmentShader,
      // uniforms: {
      //   explosion: 1,
      //   time: 0,
      // },
      uniforms: {
        explosion: { type: 'f', value: 1 },
        time: { type: 'f', value: 0 },
      },
      side: THREE.DoubleSide,
    },
  ]}
  // uniforms={
  //   explosion: { type: 'f', value: 1 },
  //   time: { type: 'f', value: 0 },
  // }
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
          args={[1, 5]
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
          // uniforms={
          //   explosion: { type: 'f', value: 1 },
          //   time: { type: 'f', value: 0 },
          // }
          ref={matRef}
        />
      </mesh>
    </>
  )
}

// don't do 3D things during ssr, check browser exists
const isBrowser = typeof window !== 'undefined'

export default function BreakingSphere({ userScale }:Props) {
  const [spherePosition, setPosition] = useState<[x: number, y: number, z: number] >([0, 0, 1])

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


