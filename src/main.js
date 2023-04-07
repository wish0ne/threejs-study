import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import dat from "dat.gui";

// HemisphereLight
export default function main() {
  const canvas = document.querySelector("#three-canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas, //canvas를 만들어놓은 canvas태그로 지정
    antialias: true, //계단현상 방지
  });
  renderer.setSize(window.innerWidth, window.innerHeight); //renderer 크기 지정
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1); //고해상도 표현
  //그림자 설정
  renderer.shadowMap.enabled = true;
  //renderer.shadowMap.type = THREE.PCFShadowMap; //기본값
  //renderer.shadowMap.type = THREE.BasicShadowMap;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  //scene 생성
  const scene = new THREE.Scene();

  //perspective camera 생성
  const camera = new THREE.PerspectiveCamera(
    75, //시야각
    window.innerWidth / window.innerHeight, //종횡비
    0.1, //near
    1000 //far
  );

  //camera 위치 설정
  camera.position.y = 1;
  camera.position.z = 5;

  //scene에 camera 추가
  scene.add(camera);

  //light 추가
  // const ambientLight = new THREE.AmbientLight("white", 0.5);
  // scene.add(ambientLight);

  const light = new THREE.HemisphereLight("pink", "lime", 1);
  light.position.x = -5;
  light.position.y = 3;
  scene.add(light);

  const lightHelper = new THREE.HemisphereLightHelper(light);
  scene.add(lightHelper);

  //그림자 설정
  //light.castShadow = true; //그림자를 만들 수 있는 빛
  //그림자 해상도
  // light.shadow.mapSize.width = 1024; //기본값 512
  // light.shadow.mapSize.height = 1024;
  // light.shadow.camera.near = 1;
  // light.shadow.camera.far = 10;
  //light.shadow.radius = 5; //기본값인 THREE.PCFShadowMap에서만 적용

  //Controls
  const controls = new OrbitControls(camera, renderer.domElement);

  //Geometry
  const planeGeometry = new THREE.PlaneGeometry(10, 10);
  const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  const sphereGeometry = new THREE.SphereGeometry(0.7, 16, 16);

  //Material
  const material1 = new THREE.MeshStandardMaterial({ color: "white" });
  const material2 = new THREE.MeshStandardMaterial({ color: "white" });
  const material3 = new THREE.MeshStandardMaterial({ color: "white" });

  //Mesh
  const plane = new THREE.Mesh(planeGeometry, material1);
  const box = new THREE.Mesh(boxGeometry, material2);
  const sphere = new THREE.Mesh(sphereGeometry, material3);

  plane.rotation.x = Math.PI * -0.5;
  box.position.set(1, 1, 0);
  sphere.position.set(-1, 1, 0);

  //그림자 설정
  plane.receiveShadow = true;
  box.castShadow = true;
  box.receiveShadow = true;
  sphere.castShadow = true;
  sphere.receiveShadow = true;
  scene.add(plane, box, sphere);

  //AxesHelper
  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  //Dat GUI
  const gui = new dat.GUI();
  gui.add(light.position, "x", -5, 5);
  gui.add(light.position, "y", -5, 5);
  gui.add(light.position, "z", -5, 5);

  //animation
  const clock = new THREE.Clock();
  function draw() {
    //const delta = clock.getDelta();
    const time = clock.getElapsedTime();

    // light.position.x = Math.cos(time) * 5;
    // light.position.z = Math.sin(time) * 5;

    renderer.render(scene, camera);
    renderer.setAnimationLoop(draw);
  }

  //이벤트
  function setSize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    //카메라에 변화가 있을때 실행해줘야 반영됨
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight); //renderer 크기 지정
    renderer.render(scene, camera);
  }
  //window resize event 발생
  window.addEventListener("resize", setSize);

  draw();
}

main();
