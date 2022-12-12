import * as THREE from "three";

//그룹 만들기 (Scene Graph)
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
  camera.position.x = 1;
  camera.position.y = 2;
  camera.position.z = 7;

  //scene에 camera 추가
  scene.add(camera);

  //light 추가
  const ambientLight = new THREE.AmbientLight("white", 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1); //빛 색상, 강도
  directionalLight.position.x = 1;
  directionalLight.position.z = 2;
  scene.add(directionalLight);

  //scene graph
  //그룹을 transform시키면 그룹안의 mesh들이 같이 변화
  //1번그룹(태양) 안에 2번그룹(지구) 안에 3번그룹(달)
  //1번그룹이 자전하면 2,3번 자동 공전, 2번그룹이 자전하면 3번 자동 공전, 3번그룹이 자전하면 혼자 자전

  //mesh(geometry + material) 생성
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({
    color: "hotpink",
  });

  const group1 = new THREE.Group();
  const box1 = new THREE.Mesh(geometry, material); //태양

  const group2 = new THREE.Group();
  //const box2 = new THREE.Mesh(geometry, material); //지구
  const box2 = box1.clone();
  box2.scale.set(0.3, 0.3, 0.3);
  group2.position.x = 2;

  //Group 대신 Object3D() 사용가능
  const group3 = new THREE.Object3D();
  const box3 = box2.clone();
  box3.scale.set(0.15, 0.15, 0.15);
  group3.position.x = 0.5;

  group3.add(box3);
  group2.add(box2, group3);
  group1.add(box1, group2);

  scene.add(group1);

  //AxesHelper
  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  //animation
  const clock = new THREE.Clock();
  function draw() {
    const delta = clock.getDelta();

    group1.rotation.y += delta;
    group2.rotation.y += delta;
    group3.rotation.y += delta;

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
