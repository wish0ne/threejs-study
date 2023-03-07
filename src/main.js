import * as THREE from "three";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
import { KeyController } from "./KeyController";

// PointerLockControls + 키보드 컨트롤 (마인크래프트 스타일 컨트롤)

export default function main() {
  const canvas = document.querySelector("#three-canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas, //canvas를 만들어놓은 canvas태그로 지정
    antialias: true, //계단현상 방지
  });
  renderer.setSize(window.innerWidth, window.innerHeight); //renderer 크기 지정
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1); //고해상도 표현

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
  const ambientLight = new THREE.AmbientLight("white", 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1); //빛 색상, 강도
  directionalLight.position.x = 1;
  directionalLight.position.z = 2;
  scene.add(directionalLight);

  //mesh(geometry + material) 생성
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const meshes = [];
  let mesh;
  let material;
  for (let i = 0; i < 20; i++) {
    material = new THREE.MeshStandardMaterial({
      color: `rgb(
        ${50 + Math.floor(Math.random() * 205)}, 
        ${50 + Math.floor(Math.random() * 205)}, 
        ${50 + Math.floor(Math.random() * 205)}
      )`,
    });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = (Math.random() - 0.5) * 5;
    mesh.position.y = (Math.random() - 0.5) * 5;
    mesh.position.z = (Math.random() - 0.5) * 5;
    mesh.name = `box-${i}`;
    scene.add(mesh);
    meshes.push(mesh);
  }

  //Controls
  const controls = new PointerLockControls(camera, renderer.domElement);
  controls.domElement.addEventListener("click", () => {
    controls.lock();
  });
  controls.addEventListener("lock", () => {
    console.log("lock");
  });
  controls.addEventListener("unlock", () => {
    console.log("unlock");
  });

  // 키보드 컨트롤
  const keyController = new KeyController();

  function walk() {
    if (keyController.keys["KeyW"] || keyController.keys["ArrowUp"]) {
      controls.moveForward(0.02);
    }
    if (keyController.keys["KeyS"] || keyController.keys["ArrowDown"]) {
      controls.moveForward(-0.02);
    }
    if (keyController.keys["KeyA"] || keyController.keys["ArrowLeft"]) {
      controls.moveRight(-0.02);
    }
    if (keyController.keys["KeyD"] || keyController.keys["ArrowRight"]) {
      controls.moveRight(0.02);
    }
  }

  //AxesHelper
  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  //animation
  const clock = new THREE.Clock();
  function draw() {
    const delta = clock.getDelta();

    walk(); // 어떤 키를 눌렀는지 체크

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
