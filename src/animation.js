import * as THREE from "three";

//애니메이션은 window.requestAnimationFrame() 이용
//setInterval은 성능이슈가 있어서 빠르게 애니메이션 줄때 요즘은 다 requestAnimationFrame() 이용함
//repaint하기 전에 콜백함수를 매번 실행시켜줌
export default function animation() {
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

  //그리기
  //디바이스에 따라 성능 차이 존재 -> 성능 안좋은 컴퓨터에서는 애니메이션이 버벅일 수 있음
  //디바이스 별로 1초에 30도 돌아갈수도 있고 60도 돌아갈수도 있음 -> 보정 필요
  //방법 1) getElapsedTIme 이용
  //방법 2) getDelta 이용
  //방법 3) 자바스크립트 객체 Date 이용
  const clock = new THREE.Clock();

  let oldTime = Date.now();
  function draw() {
    //각도는 radian 이용 (360도 = 2파이)
    //mesh.rotation.y += 0.1;
    //mesh.rotation.y += THREE.MathUtils.degToRad(1); //도를 radiand으로 자동 변경해줌

    // clock을 이용하여 모든 디바이스에서 동일하게 회전하도록 보정
    //getElaspedTime과 getDelta 동시에 사용하면 에러 발생 (하나만 쓰자 )
    //const time = clock.getElapsedTime(); //경과된 시간 가짐(시간은 모든 디바이스에서 동일)
    const delta = clock.getDelta(); // draw가 호출되는 시간 간격
    //mesh.rotation.y = time; //방법 1
    //mesh.rotation.y += delta; //방법 2

    //방법 3
    const newTime = Date.now();
    const deltaTime = newTime - oldTime;
    oldTime = newTime;
    mesh.rotation.y += deltaTime * 0.001;

    mesh.position.y += delta;

    if (mesh.position.y > 3) mesh.position.y = 0;

    renderer.render(scene, camera);

    //둘 중 아무거나 사용해도 되는데 WebXR 프로젝트 개발 시에는 setAnimationLoop 사용해야함
    //window.requestAnimationFrame(draw);
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