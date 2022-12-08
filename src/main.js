//entry 파일
import * as THREE from "three";

//동적으로 캔버스 조립하기
// const renderer = new THREE.WebGLRenderer(); //renderer 생성
// renderer.setSize(window.innerWidth, window.innerHeight); //renderer 크기 지정
// document.body.appendChild(renderer.domElement); //renderer canvas 삽입 1) body에 직접 삽입

//2) canvas 태그로 자리 잡아놓고 id로 삽입(추천)
const canvas = document.querySelector("#three-canvas");
//canvas 옵션 : renderer가 그려질 곳. dom element 지정. 없다면 새 canvas element가 생성됨
const renderer = new THREE.WebGLRenderer({ canvas: canvas }); //canvas를 만들어놓은 canvas태그로 지정
renderer.setSize(window.innerWidth, window.innerHeight); //renderer 크기 지정
