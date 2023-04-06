import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// 여러가지 텍스쳐가 적용된 큐브
export default function main() {
  //텍스쳐 이미지 로드
  const loadingManager = new THREE.LoadingManager();
  loadingManager.onStart = () => {
    console.log("로드 시작");
  };
  loadingManager.onProgress = (img) => {
    console.log(img + " 로드");
  };
  loadingManager.onLoad = () => {
    console.log("로드 완료");
  };
  loadingManager.onError = () => {
    console.log("에러");
  };
  const textureLoader = new THREE.TextureLoader(loadingManager);
  const rightTexture = textureLoader.load("/textures/mcstyle/right.png");
  const backTexture = textureLoader.load("/textures/mcstyle/back.png");
  const bottomTexture = textureLoader.load("/textures/mcstyle/bottom.png");
  const frontTexture = textureLoader.load("/textures/mcstyle/front.png");
  const topTextrue = textureLoader.load("/textures/mcstyle/top.png");
  const leftTexture = textureLoader.load("/textures/mcstyle/left.png");

  const materials = [
    new THREE.MeshBasicMaterial({
      map: rightTexture,
    }),
    new THREE.MeshBasicMaterial({
      map: leftTexture,
    }),
    new THREE.MeshBasicMaterial({
      map: topTextrue,
    }),
    new THREE.MeshBasicMaterial({
      map: bottomTexture,
    }),
    new THREE.MeshBasicMaterial({
      map: frontTexture,
    }),
    new THREE.MeshBasicMaterial({
      map: backTexture,
    }),
  ];

  //작은 픽셀 사이즈 작업할때 선명하게 보이게 하기 위함
  rightTexture.magFilter = THREE.NearestFilter;
  leftTexture.magFilter = THREE.NearestFilter;
  topTextrue.magFilter = THREE.NearestFilter;
  bottomTexture.magFilter = THREE.NearestFilter;
  backTexture.magFilter = THREE.NearestFilter;
  frontTexture.magFilter = THREE.NearestFilter;

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
  directionalLight.position.set(1, 1, 2);
  scene.add(directionalLight);

  //controls
  const controls = new OrbitControls(camera, renderer.domElement);

  //mesh(geometry + material) 생성
  const geometry = new THREE.BoxGeometry(2, 2, 2);

  const mesh = new THREE.Mesh(geometry, materials);
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
