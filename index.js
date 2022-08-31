window.onload = function () {
    setTimeout(function () {
        window.scrollTo(0, 1);
    }, 0);
}
if (window.innerWidth > 500) {
    document.querySelector(".splashlogo").style.display = "none";
    document.querySelector(".error").style.display = "block";
} else {
    document.querySelector('.splash').style.animation = "splashfadeout 2s forwards";
}

const trigger = document.querySelector('.trigger');
const nav = document.querySelector('.full-screen-nav');
const backdrop = document.querySelector('.backdrop');

trigger.addEventListener('click', () => nav.classList.add('open-nav'));
backdrop.addEventListener('click', () => nav.classList.remove('open-nav'));

function categoryTrigger(category) {
    console.log(category)
    location.replace("./menu.html?category=" + category)

}