// const scroll = new LocomotiveScroll({
//     el: document.querySelector('.section-container'),
//     smooth: true
// });






var anime = gsap.timeline({
  repeat: -1,
});

anime
  .to(
    ".h2 p",
    {
      ease: Expo.easeInOut,
      stagger: 2,
      opacity: 1,
    },
    "a"
  )

  .to(
    ".h2 p",
    {
      delay: 2,
      ease: Expo.easeInOut,
      stagger: 2,
      opacity: 0,
    },
    "a"
  );

var anime2 = gsap.timeline({
  repeat: -1,
});

anime2
  .to(
    ".name-text h4",
    {
      ease: Expo.easeInOut,
      stagger: 2,
      top: 0,
    },
    "b"
  )

  .to(
    ".name-text h4",
    {
      delay: 2,
      ease: Expo.easeInOut,
      stagger: 2,
      top: -80,
    },
    "b"
  );

let skilldiv = document.querySelector(".skils");
let skillcard = document.querySelector(".skills-card");

skilldiv.addEventListener("mouseenter", function () {
  skillcard.style.display = "block";
});

skilldiv.addEventListener("mouseleave", function () {
  skillcard.style.display = "none";
});

let skillist = document.querySelectorAll(".skil-list");

skillist.forEach(function (e) {
  e.addEventListener("mouseenter", function () {
    let img = e.getAttribute("data-img");
    // console.log(e);
    skillcard.style.backgroundImage = `url(${img})`;
  });
});



$('.menu_btn').click(function(){
  $('.navbar').css('left',"0px")
  $('.navbar-list').css('right',"0")
  $('.navbar').css('opacity',"1")
  $('.navbar-list').css('opacity',"1")
});


$('.span-x').click(function(){
  $('.navbar').css('left',"10000px",'opacity',"0")
  $('.navbar-list').css('right',"-1000px",'opacity',"0")
  $('.navbar').css('opacity',"0")
  $('.navbar-list').css('opacity',"0")
});


$('.navbar').click(function(){
    $('.navbar').css('left',"10000px",'opacity',"0")
    $('.navbar-list').css('right',"-1000px",'opacity',"0")
    $('.navbar').css('opacity',"0")
    $('.navbar-list').css('opacity',"0")
});


$(".work-project-sec a").click(function () {
  $(this).addClass("active");
  $(this).siblings().removeClass("active");
});


// var work = document.querySelectorAll('.work');
// var workdiv = document.querySelector('.work-div-img-content');
//

// work.forEach(function(e){
//     e.addEventListener('click',function(){
//         if(flag == 0){
//             workdiv.style.opacity = "1";
//             flag = 1;
//         }else{
//             workdiv.style.opacity = "0";
//             flag = 0;
//         }
//     });
// })
// $('').height();
// var flag = 0;

//    $('.work-img-content').css('height',0);



var div_1 = $(".work-div-img-content:nth-child(1)").height();
var div_2 = $(".work-img-content").height();


if (div_1 > div_2) {
  $(".work-img-content").addClass("addHeight");
  console.log('big');
}




$(".work-div-img-content:nth-child(1)").css("z-index", 3);
$(".work-div-img-content:nth-child(1)").siblings().css("z-index", 0);
$(".work-div-img-content:nth-child(2)").css("display", 'none');
$(".work-div-img-content:nth-child(3)").css("display", 'none');
$(".work-div-img-content:nth-child(1)").css("display", 'grid');


$(".project").click(function () {
  $(".work-div-img-content:nth-child(1)").addClass("active");
  $(".work-div-img-content:nth-child(1)").css("z-index", 3);
  $(".work-div-img-content:nth-child(1)").siblings().css("z-index", 0);
  $(".work-div-img-content:nth-child(2)").css("display", 'none');
  $(".work-div-img-content:nth-child(3)").css("display", 'none');
  $(".work-div-img-content:nth-child(1)").css("display", 'grid');

  var div1 = $(".work-div-img-content:nth-child(1)").height();
  var div2 = $(".work-img-content").height();

  if (div1 > div2) {
    $(".work-img-content").addClass("addHeight");
  } else if (div1 < div2) {
    $(".work-img-content").removeClass("addHeight");
  }

  $(".work-div-p p:nth-child(1)").css("z-index", 3);
  $(".work-div-p p:nth-child(1)").css("opacity", 1);
  $(".work-div-p p:nth-child(1)").siblings().css("z-index", 0);
  $(".work-div-p p:nth-child(2)").css("opacity", 0);
  $(".work-div-p p:nth-child(3)").css("opacity", 0);
});

$(".webd").click(function () {
  $(".work-div-img-content:nth-child(2)").addClass("active");
  $(".work-div-img-content:nth-child(2)").css("z-index", 3);
  $(".work-div-img-content:nth-child(2)").siblings().css("z-index", 0);
  $(".work-div-img-content:nth-child(1)").css("display", 'none');
  $(".work-div-img-content:nth-child(3)").css("display", 'none');
  $(".work-div-img-content:nth-child(2)").css("display", 'grid');

  $(".work-div-p p:nth-child(2)").css("z-index", 3);
  $(".work-div-p p:nth-child(2)").css("opacity", 1);
  $(".work-div-p p:nth-child(2)").siblings().css("z-index", 0);
  $(".work-div-p p:nth-child(1)").css("opacity", 0);
  $(".work-div-p p:nth-child(3)").css("opacity", 0);

  var div3 = $(".work-div-img-content:nth-child(2)").height();
  var div4 = $(".work-img-content").height();

  if (div3 > div4) {
    $(".work-img-content").addClass("addHeight");
  } else if (div3 < div4) {
    $(".work-img-content").removeClass("addHeight");
  }
});

$(".app").click(function () {
  $(".work-div-img-content:nth-child(3)").addClass("active");
  $(".work-div-img-content:nth-child(3)").css("z-index", 3);
  $(".work-div-img-content:nth-child(2)").css("display", 'none');
  $(".work-div-img-content:nth-child(1)").css("display", 'none');
  $(".work-div-img-content:nth-child(3)").siblings().css("z-index", 0);
  $(".work-div-img-content:nth-child(3)").css("display", 'grid');

  $(".work-div-p p:nth-child(3)").css("z-index", 3);
  $(".work-div-p p:nth-child(3)").css("opacity", 1);
  $(".work-div-p p:nth-child(3)").siblings().css("z-index", 0);
  $(".work-div-p p:nth-child(1)").css("opacity", 0);
  $(".work-div-p p:nth-child(2)").css("opacity", 0);

  var div5 = $(".work-div-img-content:nth-child(3)").height();
  var div6 = $(".work-img-content").height();

  if (div5 > div6) {
    $(".work-img-content").addClass("addHeight");
  } else if (div5 < div6) {
    $(".work-img-content").removeClass("addHeight");
  }
});
