let body = document.body;
window.addEventListener('load', (event) => {
  let a = document.querySelector('.row.row-cols-1.row-cols-sm-2.row-cols-md-4.g-3')
  let b = a.innerHTML
  for (let i = 0; i < 10; i++) {
    a.innerHTML += b;

  }
})
let weather = document.querySelector(".list");
let res = new XMLHttpRequest();

res.onreadystatechange =function (){
    
    console.log("debut fonction");
    if(this.status == 200 && this.readyState == XMLHttpRequest.DONE){
      let result = JSON.parse(this.responseText);
      console.log(result.book_list);
      weather.innerHTML = result.book_list;
    }else console.log("error");
  };

const askWeather = () =>{
  res.open("GET", "http://localhost:8000/books/list?page=1");
  res.send();
};

let butt = document.querySelector("button#list");

butt.addEventListener("click", askWeather);