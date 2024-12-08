'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'

function Model() {
  const { scene } = useGLTF('/avatar1.glb')
  return <primitive object={scene} scale={[1, 1, 1]} /> // Scale the model up
}

export default function Avatar3D() {
  return (
    <Canvas
      camera={{ position: [0, 1, 5], fov: 50 }} // Adjust camera for better framing
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Model />
        <OrbitControls enablePan={false} enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
      </Suspense>
    </Canvas>
  )
}
