'use strict';

var images = document.getElementById('images');
var leftIndex =-1;
var middleIndex=-1;
var rightIndex=-1;
var currentLeftImage;
var currentmiddleImage;
var currentrightImage;

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
//function to store the value
function updateVotes() {
  var productString = JSON.stringify(Product.all);
  localStorage.setItem('Products', productString);
}
//function for getting the stored value
function getVotes() {
  var productString = localStorage.getItem('Products');
  var productArray = JSON.parse(productString);
  if (productArray) {
    Product.all=productArray;
  }
}
console.log(Product.all);
//make new instances
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
var firstImage = document.getElementById('first-image');
var secondImage = document.getElementById('second-image');
var thirdImage=document.getElementById('third-image');
function contains(element, arr){
  for(var i = 0; i<arr.length; i++){
    if(arr[i] === element){
      return true;
    }
  }
  return false;
}
//make unique images
function render(){
  var displayedImages=[leftIndex,middleIndex,rightIndex];

  leftIndex=Math.floor((Math.random() * Product.all.length));
  middleIndex=Math.floor((Math.random() * Product.all.length));
  rightIndex=Math.floor((Math.random() * Product.all.length));

  //guarantee that each image in the row will not appear in the same row or the previous row
  //compare the left with the previous
  while(contains(leftIndex,displayedImages)){
    leftIndex = Math.floor((Math.random() * Product.all.length));
  }
  //compare the middle with the left and previous
  while(middleIndex===leftIndex || contains(middleIndex,displayedImages) ){
    middleIndex = Math.floor((Math.random() * Product.all.length));
  }
  //compare the right with the left and middle and previous
  while(rightIndex===leftIndex || rightIndex===middleIndex || rightIndex === contains(rightIndex,displayedImages)){
    rightIndex =Math.floor((Math.random() * Product.all.length));
  }
  displayRandomImages(leftIndex,middleIndex,rightIndex);
}
//display the images
function displayRandomImages(left,middle,right){
  currentLeftImage=Product.all[left];
  currentmiddleImage=Product.all[middle];
  currentrightImage=Product.all[right];

  currentLeftImage.shown++;
  currentmiddleImage.shown++;
  currentrightImage.shown++;

  firstImage.setAttribute('src',currentLeftImage.path);
  secondImage.setAttribute('src',currentmiddleImage.path);
  thirdImage.setAttribute('src',currentrightImage.path);
  firstImage.setAttribute('title',currentLeftImage.name);
  secondImage.setAttribute('title',currentmiddleImage.name);
  thirdImage.setAttribute('title',currentrightImage.name);
}
render();
//event listener
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
//add the chart
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
            'rgba(255, 99, 132)',
            'rgba(54, 162, 235)',
            'rgba(255, 206, 86)',
            'rgba(75, 192, 192)',
            'rgba(153, 102, 255)',
            'rgba(255, 159, 64)',
            'rgba(255, 99, 132)',
            'rgba(54, 162, 235)',
            'rgba(255, 206, 86)',
            'rgba(75, 192, 192)',
            'rgba(153, 102, 255)',
            'rgba(255, 159, 64)',
            'rgba(255, 99, 132)',
            'rgba(54, 162, 235)',
            'rgba(255, 206, 86)',
            'rgba(75, 192, 192)',
            'rgba(153, 102, 255)',
            'rgba(255, 159, 64)',
            'rgba(255, 99, 132)',
            'rgba(54, 162, 235)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
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
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
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

