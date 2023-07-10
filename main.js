import{
    renderCategories,
    renderProducts,
    renderBasketItem,
}from './ui.js';

document.addEventListener('DOMContentLoaded',()=>{
    fetchCategories();
    fetchProducts();
})

const baseUrl='https://api.escuelajs.co/api/v1'

function fetchCategories(){
    fetch(`${baseUrl}/categories`)
    .then((res)=>res.json())
    .then((data)=>renderCategories(data))
    .catch((err)=>console.log(err))
}

let globalData=[]

function fetchProducts(){
    fetch(`${baseUrl}/products`)
    .then((res)=>res.json())
    .then((data)=>{
        globalData=data;
        renderProducts(data);
    })
    .catch((err)=>console.log(err))
    
}

let basket=[]
let total=0

const modal = document.querySelector('.modal-wrapper');
const sepetBtn = document.querySelector('#sepet-btn');
const closeBtn = document.querySelector('#close-btn');
const basketList=document.querySelector('.list')
const modalInfo=document.querySelector('.total-span')

document.body.addEventListener('click',(e)=>{
    if(e.target===sepetBtn){
        modal.classList.add('active')
        addList()
    }else if(e.target===closeBtn){
        modal.classList.remove('active')
        basketList.innerHTML=""
        total=0
        modalInfo.textContent=0
    }else if(e.target===modal){
        modal.classList.remove('active')
        basketList.innerHTML=""
        total=0
        modalInfo.textContent=0
    }
})



document.body.addEventListener('click',findItem)



function findItem(e){
    const ele=e.target;
    if(ele.id==='add-btn'){
        const selected=globalData.find((product)=>product.id==ele.dataset.id)
        if(!selected.amount){
            selected.amount=1
        }
        addToBasket(selected)
    } 
     if(ele.id==='del-btn'){
        ele.parentElement.remove()
        const selected=globalData.find((i)=>i.id==ele.dataset.id)
        deleteItem(selected)

     }
}

function addToBasket(product){
    const foundItem=basket.find((item)=>item.id==product.id)
    if(foundItem){
        foundItem.amount++
    }else{
        basket.push(product)
    }
    
}

function addList(){
    basket.forEach((product)=>{
        renderBasketItem(product)
        total+=product.price*product.amount
    })
    modalInfo.textContent=total
}


function deleteItem(deletingItem){
const filtreData=basket.filter((item)=>item.id!==deletingItem.id)
basket=filtreData
total-=deletingItem.price*deletingItem.amount
modalInfo.textContent=total
}
