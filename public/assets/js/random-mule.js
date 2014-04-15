// RandomMule.JS
// Author: Ansal
function getRandomNumber(min, max){
  return Math.floor(Math.random() * (max-min+1) + min);;
}
$('#reloadButton').on('click', function(e){
  e.preventDefault();
  var randomNum = getRandomNumber(1, 11);
  $('body').css('background', 'url(/assets/img/bg/' + randomNum + '.JPG) no-repeat top center scroll');
});