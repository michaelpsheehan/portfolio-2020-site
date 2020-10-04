// import ReactDOM from 'react-dom'
import * as THREE from 'three'
import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useUpdate } from 'react-three-fiber'
import { OrbitControls } from 'drei'

import useWindowSize from '../../../hooks/useWindowSize'

const Sphere = ({ spherePosition, userScale = 1.5 }) => {
  const [hovered, setHover] = useState(false)

  const geoRef = useRef()
  const matRef = useRef()

  // custom shaders to handle the geometry explosion effect and the fragment colour effect
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
      pos.xz *= sin(pos.y + stretch);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos.xyz, 1.0);
    }`

  const fragmentShader = `
    varying vec3 vOriginalPosition;
    uniform float time;
  
    void main() {
      vec3 color = normalize( sin(vOriginalPosition)) * 0.5 + 0.5;
      gl_FragColor = vec4(color,1.0);
    }`

  // useUpdate allows me to do some of the initial sphere mesh setup imperatively
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
  }, [])

  //  useFrame works similar to request animation frame and allows me to make updates at 60fps
  useFrame((frame) => {
    const { clock } = frame
    // update the uniforms on the shaders every second

    // the explosion value is different depending if the hovered state is true
    matRef.current.uniforms.explosion.value =
      Math.sin(clock.elapsedTime * 0.8 - Math.PI / 4) * (hovered ? 0.15 : 0.002)

    matRef.current.uniforms.time.value =
      (clock.elapsedTime * 0.8 - Math.PI / 4) * 0.2 + 0.2

    // only rotate the sphere automatically when it is not hovered
    if (!hovered) {
      meshRef.current.rotation.z += 0.0005
      meshRef.current.rotation.x += 0.0005
      meshRef.current.rotation.y += 0.003
    }
  })

  return (
    <>
      <mesh
        ref={meshRef}
        scale={[userScale, userScale, userScale]}
        onPointerOver={(e) => setHover(true)}
        onPointerOut={(e) => setHover(false)}
        // position={position ? position : [2, 0, 0]}
        position={spherePosition}
      >
        <icosahedronBufferGeometry
          attach="geometry"
          args={[1, 5]}
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
    const { width } = windowSize

    useEffect(() => {
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
          <Canvas camera={{fov: 70}}>
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
