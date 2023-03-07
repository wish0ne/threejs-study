import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// OrbitControls

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

  //Controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; //컨트롤 느낌을 부드럽게. draw 함수에서 update() 메서드 실행 필요
  // controls.enableZoom = false; //휠로 줌인/줌아웃 불가능
  controls.maxDistance = 10; // 최대 10까지만 멀어질 수 있음
  controls.minDistance = 5;
  controls.minPolarAngle = Math.PI / 4; //수직방향으로 회전하는 각도 제한
  controls.maxPolarAngle = THREE.MathUtils.degToRad(135);
  controls.target.set(2, 2, 2); //회전 중심점의 위치 설정
  controls.autoRotate = true; //자동 회전
  controls.autoRotateSpeed = 10; //자동 회전 속도

  //mesh(geometry + material) 생성
  const geometry = new THREE.BoxGeometry(1, 1, 1);
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
    scene.add(mesh);
  }

  //AxesHelper
  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  //animation
  const clock = new THREE.Clock();
  function draw() {
    const delta = clock.getDelta();

    controls.update();

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
