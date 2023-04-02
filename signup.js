import footer from "./footer.js";
import nav from "./nav.js";

let a=document.querySelector("nav")
a.innerHTML=nav;

let b=document.querySelector("footer")
b.innerHTML=footer;


 
let form=document.querySelector("form");

let email=document.getElementById("email");
let password=document.getElementById("password");

let data=JSON.parse(localStorage.getItem("login"))||[];


let logindata=[]
form.addEventListener("submit",(e)=>{
    e.preventDefault();

let obj={ 
   email:email.value,
    password:password.value
}
 logindata.push(obj);
  localStorage.setItem("login",JSON.stringify(logindata));

})
