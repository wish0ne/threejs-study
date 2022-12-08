import * as THREE from "three";

//renderer, scene에 배경색&투명도 설정 가능
//우선순위는 scene > renderer
export default function backgroundColor() {
  const canvas = document.querySelector("#three-canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas, //canvas를 만들어놓은 canvas태그로 지정
    antialias: true, //계단현상 방지
    alpha: true, //배경 투명하게 설정
  });
  renderer.setSize(window.innerWidth, window.innerHeight); //renderer 크기 지정
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1); //고해상도 표현
  //배경색 설정
  renderer.setClearColor("#00ff00");
  //배경 투명도 특정 값으로 지정가능
  renderer.setClearAlpha(0.5); //0(투명)~1(불투명)

  //scene 생성
  const scene = new THREE.Scene();
  //scene 배경색 지정
  scene.background = new THREE.Color("blue");

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
  camera.position.z = 5;

  //scene에 camera 추가
  scene.add(camera);

  //mesh(geometry + material) 생성
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({
    //color:'0xff0000'
    //color:'#ff0000;'
    color: "red",
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  renderer.render(scene, camera);

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
}
