// @ts-nocheck
"use client";

import * as THREE from 'three';
import { useRef, useState, useEffect, memo } from 'react';
import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber';
import {
  useFBO,
  MeshTransmissionMaterial,
  Text,
  Environment
} from '@react-three/drei';
import { easing } from 'maath';

export default function FluidGlass({ mode = 'lens', modeProps = {} }) {
  const Wrapper = Lens;

  return (
    <div className="w-full h-full pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 20], fov: 15 }} 
        gl={{ alpha: true }}
        eventSource={typeof window !== 'undefined' ? document.body : undefined}
        eventPrefix="client"
        style={{ pointerEvents: 'none' }}
      >
        <Environment preset="city" />
        <Wrapper modeProps={modeProps}>
          <HeroTypography />
        </Wrapper>
      </Canvas>
    </div>
  );
}

const ModeWrapper = memo(function ModeWrapper({
  children,
  geometryType,
  lockToBottom = false,
  followPointer = true,
  modeProps = {},
  ...props
}) {
  const ref = useRef();
  const buffer = useFBO();
  const { viewport: vp } = useThree();
  const [scene] = useState(() => new THREE.Scene());

  useFrame((state, delta) => {
    const { gl, viewport, pointer, camera } = state;
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);

    const destX = followPointer ? (pointer.x * v.width) / 2 : 0;
    const destY = lockToBottom ? -v.height / 2 + 0.2 : followPointer ? (pointer.y * v.height) / 2 : 0;
    
    if (ref.current) {
      easing.damp3(ref.current.position, [destX, destY, 15], 0.15, delta);
    }

    gl.setRenderTarget(buffer);
    gl.render(scene, camera);
    gl.setRenderTarget(null);
  });

  const { scale, ior, thickness, anisotropy, chromaticAberration, ...extraMat } = modeProps;

  return (
    <>
      {createPortal(children, scene)}
      {/* Background capture plane */}
      <mesh scale={[vp.width, vp.height, 1]} position={[0, 0, -5]}>
        <planeGeometry />
        <meshBasicMaterial map={buffer.texture} transparent opacity={0} />
      </mesh>
      
      {/* Refracting Glass Object */}
      <mesh ref={ref} scale={scale ?? 2} rotation-x={Math.PI / 2} {...props}>
        <cylinderGeometry args={[1, 1, 0.4, 64]} />
        <MeshTransmissionMaterial
          buffer={buffer.texture}
          ior={ior ?? 1.15}
          thickness={thickness ?? 5}
          anisotropy={anisotropy ?? 0.01}
          chromaticAberration={chromaticAberration ?? 0.1}
          roughness={0}
          transmission={1}
          {...extraMat}
        />
      </mesh>

      {/* Render the children normally so they are visible behind the glass too */}
      {children}
    </>
  );
});

function Lens({ modeProps, ...p }) {
  return <ModeWrapper geometryType="lens" followPointer modeProps={modeProps} {...p} />;
}

function HeroTypography() {
  const DEVICE = {
    mobile: { fontSize: 0.3 },
    tablet: { fontSize: 0.5 },
    desktop: { fontSize: 0.8 }
  };
  
  const getDevice = () => {
    if (typeof window === 'undefined') return 'desktop';
    const w = window.innerWidth;
    return w <= 639 ? 'mobile' : w <= 1023 ? 'tablet' : 'desktop';
  };

  const [device, setDevice] = useState(getDevice());

  useEffect(() => {
    const onResize = () => setDevice(getDevice());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const { fontSize } = DEVICE[device];

  return (
    <group position={[0, 0, 10]}>
      <Text
        position={[0, fontSize, 0]}
        fontSize={fontSize}
        letterSpacing={-0.05}
        outlineWidth={0}
        outlineBlur="20%"
        outlineColor="#000"
        outlineOpacity={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        I'm Ali Hamza
      </Text>
      <Text
        position={[0, -fontSize * 0.5, 0]}
        fontSize={fontSize * 0.4}
        letterSpacing={-0.02}
        color="#3b82f6"
        anchorX="center"
        anchorY="middle"
      >
        React Native Developer + AI Engineer
      </Text>
    </group>
  );
}
