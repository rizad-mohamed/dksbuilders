import * as THREE from './vendor/three.js';
export async function createStructuralStudy(container, initialPhase=1) {
 const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power',failIfMajorPerformanceCaveat:true});
 renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));
 renderer.setClearColor(0x000000,0);container.appendChild(renderer.domElement);
 const scene=new THREE.Scene();
 const camera=new THREE.PerspectiveCamera(38,1,.1,100);camera.position.set(9,7,10);camera.lookAt(0,1,0);
 const model=new THREE.Group();scene.add(model);
 const columnGeometry=new THREE.BoxGeometry(.12,1.45,.12);
 const beamGeometry=new THREE.BoxGeometry(6.2,.1,.1);
 const crossGeometry=new THREE.BoxGeometry(.1,.1,4.2);
 const slabGeometry=new THREE.BoxGeometry(6.2,.04,4.2);
 const wallGeometry=new THREE.BoxGeometry(6.15,1.4,.025);
 const structuralMaterial=new THREE.MeshStandardMaterial({color:0x94b9c6,metalness:.25,roughness:.55});
 const slabMaterial=new THREE.MeshStandardMaterial({color:0x577c8c,transparent:true,opacity:.7,side:THREE.DoubleSide});
 const wallMaterial=new THREE.MeshStandardMaterial({color:0xe3b85d,transparent:true,opacity:.18,side:THREE.DoubleSide,depthWrite:false});
 const foundationMaterial=new THREE.LineBasicMaterial({color:0xf3c66a});
 const frame=new THREE.Group();const enclosure=new THREE.Group();model.add(frame,enclosure);
 for(let floor=0;floor<3;floor++){
  const y=floor*1.5;
  for(const x of [-3,0,3])for(const z of [-2,0,2]){const mesh=new THREE.Mesh(columnGeometry,structuralMaterial);mesh.position.set(x,y+.72,z);frame.add(mesh);}
  for(const z of [-2,0,2]){const mesh=new THREE.Mesh(beamGeometry,structuralMaterial);mesh.position.set(0,y+1.5,z);frame.add(mesh);}
  for(const x of [-3,0,3]){const mesh=new THREE.Mesh(crossGeometry,structuralMaterial);mesh.position.set(x,y+1.5,0);frame.add(mesh);}
  const slab=new THREE.Mesh(slabGeometry,slabMaterial);slab.position.y=y+1.52;frame.add(slab);
  for(const z of [-2,2]){const wall=new THREE.Mesh(wallGeometry,wallMaterial);wall.position.set(0,y+.7,z);enclosure.add(wall);}
 }
 const footprint=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(6.2,.05,4.2)),foundationMaterial);model.add(footprint);
 const grid=new THREE.GridHelper(12,12,0x385664,0x2a424e);grid.position.y=-.04;scene.add(grid);
 scene.add(new THREE.HemisphereLight(0xe9f5ff,0x31434f,2.5));const light=new THREE.DirectionalLight(0xffdb93,2);light.position.set(6,9,5);scene.add(light);
 let targetX=0,targetY=-.12,visible=true,disposed=false,frameId=0;
 function resize(){const box=container.getBoundingClientRect();renderer.setSize(box.width,box.height,false);camera.aspect=box.width/box.height;camera.updateProjectionMatrix();render();}
 function render(){if(disposed||!visible||document.hidden)return;model.rotation.x=targetX;model.rotation.y=targetY;renderer.render(scene,camera);}
 function pointer(event){const b=container.getBoundingClientRect();targetY=((event.clientX-b.left)/b.width-.5)*.55-.12;targetX=((event.clientY-b.top)/b.height-.5)*.12;if(!frameId)frameId=requestAnimationFrame(()=>{frameId=0;render();});}
 function setPhase(value){frame.visible=value>0;enclosure.visible=value===2;render();}
 const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(container);
 const visibilityObserver=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;render();},{threshold:.05});visibilityObserver.observe(container);
 container.addEventListener('pointermove',pointer,{passive:true});
 function changedVisibility(){render();}document.addEventListener('visibilitychange',changedVisibility);
 function dispose(){if(disposed)return;disposed=true;cancelAnimationFrame(frameId);resizeObserver.disconnect();visibilityObserver.disconnect();container.removeEventListener('pointermove',pointer);document.removeEventListener('visibilitychange',changedVisibility);scene.traverse(object=>{object.geometry?.dispose();});[structuralMaterial,slabMaterial,wallMaterial,foundationMaterial].forEach(m=>m.dispose());renderer.dispose();renderer.forceContextLoss();renderer.domElement.remove();}
 renderer.domElement.addEventListener('webglcontextlost',event=>{event.preventDefault();dispose();container.closest('.structure-panel')?.classList.remove('three-ready');},{once:true});
 resize();setPhase(initialPhase);return {setPhase,dispose};
}
