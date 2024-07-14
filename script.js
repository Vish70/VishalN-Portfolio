// const scroll = new LocomotiveScroll({
//     el: document.querySelector('.section-container'),
//     smooth: true
// });



var anime = gsap.timeline({
    repeat:-1
})


anime
.to('.h2 p',{
    ease:Expo.easeInOut,
    stagger: 2,
    opacity: 1
},'a')

.to('.h2 p',{
    delay:2,
    ease:Expo.easeInOut,
    stagger: 2,
    opacity:0
},'a');


var anime2 = gsap.timeline({
    repeat:-1
})


anime2 
.to(".name-text h4",{
    ease:Expo.easeInOut,
    stagger:2,
    top:0
},"b")

.to(".name-text h4",{
    delay:2,
    ease:Expo.easeInOut,
    stagger:2,
    top: -80
},'b');



let skilldiv = document.querySelector('.skils');
let skillcard = document.querySelector('.skills-card');

skilldiv.addEventListener('mouseenter',function(){
   skillcard.style.display='block';
});

skilldiv.addEventListener('mouseleave',function(){
skillcard.style.display='none';
});

let skillist = document.querySelectorAll('.skil-list');

skillist.forEach(function(e){
    e.addEventListener('mouseenter',function(){
        let img = e.getAttribute('data-img');
        skillcard.style.backgroundImage = `url(${img})`;
    });
})

var work = document.querySelectorAll('.work');

var flag = 0;

work.forEach(function(e){
    e.addEventListener('click',function(){
        if(flag === 0){
            e.style.borderLeftColor = "red";
            flag = 0;
        }else{
            e.style.borderLeftColor = "transparent";
            flag = 1;
        }
        
    });
})

