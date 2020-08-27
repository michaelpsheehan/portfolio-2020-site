// import ReactDOM from 'react-dom'
import * as THREE from 'three'

import React, { useRef, useState, useEffect, useMemo } from 'react'
import {
  Canvas,
  useThree,
  useFrame,
  extend,
  useUpdate,
} from 'react-three-fiber'
import { OrbitControls, Html } from 'drei'
import { gsap } from 'gsap'
// import './style.css'
import { Controls, useControl } from 'react-three-gui'
import Button from '../../core/Button'
// const GROUP = 'Extra';
const Box = ({ position, userScale =1.5 }) => {
  const geoRef = useRef()
  const matRef = useRef()
  const cam = useRef()

  const [hovered, setHover] = useState(false)

  const vertexShader = `

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
    // Here we scale X and Z of the geometry by some modifier
    // pos.xz *= sin(pos.y + stretch);
    pos.xz *= sin(pos.y + stretch);
    // pos.y -=  sin(pos.y +  stretch);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos.xyz, 1.0);
  }
  `

  const fragmentShader = `
  varying vec3 vOriginalPosition;

  // void main () {
  //   vec3 color = normalize(vOriginalPosition) * 0.5 + 0.5;
    
  //   gl_FragColor = vec4(color, 1.0);
  // }

  uniform float time;


  
  void main() {
    // vec3 colorA = vec3(0.149,0.141,0.912);
    vec3 colorA = vec3(1,0,0);
  // vec3 colorB = vec3(1.000,0.833,0.224);
  // vec3 colorB = normalize(vOriginalPosition * cos(time)) * 0.5 + 0.5;
  vec3 colorB = normalize( sin(vOriginalPosition) * sin(time )) * 0.5 + 0.5;
  // vec3 colorB = vec3(num, num, num);


    vec3 color = vec3(0.0);

    // float pct = abs(sin(time));
    float pct = 0.9;

    // Mix uses pct (a value from 0-1) to
    // mix the two colors
    // color = mix(colorA, colorB, pct);
    color = mix(colorA, colorB, pct);

    gl_FragColor = vec4(colorB,1.0);
}
  
  `

  const meshRef = useUpdate((currentMesh) => {
    const { geometry } = currentMesh
    const positions = geometry.getAttribute('position')
    const vertexCount = positions.count
    const triangleCount = vertexCount / 3

    const randomDirections = []
    const randomStrengths = []
    for (let i = 0; i < triangleCount; i++) {
      // Get a random unit vector
      const dir = new THREE.Vector3(
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1
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
  },[])

  useFrame((frame) => {
    const start = hovered ? 0.2 : 3.2
    const end = hovered ? 3.2 : 0.2
    const speed = hovered ? 0.0000001 : 1

    const { clock } = frame
    // console.log('mesh ref --', meshRef)
    matRef.current.uniforms.explosion.value =
      Math.sin(clock.elapsedTime * 0.8 - Math.PI / 4) * (hovered ? 0.002 : 0.2)

    matRef.current.uniforms.time.value =
      (clock.elapsedTime * 0.8 - Math.PI / 4) * 0.2 + 0.2
    if (!hovered) {
      meshRef.current.rotation.z += 0.001
      meshRef.current.rotation.x += 0.001
      meshRef.current.rotation.y += 0.003
    }
  })

  return (
    <>
      <mesh
        ref={meshRef}
        uniforms={{
          explosion: { type: 'f', value: 1 },
          time: { type: 'f', value: 0 },
        }}
        scale={[userScale, userScale, userScale]}
        onPointerOver={(e) => setHover(true)}
        onPointerOut={(e) => setHover(false)}
        position={position ? position : [2, 0, 0]}
      >
        <icosahedronBufferGeometry
          attach="geometry"
          args={[1, 4]}
          ref={geoRef}
          uniforms={{
            explosion: { type: 'f', value: 1 },
            time: { type: 'f', value: 0 },
          }}
          vertexShader={vertexShader}
        />
        <shaderMaterial
          attach="material"
          color="hotpink"
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

const isBrowser = typeof window !== 'undefined'

export default function BreakingSphere({ userScale }) {
  return (
    <>
      {isBrowser && (
        <>
          <Canvas>
            <Box userScale={userScale} />
            <OrbitControls
              mouseButtons={{
                LEFT: THREE.MOUSE.ROTATE,
                MIDDLE: THREE.MOUSE.DOLLY,
                RIGHT: THREE.MOUSE.PAN,
              }}
              touches = {{
              	// ONE: THREE.TOUCH.ROTATE,
              	ONE: false,
              	TWO: THREE.TOUCH.ROTATE
              }}
              enableZoom={false}
            />
          </Canvas>
          {/* <Controls /> */}
        </>
      )}
    </>
  )
}
