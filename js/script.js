import {items} from './itemApi.js';


const menucardHolder = document.querySelector('#menuContainer');
const filterBtnsHolder = document.querySelector('.menu-buttons');

window.addEventListener("DOMContentLoaded", function(){

   displayMenuItems(items);
    displayFilterBtns();
  
});

function displayMenuItems(menus){
    let displayItem =  menus.map((item)=>{
        return `<div class="menucard">
                <div class="row">
                    <div class="col-4">
                        <img src="${item.img}" class="item-img" alt="">
                    </div>
                    <div class="col-8 pl-1">
                        <h5 class="item-name">
                            <span id="item-name"> ${item.title} </span> 
                            <span class="price float-right">&#8377;${item.price}</span></h5>
                        <p class="item-description">
                            ${item.desc}
                        </p>
                    </div>
                </div>
            </div>`;
   });

   menucardHolder.innerHTML = displayItem.join('');
}

function displayFilterBtns(){
    const category = items.reduce(( values, item)=>{
        if(!values.includes(item.category)){
            values.push(item.category);
        }
        return values;
    },['all']);

   const catoButtons = category.map((cato)=>{
        return `
        <button class="filter-btn" data-category="${cato}">${cato}</button>
        `
    }).join('');
    filterBtnsHolder.innerHTML = catoButtons;

    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach((filter)=>{
        filter.addEventListener('click', ()=>{
            // console.log(filter.dataset.category);
            const menuFilter = items.filter((menuItems) =>{
                if(filter.dataset.category === menuItems.category){
                    return menuItems;
                }
            });
            if(filter.dataset.category == 'all'){
                return displayMenuItems(items);
            } else {
                return displayMenuItems(menuFilter);
            }
        })
    });
}