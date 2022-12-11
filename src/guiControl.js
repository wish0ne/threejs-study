import * as THREE from "three";
import dat from "dat.gui";

//dat.gui 라이브러리를 이용한 GUI 컨트롤
export default function guiControl() {
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
  //여러개 조명추가 가능(너무 많으면 성능문제)
  scene.add(directionalLight);

  //mesh(geometry + material) 생성
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({
    //color:'0xff0000'
    //color:'#ff0000;'
    color: "seagreen",
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  //Dat GUI
  //javascript 객체의 속성값을 GUI로 조절할 수 있게 해줌
  const gui = new dat.GUI();
  //gui.add(mesh.position, "y", -5, 5, 0.01);
  gui.add(camera.position, "x", -10, 10, 0.01).name("카메라 x위치");
  gui.add(mesh.position, "z").min(-5).max(5).step(0.01).name("메쉬의 Z위치"); //method chain을 이용한 방법

  //그리기
  //디바이스에 따라 성능 차이 존재 -> 성능 안좋은 컴퓨터에서는 애니메이션이 버벅일 수 있음
  //디바이스 별로 1초에 30도 돌아갈수도 있고 60도 돌아갈수도 있음 -> 보정 필요
  //방법 1) getElapsedTIme 이용
  //방법 2) getDelta 이용
  //방법 3) 자바스크립트 객체 Date 이용
  const clock = new THREE.Clock();

  let oldTime = Date.now();
  function draw() {
    camera.lookAt(mesh.position);
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

    //mesh.position.y += delta;

    //if (mesh.position.y > 3) mesh.position.y = 0;

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
