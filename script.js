const button_dark_mode = document.getElementById("button-dark-mode");

button_dark_mode.addEventListener('click', e=>{
    toggleDarkMode();
});


const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') 
{
    document.body.classList.add('dark-mode');
}
else 
{
    document.body.classList.remove('dark-mode');
}

function toggleDarkMode(){
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) 
    {
        localStorage.setItem('theme', 'dark');
    } 
    else 
    {
        localStorage.setItem('theme', 'light');
    }
}

let lastMouseX = 0
let lastMouseY = 0;
let ticking = false;

function parallax(e) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    if (!ticking) {
        requestAnimationFrame(function() {
            updateParallax(mouseX, mouseY);
        });
        ticking = true;
    }

    lastMouseX = mouseX;
    lastMouseY = mouseY;
}

function updateParallax(mouseX, mouseY) {
    const elem = document.getElementsByClassName("main-header")[0];

    if (!elem) return;

    let _w = window.innerWidth / 2;
    let _h = window.innerHeight / 2;

    let _depth1 = (mouseX - _w) * 0.01;
    let _depth2 = (mouseX - _w) * 0.02;
    let _depth3 = (mouseX - _w) * 0.06;
    let _depth4 = (mouseX - _w) * 0.009;

    let _depth1Y = (mouseY - _h) * 0.01;
    let _depth2Y = (mouseY - _h) * 0.02;
    let _depth3Y = (mouseY - _h) * 0.06;
    let _depth4Y = (mouseY - _h) * 0.009;

    elem.style.transform = `translate(-50%, -50%) translate3d(${_depth4}px, ${_depth4Y}px, 0)`;

    ticking = false;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

document.addEventListener('mousemove', parallax);

const button_to_create = document.getElementById("button-to-create");
const button_to_play = document.getElementById("button-to-play");
const home = document.getElementById("home");

button_to_create?.addEventListener("click", async e=>{
    document.body.classList.remove('fade-in');
    await sleep(1000);
    document.location.href = "/create.html";
});
button_to_play?.addEventListener("click", async e=>{
    document.body.classList.remove('fade-in');
    await sleep(1000);
    document.location.href = "/play.html";
});
home?.addEventListener("click", async e=>{
    document.body.classList.remove('fade-in');
    await sleep(1000);
    document.location.href = "/index.html";
});

window.onload = function() {
  document.body.classList.add('fade-in');
}