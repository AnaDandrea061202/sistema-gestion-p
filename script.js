

function setActive(el) {
    

const menu = document.querySelector('.menu');
    
    
    const currentActive = menu.querySelector('.menu-item.active');
    
    
    if (currentActive) {
        currentActive.classList.remove('active');
    }
    
    
    el.classList.add('active');
    
    
}


document.addEventListener('DOMContentLoaded', (event) => {
    const firstItem = document.querySelector('.menu-item');
    if (firstItem) {
        firstItem.classList.add('active');
    }
});