import footer from "./footer.js";
import nav from "./nav.js";

let a=document.querySelector("nav")
a.innerHTML=nav;
let b=document.querySelector("footer")
b.innerHTML=footer;


let container=document.getElementById("product-container");

let data = [];

let loaderImg = document.createElement("img");
loaderImg.setAttribute("class","loaderImg");
async function fetchdata(url="https://blog-data-ten.vercel.app/posts"){
  try{
    let loader = true;
    if(loader){
       loaderImg.src = "./1.jpg";
       container.innerHTML = null

       container.style.display = "block";
       container.append(loaderImg);
    }
    let res= await fetch(url);
    let x = await res.json()
    // data= res.data
    console.log(x)

    setTimeout(()=>{
      loader = false;
      if(!loader){
        container.innerHTML = null
        container.style.display = "grid";
        data = x;
       display(x);
      }
    },10)
    
  }
  catch(err){
    console.log(err)
  }
}

fetchdata()

let  sortData = document.getElementById("sortOrder");
sortData.addEventListener("change",sortFun);

function sortFun(){
    if(sortData.value==""){
        let url = "https://blog-data-ten.vercel.app/posts";
        fetchdata(url);
    }
    else if(sortData.value=="asc"){
        // console.log("ascendin g inside");
        let url = "https://blog-data-ten.vercel.app/posts?_sort=price&_order=asc";
        fetchdata(url);

    }
    else{
        if(sortData.value=="desc"){
          // console.log("descending");
        let url = "https://blog-data-ten.vercel.app/posts?_sort=price&_order=desc";
        fetchdata(url);

        }
    }
}


let formBet = document.getElementById("inBet");
let formSearch = document.getElementById("searchProd");

formSearch.addEventListener("submit",()=>{
event.preventDefault();
let x = formSearch.sInp.value;
if(x.value==""){
    let url = `https://blog-data-ten.vercel.app/posts`;
    fetchdata(url); 
}
let url = `https://blog-data-ten.vercel.app/posts?q=${x}`;
fetchdata(url);

})

formBet.addEventListener("submit",()=>{
event.preventDefault();
let lower = formBet.lower.value;
let higher = formBet.higher.value;
console.log(lower,higher);
let url = `https://blog-data-ten.vercel.app/posts?price_gte=${lower}&price_lte=${higher}`
fetchdata(url);
})

let filterby =document.getElementById("filter");
filterby.addEventListener("change", ()=>{
  if(filter.value === ""){
  display(data);
}
else{
  let filtered=data.filter((element)=>{
    if(filterby.value===element.category){
      return true;
    }
    else{
      return false;
    }
  })
  display(filtered);
}

})


let cartdata=JSON.parse(localStorage.getItem("cart"))||[]
function display(data){
  container.innerHTML="";
  data.forEach(element => {
    let Product=document.createElement("div");
    let img=document.createElement("img")
    let title=document.createElement("h2");
    let price=document.createElement("h3");
    let Description=document.createElement("p");
    let Category=document.createElement("p");
    let addToCart=document.createElement("button");
    // let wishlist=document.createElement("button")

    img.src=element.img;
    title.innerText=element.title;
    price.innerText=`₹${element.price}`;
    Description.innerText=element.description;
    Category.innerText=element.category;
    addToCart.innerText="Add To Cart";

    addToCart.addEventListener("click",()=>{
       if(check(element)){
        alert("Product Already in Cart")
       }
       else{
        cartdata.push({...element,quantity :1})
        localStorage.setItem("cart",JSON.stringify(cartdata));
        alert("Product Added To Cart");
       }
    })

  //   wishlist.addEventListener("click",()=>{
  //     if(check(element)){
  //      alert("Product Already in Cart")
  //     }
  //     else{
  //      cartdata.push({...element,quantity :1})
  //      localStorage.setItem("cart",JSON.stringify(cartdata));
  //      alert("Product Added To Cart");
  //     }
  //  })


    Product.append(img, title,price,Description, Category,addToCart)
    container.append(Product)
  });

}

function check(element){
  for(let i=0;i<cartdata.length;i++){
    if(element.id ===cartdata[i].id){
    return true;
  }
  }
 return false;
}