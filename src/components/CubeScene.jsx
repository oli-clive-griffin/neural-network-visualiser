import React from 'react'
import * as THREE from "three"
import { useEffect } from 'react';

let testData = {
  nodes: [
    [1, 1, 1, 1],
    [1, 1, 1]
  ]
}
export const CubeScene = () => {

  useEffect(() => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    const renderer = new THREE.WebGLRenderer()
    renderer.setSize( window.innerWidth, window.innerHeight )
    document.body.appendChild( renderer.domElement )

    // const geometry = new THREE.BoxGeometry(1, 1, 1)
    // const material = new THREE.MeshStandardMaterial( { color: 0xd35a})
    // const cube = new THREE.Mesh( geometry, material)
    // scene.add( cube )

    // const cubes = []
    // for (let i = 0; i<2; i++) {
    //   let tempColor = Math.floor(Math.random()*16777215).toString(16)
    //   const geometry = new THREE.BoxGeometry(1, 1, 1)
    //   const material = new THREE.MeshStandardMaterial( { color: tempColor} )
    //   const cube = new THREE.Mesh( geometry, material)
    //   scene.add( cube )    
    // }


    // const geometry = new THREE.BoxGeometry(1, 1, 1)
    // const material = new THREE.MeshStandardMaterial( { color: tempColor} )

    let xDistance = 10;
    let zDistance = 10;
    let geometry = new THREE.BoxGeometry(1,1,1);
    let material = new THREE.MeshStandardMaterial({color:0x00ff44});

    //initial offset so does not start in middle.
    let xOffset = -1

    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 3; j++){
                let mesh  = new THREE.Mesh(geometry, material);
                mesh.position.x = (xDistance * i) + xOffset;
                mesh.position.y = (zDistance * j);
                scene.add(mesh);
        }
    };


    const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
    scene.add( light );

    camera.position.z = 100
    
    const animate = () => {
      requestAnimationFrame( animate )

      // cube.rotation.x += 0.01;
      // cube.rotation.y += 0.01;
      // cube.rotation.z += 0.01;


      renderer.render( scene, camera )
    }

    animate()
    
  }, [])

  return (
    <div/>
  )
}