// Navabar script to show mobile menu
 
document.addEventListener('DOMContentLoaded', () => {
    const selectElement = (element) => document.querySelector(element);

    selectElement('.mobile-blog-menu').addEventListener("click", () => {
        selectElement('header').classList.toggle('active');
    });
});