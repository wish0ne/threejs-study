//entry 파일
import * as THREE from "three";

//동적으로 캔버스 조립하기
// const renderer = new THREE.WebGLRenderer(); //renderer 생성
// renderer.setSize(window.innerWidth, window.innerHeight); //renderer 크기 지정
// document.body.appendChild(renderer.domElement); //renderer canvas 삽입 1) body에 직접 삽입

//2) canvas 태그로 자리 잡아놓고 id로 삽입(추천)
const canvas = document.querySelector("#three-canvas");
//canvas 옵션 : renderer가 그려질 곳. dom element 지정. 없다면 새 canvas element가 생성됨
const renderer = new THREE.WebGLRenderer({
  canvas: canvas, //canvas를 만들어놓은 canvas태그로 지정
  antialias: true, //계단현상 방지
});
renderer.setSize(window.innerWidth, window.innerHeight); //renderer 크기 지정

//scene 생성
const scene = new THREE.Scene();

//camera 생성
//주로 perspective camera / orthographic camera 사용

//perspective camera : 원근 투영 사용. 사람의 눈으로 보는 방식을 모방하여 설계된 것으로 멀리있는건 작게, 가까이 있는건 크게 보임
//PerspectiveCamera( fov : Number, aspect : Number, near : Number, far : Number )
//fov — 카메라 절두체 수직 시야. (시야각)
//aspect — 카메라 절두체 종횡비. (가로 세로 비율)
//near — 카메라 절두체 근평면.
//far — 카메라 절두체 원평면.

//orthogonal camera (직교 카메라): 카메라와의 거리와 상관없이 크기가 유지
//OrthographicCamera( left : Number, right : Number, top : Number, bottom : Number, near : Number, far : Number )
// left — 카메라 절두체 좌평면.
// right — 카메라 절두체 우평면.
// top — 카메라 절두체 상평면.
// bottom — 카메라 절두체 하평면.
// near — 카메라 절두체 근평면.
// far — 카메라 절두체 원평면.

//perspective camera 생성
// const camera = new THREE.PerspectiveCamera(
//   75, //시야각
//   window.innerWidth / window.innerHeight, //종횡비
//   0.1, //near
//   1000 //far
// );

//orthogonal camera 생성
const camera = new THREE.OrthographicCamera(
  -(window.innerWidth / window.innerHeight), //left
  window.innerWidth / window.innerHeight, //right
  1, //top
  -1, //bottom
  0.1, //near
  1000 //far
);

//camera의 default 위치는 (0,0,0)
//camera 위치 설정 (약간 뒤로 빼줘야 물체가 잘 보임)
camera.position.x = 1;
camera.position.y = 2;
camera.position.z = 5; //단위는 물체에 따라서 생각하면 편함
camera.lookAt(0, 0, 0); //카메라가 (0,0,0)를 바라보게

//orthogonal camera에서 줌인, 줌아웃 효과를 주려면 z좌표를 바꾸는게 아니라 카메라 줌을 직접 수정해야함
camera.zoom = 0.5;
camera.updateProjectionMatrix(); //카메라 변경된 값을 적용

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

//mesh가 보이려면 renderer로 그려줘야함
renderer.render(scene, camera);
