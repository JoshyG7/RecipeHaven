let recipe=document.querySelector(".recipe");
let result=document.querySelector(".result span");
let search=document.querySelector(".search");
let box=document.querySelector(".box");
let loading=document.querySelector(".loading");
let showInfo=document.querySelector(".showInfo");
let information=document.querySelector(".information");
let infoName="cake";
let d;
box.style.visibility = "hidden";
function createInfo(){
    for(let i=0;i<d;i++){
        recipe.innerHTML+=`<div class="info">
                <img src="${data.meals[i].strMealThumb}" alt="There is no photo">
                <h1>${data.meals[i].strMeal}</h1>
                <p>${data.meals[i].strArea}</p>
                <button>VIEW Recipe</button>
            </div>`;
    }
    loading.style.visibility = "hidden";
    box.style.visibility = "visible";
    getclick();
}

const getInto=async()=>{
    loading.style.visibility = "visible";
    box.style.visibility = "hidden";
    try{
        searchUrl=`https://themealdb.com/api/json/v1/1/search.php?s=${infoName}`;
        let respone= await fetch(searchUrl);
        data=await respone.json();
        d=data.meals.length;
        result.innerText=data.meals.length; 
        console.log(d);
        recipe.innerHTML = '';
    }catch{
        alert("We don't have information about this Recipe.");
        loading.style.visibility = "hidden";
        box.style.visibility = "visible";
    }
    createInfo();
    }
getInto();

document.querySelector(".searchButton").addEventListener("click",()=>{
    infoName=search.value;
    search.value="";
    getInto();
})
search.addEventListener("keyup",(e)=>{
    if(e.keyCode===13){
        infoName=search.value;
        search.value="";
        getInto();
    }
})

function getclick() {
    let boxes=document.querySelectorAll(".info");
    boxes.forEach((box1,index)=>{
        box1.addEventListener("click",()=>{
            box.style.visibility = "hidden";
            showInfo.style.visibility = "visible";
            box.style.position = "fixed";

            information.querySelector(".strCategory span").innerText=data.meals[index].strCategory;
            information.querySelector(".strArea span").innerText=data.meals[index].strArea;
            information.querySelector(".strMeal").innerText=data.meals[index].strMeal;
            information.querySelector(".url").href=data.meals[index].strYoutube;
            information.querySelector(".strInstructions span").innerText=data.meals[index].strInstructions;
            information.querySelector("img").src=data.meals[index].strMealThumb;
        });
    });
}

showInfo.querySelector("h1").addEventListener("click",()=>{
    box.style.visibility = "visible";
    showInfo.style.visibility = "hidden";
    box.style.position = "static";
})