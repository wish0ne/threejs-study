import * as THREE from "three";

//rotation 회전
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

  //mesh(geometry + material) 생성
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({
    color: "seagreen",
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  //rotation
  //mesh.rotation.y = 1; //기본 단위는 radian
  //mesh.rotation.y = THREE.MathUtils.degToRad(45); //각도로 회전시키기
  //mesh.rotation.y = Math.PI / 4; //45도 회전

  //여러번 회전 시 주의사항
  //mesh.rotation.y = THREE.MathUtils.degToRad(45);
  //mesh.rotation.x = THREE.MathUtils.degToRad(45); //축은 회전하지 않았으므로 y축으로 45도 회전한 축이 아니라 x축을 기준으로 45도 회전하게됨

  //reorder()를 이용하면 어떤 축부터 회전시킬지 정할 수 있음
  mesh.rotation.reorder("YXZ");
  mesh.rotation.y = THREE.MathUtils.degToRad(45);
  mesh.rotation.x = THREE.MathUtils.degToRad(45); //축은 회전하지 않았으므로 y축으로 45도 회전한 축이 아니라

  //AxesHelper
  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  //animation
  const clock = new THREE.Clock();
  function draw() {
    const delta = clock.getDelta();
    //mesh.rotation.y += delta;

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
