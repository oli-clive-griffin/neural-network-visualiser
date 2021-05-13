import React from 'react'
import * as THREE from "three"
import { useEffect } from 'react';


export const Scene = () => {
  useEffect(() => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    const renderer = new THREE.WebGLRenderer()
    renderer.setSize( window.innerWidth, window.innerHeight )
    document.body.appendChild( renderer.domElement )

    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshStandardMaterial( { color: 0xd35a})
    const cube = new THREE.Mesh( geometry, material)
    scene.add( cube )

    const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
    scene.add( light );

    camera.position.z = 5
    
    const animate = () => {
      requestAnimationFrame( animate )

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render( scene, camera )
    }

    animate()
    
  }, [])

  return (
    <div/>
  )
}