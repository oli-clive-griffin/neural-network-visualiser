import React from 'react'
import * as THREE from "three"
import { useEffect } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

let testData = {
  nodes: [
    [1],
    [1, 1], 
    [1, 1, 1, 1], 
    [1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1],
    [1, 1, 1, 1, 1],
  ]
}

// TODO seperate into 2 functions: creating data, and then implimenting in three.js
const generateNodes = (shapeArr, width, height) => {
  let numOfLayers = shapeArr.length

  let geometry = new THREE.BoxGeometry(1,1,1);
  let material = new THREE.MeshStandardMaterial({color:0x00ff00});

  const nodes = new THREE.Group();
  for(let i = 0; i < numOfLayers; i++){

    let numOfNodes = shapeArr[i].length
    console.log("nodes in layer: ", numOfNodes);

    for(let j = 0; j < numOfNodes; j++){
      let mesh  = new THREE.Mesh(geometry, material);

      // using "+1" so that the nodes are center-justified within the width and height, 
      // as in the CSS flex rule "justify-content: space-evenly"
      mesh.position.x = (width / (numOfLayers + 1)) * (i + 1);
      mesh.position.y = (height / (numOfNodes + 1)) * (j + 1);

      //offset so that the group has it's origin at it's geometric centre (roughly)
      mesh.position.x = mesh.position.x - width/2 
      mesh.position.y = mesh.position.y - height/2

      nodes.add(mesh)
    }
  };

  console.log(nodes);

  return nodes
}


export const CubeScene = () => {

  useEffect(() => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.1, 1000 );
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize( window.innerWidth, window.innerHeight )
    document.body.appendChild( renderer.domElement )

    // render reference reticle
    let geometry = new THREE.BoxGeometry(0.3, 3, 0.3);
    let material = new THREE.MeshStandardMaterial({color: 0xFF0000});
    let mesh  = new THREE.Mesh(geometry, material);
    mesh.name = "testcube"
    scene.add(mesh)

    // Render nodes from test data
    let nodeMap = testData.nodes
    scene.add(generateNodes(nodeMap, 50, 20))

    const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );

    const controls = new OrbitControls( camera, renderer.domElement );

    
    scene.add( light );

    camera.position.z = 50

    
    const animate = () => {
      requestAnimationFrame( animate )
      renderer.render( scene, camera )
    }

    animate()

    console.log(scene);
    
  }, [])



  return (
    <div/>
  )
}