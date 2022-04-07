// import { TimelineMax, CSSPlugin, ScrollToPlugin, Draggable } from "gsap/all";


let x = 0;
let change = 520;
let d = -400;
let counter = 11;
function slider(increment){
  if(increment == 100){
    if(counter%200 > 100){
      gsap.to("#stat", {duration: 1.2, x: -1450, scale: 0.4});
      gsap.to("#btn3", {duration: 2.1, rotation: 315, scale: 0.66});
      gsap.to("#btn3", {duration: 1.05, x: -1215});
      gsap.to("#btn3", {duration: 1.05, y: -225}).delay(1);
      gsap.set("#btn3", {background: "url(history.png)"}).delay(2.1);
    }else{
      gsap.to("#stat", {duration: 1.2, x: 0, scale: 1});
      gsap.to("#btn3", {duration: 2.1, rotation: 0, scale: 1});
      gsap.to("#btn3", {duration: 1.05, x: 0}).delay(1);
      gsap.to("#btn3", {duration: 1.05, y: 0});
      gsap.set("#btn3", {background: "url(X90p.png)"}).delay(2.1);
    }
  }else if(increment == 10){
    if(counter%20 > 10){
      gsap.to("#text-bg", {duration: 1.2, x: -450, scale: 0.4});
      gsap.to("#btn1", {duration: 2.1, rotation: 315, scale: 0.66});
      gsap.to("#btn1", {duration: 1.05, x: -275});
      gsap.to("#btn1", {duration: 1.05, y: -425}).delay(1);
      gsap.set("#btn1", {background: "url(I90p.png)"}).delay(2.1);
    }else{
      gsap.to("#text-bg", {duration: 1.2, x: 0, scale: 1});
      gsap.to("#btn1", {duration: 2.1, rotation: 0, scale: 1});
      gsap.to("#btn1", {duration: 1.05, x: 0}).delay(1);
      gsap.to("#btn1", {duration: 1.05, y: 0});
      gsap.set("#btn1", {background: "url(X90p.png)"}).delay(2.1);
    }
  }else if(increment=1){
    if(counter%2 == 1){
      gsap.to("#card-table", {duration: 1.2, x: -920, scale: 0.4});
      gsap.to("#btn2", {duration: 2.1, rotation: 315, scale: 0.66});
      gsap.to("#btn2", {duration: 1.05, x: -745});
      gsap.to("#btn2", {duration: 1.05, y: -325}).delay(1);
      gsap.set("#btn2", {background: "url(btn.png)"}).delay(2.1);
    }else{
      gsap.to("#card-table", {duration: 1.2, x: 0, scale: 1}).delay(1);
      gsap.to("#btn2", {duration: 2.1, rotation: 0, scale: 1});
      gsap.to("#btn2", {duration: 1.05, x: 0}).delay(1);
      gsap.to("#btn2", {duration: 1.05, y: 0});
      gsap.set("#btn2", {background: "url(X90p.png)"}).delay(2.1);
    }
  }
  counter += increment;
  x = counter;
  let a = x-x%100/100;
  let b = (x%100-(x%100)%10)/10;
  let c = x-100*a - 10*b;
  let u = [a,b,c];
  for (let i = 0; i<u.length; i++){
    if(u[i] == 3){
      u[i] =1;
    }
  }
  counter = 100*a + 10*b + c;
}
