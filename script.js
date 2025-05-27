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
const savedColor = localStorage.getItem('color');
if (savedColor){
    document.body.classList.add(savedColor);
}

const set_color_elements = document.getElementsByClassName("set-color");

for (let i = 0; i < set_color_elements.length; i++) {
    const element = set_color_elements[i];
    
    element.addEventListener("click", e=>{
        let svg;
        let color;
        if (e.target.tagName === "circle") {
            svg = e.target.closest("svg");
        }
        else{
            svg = e.target;
        }
        svg.classList.forEach(cl => {
            if(cl.includes("color-")){
                color = cl;
                localStorage.setItem('color',cl);
            }
        });

        document.body.classList.add(color);

        document.body.classList.forEach(cl => {
            if(cl.includes("color-") && cl != color){
                document.body.classList.remove(cl);
            }
        });

        
    });
    
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
    document.location.href = "./create.html";
});
button_to_play?.addEventListener("click", async e=>{
    document.body.classList.remove('fade-in');
    await sleep(1000);
    document.location.href = "./play.html";
});
home?.addEventListener("click", async e=>{
    document.body.classList.remove('fade-in');
    await sleep(1000);
    document.location.href = "./index.html";
});

window.onload = function() {
  document.body.classList.add('fade-in');
}

const textareas = document.querySelectorAll('textarea');

textareas.forEach(ta => {
    ta.style.height = `${ta.scrollHeight}px`;
    if(ta.classList.contains("oneline")){
        const measure = () => {
            ta.style.width = 'fit-content';
            const scrollWidth = ta.scrollWidth + 2;
            const maxWidth = ta.parentElement.clientWidth || window.innerWidth;
            ta.style.width = `${Math.min(scrollWidth, maxWidth)}px`;
        };

        ta.addEventListener('keydown', e => {
            if (e.key === 'Enter') e.preventDefault();
            measure();
        });
        
        ta.addEventListener('input', e => {
            ta.value = ta.value.replace(/[\r\n]+/g, ' ');
            measure();
        });
        measure();
    }
    else{
        ta.addEventListener("input",e=>{
            ta.style.height = 'auto';
            ta.style.height = `${ta.scrollHeight}px`;
        });
    }
    
});