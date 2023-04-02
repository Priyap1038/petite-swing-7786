import footer from "./footer.js";

// let a=document.querySelector("nav")
// a.innerHTML=nav;
let b=document.querySelector("footer")
b.innerHTML=footer;

let container=document.getElementById("cart-container");
    let cartdata=JSON.parse(localStorage.getItem("cart"))||[];

    function display(){
      container.innerHTML="";
      cartdata.forEach(element => {
     
        let Product=document.createElement("div");
        let img=document.createElement("img")
        let title=document.createElement("h2");
        let price=document.createElement("h3");
        let Description=document.createElement("p");
        let Category=document.createElement("p");

        let remove=document.createElement("button");
        let increament=document.createElement("button");
        let decreament=document.createElement("button");
        let quantity=document.createElement("span");


        img.src=element.img;
        title.innerText=element.title;
        price.innerText=`₹${element.price}`;
        Description.innerText=element.description;
        Category.innerText=element.category;
        quantity.innerText=element.quantity;
        
        remove.innerText="Remove";
        increament.innerText="+";
        decreament.innerText="-";

        remove.addEventListener("click",()=>{
         cartdata=cartdata.filter((ele)=>{
          return ele.id!==element.id;
        
         })  
         localStorage.setItem("cart",JSON.stringify(cartdata));
          display();
        
        })
        

        increament.addEventListener("click",()=>{
          element.quantity++;
          localStorage.setItem("cart",JSON.stringify(cartdata));
          display();
        })

        decreament.addEventListener("click",()=>{
          if(element.quantity > 1){
            element.quantity--;
            localStorage.setItem("cart", JSON.stringify(cartdata));
            display()
          }
         
        })

        Product.append(img, title,Description, Category,price,increament,quantity,decreament,remove)
        container.append(Product)
      });

      let total=document.getElementById("cart-total");
     let bag=0;
     for(let i=0;i<cartdata.length;i++){
        bag+=cartdata[i].quantity*cartdata[i].price;
     }
    
   

     if(bag===0){
        total.innerText="No items in cart";
     }
     else{
        total.innerText=`₹${bag}`;
     }

    }

    display();
