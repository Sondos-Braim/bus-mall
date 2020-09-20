'use strict';

var images = document.getElementById('images');
var firstImage = document.getElementById('first-image');
var secondImage = document.getElementById('second-image');
var thirdImage=document.getElementById('third-image');
var result=document.getElementById('result');

function Product(name, path) {
  this.name = name;
  this.path = path;
  this.votes=0;
  this.shown=0;
  Product.all.push(this);
}
var rounds=25;
Product.clicks=0;
Product.all = [];
console.log(Product.all);
new Product('bag', 'images/bag.jpg');
new Product('banana', 'images/banana.jpg');
new Product('bathroom', 'images/bathroom.jpg');
new Product('boots', 'images/boots.jpg');
new Product('breakfast', 'images/breakfast.jpg');
new Product('bubblegum', 'images/bubblegum.jpg');
new Product('chair', 'images/chair.jpg');
new Product('cthulhu', 'images/cthulhu.jpg');
new Product('dog-duck', 'images/dog-duck.jpg');
new Product('dragon', 'images/dragon.jpg');
new Product('pen', 'images/pen.jpg');
new Product('pet-sweep', 'images/pet-sweep.jpg');
new Product('scissors', 'images/scissors.jpg');
new Product('shark', 'images/shark.jpg');
new Product('sweep', 'images/sweep.png');
new Product('tauntaun', 'images/tauntaun.jpg');
new Product('unicorn', 'images/unicorn.jpg');
new Product('usb', 'images/usb.gif');
new Product('water-can', 'images/water-can.jpg');
new Product('wine-glass', 'images/wine-glass.jpg');

function render(){
  var leftImage=randomNumber(0,Product.all.length -1);
  var middleImage=randomNumber(0,Product.all.length -1);
  var rightImage=randomNumber(0,Product.all.length -1);
  while(leftImage===middleImage||leftImage===rightImage){
    leftImage=randomNumber(0,Product.all.length -1);
  }
  while(middleImage===rightImage){
    middleImage=randomNumber(0,Product.all.length -1);
  }
  firstImage.src = Product.all[leftImage].path;
  secondImage.src = Product.all[middleImage].path;
  thirdImage.src= Product.all[rightImage].path;
  firstImage.alt = Product.all[leftImage].name;
  secondImage.alt = Product.all[middleImage].name;
  thirdImage.alt = Product.all[rightImage].name;
  firstImage.title = Product.all[leftImage].name;
  secondImage.title = Product.all[middleImage].name;
  thirdImage.title = Product.all[rightImage].name;
  Product.all[leftImage].shown++;
  Product.all[middleImage].shown++;
  Product.all[rightImage].shown++;
}
images.addEventListener('click',clickHandler);
function clickHandler(event) {
  if(event.target.id !== 'images'){
    Product.clicks++;
    if(Product.clicks >=rounds) {
      images.removeEventListener('click', clickHandler);
      getResult();
    }
    for (let i = 0; i < Product.all.length; i++) {
      if(Product.all[i].name === event.target.title){
        Product.all[i].votes++;
      }
    }
    render();
  }
}
render();

//helper function
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min +1)) + min;
}

function getResult(){
  var ulEl=document.createElement('ul');
  result.appendChild(ulEl);
  for(var j=0;j<Product.all.length;j++){
    var a=`${Product.all[j].name} had ${Product.all[j].votes} votes, and was shown ${Product.all[j].shown} times.`;
    var liEl=document.createElement('li');
    ulEl.appendChild(liEl);
    liEl.textContent=a;
  }}

