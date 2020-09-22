'use strict';

var images = document.getElementById('images');
var firstImage = document.getElementById('first-image');
var secondImage = document.getElementById('second-image');
var thirdImage=document.getElementById('third-image');
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
function updateVotes() {
  var productString = JSON.stringify(Product.all);
  localStorage.setItem('Products', productString);
}

function getVotes() {

  var productString = localStorage.getItem('Products');
  var productArray = JSON.parse(productString);
  if (productArray) {
    Product.all=productArray;
  }
}
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
var threeImages=[];



function render(){
  var leftIndex=randomNumber(0,Product.all.length -1);
  var middleIndex=randomNumber(0,Product.all.length -1);
  var rightIndex=randomNumber(0,Product.all.length -1);
  threeImages.unshift(leftIndex);
  threeImages.unshift(middleIndex);
  threeImages.unshift(rightIndex);
  console.log(threeImages);
  while(threeImages[0]===threeImages[1]||threeImages[0]===threeImages[2]){
    threeImages[0]=randomNumber(0,Product.all.length -1);
  }
  while(threeImages[1]===threeImages[2]){
    threeImages[1]=randomNumber(0,Product.all.length -1);
  }
  while(threeImages[0]===threeImages[3]||threeImages[0]===threeImages[4]||threeImages[0]===threeImages[5]){
    threeImages[0]=randomNumber(0,Product.all.length -1);
  }
  while(threeImages[1]===threeImages[3]||threeImages[1]===threeImages[4]||threeImages[1]===threeImages[5]){
    threeImages[1]=randomNumber(0,Product.all.length -1);
  }
  while(threeImages[2]===threeImages[3]||threeImages[2]===threeImages[4]||threeImages[2]===threeImages[5]){
    threeImages[2]=randomNumber(0,Product.all.length -1);
  }

  firstImage.src = Product.all[threeImages[0]].path;
  secondImage.src = Product.all[threeImages[1]].path;
  thirdImage.src= Product.all[threeImages[2]].path;
  firstImage.alt = Product.all[threeImages[0]].name;
  secondImage.alt = Product.all[threeImages[1]].name;
  thirdImage.alt = Product.all[threeImages[2]].name;
  firstImage.title = Product.all[threeImages[0]].name;
  secondImage.title = Product.all[threeImages[1]].name;
  thirdImage.title = Product.all[threeImages[2]].name;
  Product.all[threeImages[0]].shown++;
  Product.all[threeImages[1]].shown++;
  Product.all[threeImages[2]].shown++;
}
images.addEventListener('click',clickHandler);
function clickHandler(event) {
  if(event.target.id !== 'images'){
    Product.clicks++;
    if(Product.clicks >=rounds) {
      images.removeEventListener('click', clickHandler);
      chart();
      updateVotes();
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
function chart() {
  var ctx = document.getElementById('myChart');
  const productNames = [];
  const votes = [];
  const shown=[];
  for (let i = 0; i < Product.all.length; i++) {
    productNames.push (Product.all[i].name);
    votes.push(Product.all[i].votes);
    shown.push(Product.all[i].shown);
  }
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels:productNames ,
      datasets: [
        {
          label: 'Votes',
          data: votes,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
        {
          label: 'shown',
          data: shown,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}
getVotes();

