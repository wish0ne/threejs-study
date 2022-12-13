import * as THREE from "three";
import { DoubleSide } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

//Geometry 기본
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

  //camera control 추가
  const controls = new OrbitControls(camera, renderer.domElement);

  //mesh(geometry + material) 생성
  const geometry = new THREE.BoxGeometry(1, 1, 1, 16, 16, 16); //segment : mesh가 여러도형으로 쪼개짐
  //segement를 여러개로 쪼갤수록 vertex가 추가되는것 -> vertex들을 조절하면 geometry 자체가 바뀜
  const material = new THREE.MeshStandardMaterial({
    color: "seagreen",
    side: DoubleSide, //threejs 기본은 안쪽은 안보임. 설정하면 mesh 안쪽에 들어가도 볼수있음
    wireframe: true,
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  //AxesHelper
  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  //animation
  const clock = new THREE.Clock();
  function draw() {
    const delta = clock.getDelta();

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
