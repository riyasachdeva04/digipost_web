// 'use client';

// import { Suspense } from 'react';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, useGLTF } from '@react-three/drei';

// function Model() {
//   const { scene } = useGLTF('/avatar.glb');
//   return <primitive object={scene} scale={[0.7, 0.7, 0.7]} />;
// }

// export default function Avatar3D() {
//   return (
//     <Canvas
//       camera={{ position: [0, 1, 3], fov: 50 }}
//     >
//       <Suspense fallback={null}>
//         <ambientLight intensity={1.5} />  // Further increased ambient light for more overall brightness
//         <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={2} />  // Further increased spot light intensity
//         <pointLight position={[-10, -10, -10]} intensity={1.5} />  // Increased point light intensity for stronger fill
//         <directionalLight position={[0, 10, 5]} intensity={1.5} /> // Added directional light for better front lighting
//         <Model />
//         <OrbitControls enablePan={false} enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
//       </Suspense>
//     </Canvas>
//   );
// }


// 'use client';

// import { Suspense } from 'react';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, useGLTF } from '@react-three/drei';

// function Model() {
//   const { scene } = useGLTF('/avatar.glb');
//   return <primitive object={scene} scale={[1.5, 1.5, 1.5]} />;
// }

// export default function Avatar3D() {
//   return (
//     <Canvas
//       camera={{ position: [0, 1, 7], fov: 60 }} // Updated camera settings
//       style={{ width: '100%', height: '100vh' }} // Canvas filling the viewport
//     >
//       <Suspense fallback={null}>
//         <ambientLight intensity={1.5} />
//         <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={2} />
//         <pointLight position={[-10, -10, -10]} intensity={1.5} />
//         <directionalLight position={[0, 10, 5]} intensity={1.5} />
//         <Model />
//         <OrbitControls enablePan={false} enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
//       </Suspense>
//     </Canvas>
//   );
// }

'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function Model() {
  const { scene } = useGLTF('/avatar.glb');
  return <primitive object={scene} scale={[4, 4, 4]}/>; // Increased scale for bigger avatar
}

export default function Avatar3D() {
  return (
    <Canvas
      camera={{ position: [-3, 2, 10], fov: 70 }} // Adjusted camera for better framing of the larger avatar
      style={{ width: '100%', height: '100vh' }} // Ensure the Canvas fits the viewport
    >
      <Suspense fallback={null}>
        <ambientLight intensity={1.5} /> // Good ambient light for brightness
        <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={2} /> // Adjusted spotlight for larger scale
        <pointLight position={[-10, -10, -10]} intensity={1.5} /> // Point light for additional illumination
        <directionalLight position={[0, 20, 10]} intensity={1.5} /> // Directional light adjusted for scale
        <Model />
        <OrbitControls enablePan={false} enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
      </Suspense>
    </Canvas>
  );
}
