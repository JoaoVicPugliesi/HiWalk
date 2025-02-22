import scroll from "../personal-1-scroll.js";

const parallax = () => {
    console.log('parallax');
    document.addEventListener('DOMContentLoaded', () => {
        const scenaries = document.querySelectorAll('.scenary');
        const aboutH3 = document.querySelector('.about-h3');
        const destinationsH3 = document.querySelector('.destinations-h3');
        const clouds1 = document.querySelectorAll('.cloud1');
        const clouds2 = document.querySelectorAll('.cloud2');
        const clouds3 = document.querySelectorAll('.cloud3');
        const sun = document.querySelector('.sun');
        


        scroll();
        window.addEventListener('scroll', function () {
            let value = window.scrollY;
            scenaries.forEach(scenary => {
                scenary.style.transform = `translateY(${value * 0.15 + '%'})`;
            });
            clouds1.forEach(clouds1 => {
                clouds1.style.transform = `translate(${value * 0.04 + '%'}, ${value * 0.10 + '%'})`;
            });
            clouds2.forEach(clouds2 => {
                clouds2.style.transform = `translate(${value * 0.03 + '%'}, ${value * 0.10 + '%'})`;
            });
            clouds3.forEach(clouds3 => {
                clouds3.style.transform = `translate(${value * 0.02 + '%'}, ${value * 0.10 + '%'})`;
            });
            sun.style.transform = `translateY(${value * 0.5 + '%'}`;
        });
    })
}

export default parallax;