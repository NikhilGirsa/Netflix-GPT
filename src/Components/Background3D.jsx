import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

const RotatingStars = () => {
  const group = useRef();
  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.x -= delta * 0.02;
      group.current.rotation.y -= delta * 0.03;
    }
  });

  return (
    <group ref={group}>
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
    </group>
  );
};

const Background3D = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 bg-gradient-to-b from-black via-purple-900/20 to-black overflow-hidden premium-bg">
      <div className="absolute inset-0 bg-black/40 z-0"></div>
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <ambientLight intensity={0.5} />
          <RotatingStars />
        </Canvas>
      </div>
    </div>
  );
};

export default Background3D;
