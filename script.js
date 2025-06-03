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
    await sleep(700);
    changeEndGameColorsBack()
    await sleep(300);
    document.location.href = "./create.html";
});
button_to_play?.addEventListener("click", async e=>{
    document.body.classList.remove('fade-in');
    await sleep(700);
    changeEndGameColorsBack()
    await sleep(300);
    document.location.href = "./play.html";
});
home?.addEventListener("click", async e=>{
    document.body.classList.remove('fade-in');
    await sleep(700);
    changeEndGameColorsBack()
    await sleep(300);
    document.location.href = "./index.html";
});

window.onload = function() {
  document.body.classList.add('fade-in');
}

const textareas = document.querySelectorAll('textarea');

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("other-awnsers");
    const multChoiceRadio = document.getElementById("game-mult");

    if (!container || !multChoiceRadio) return;

    function animateContainer() {
        container.classList.remove("animate-show");
        void container.offsetWidth;
        container.classList.add("animate-show");
    }

    function createTextarea(index) {
        const ta = document.createElement("textarea");
        ta.className = "oneline animate-fade-in";
        ta.rows = 1;
        ta.id = `game-awnser-mult-${index}`;
        if (index != 0){
            ta.placeholder = "Write a new one";
        }

        const br = document.createElement("br");

        ta.addEventListener("keydown", e => {
            if (e.key === "Enter") e.preventDefault();
        });

        ta.addEventListener("input", () => {
            ta.value = ta.value.replace(/[\r\n]+/g, ' ');
            resizeTextarea(ta);
            handleDynamicTextareas();
        });

        ta.addEventListener("animationend", () => {
            ta.classList.remove("animate-fade-in");
        });

        container.appendChild(ta);
        container.appendChild(br);

        requestAnimationFrame(() => {
            ta.dispatchEvent(new Event("input"));
        });
    }

    function resizeTextarea(ta) {
        ta.style.height = 'auto';
        ta.style.height = `${ta.scrollHeight}px`;

        ta.style.width = 'auto';
        const scrollWidth = ta.scrollWidth + 4;
        const maxWidth = ta.parentElement?.clientWidth || window.innerWidth;
        ta.style.width = `${Math.min(Math.max(scrollWidth, 50), maxWidth)}px`;
    }

    function handleDynamicTextareas() {
        const all = container.querySelectorAll("textarea.oneline");
        const len = all.length;
        const last = all[len - 1];
        const secondLast = all[len - 2];

        if (last && last.value.trim() !== "" && len < 8) {
            createTextarea(len);
        }

        if (
            len > 1 &&
            last.value.trim() === "" &&
            secondLast.value.trim() === ""
        ) {
            const br = last.nextElementSibling;
            if (br?.tagName === "BR") container.removeChild(br);
            container.removeChild(last);
        }
    }

    function updateVisibility() {
        if (multChoiceRadio.checked) {
            container.removeAttribute("hidden");

            container.querySelectorAll("textarea.oneline").forEach(ta => {
                const br = ta.nextElementSibling;
                if (br?.tagName === "BR") br.remove();
                ta.remove();
            });

            animateContainer();
            createTextarea(0);
        } else {
            container.setAttribute("hidden", "");
            container.querySelectorAll("textarea.oneline").forEach(ta => {
                const br = ta.nextElementSibling;
                if (br?.tagName === "BR") br.remove();
                ta.remove();
            });
        }
    }

    document.querySelectorAll('input[name="game-choice"]').forEach(radio => {
        radio.addEventListener("change", updateVisibility);
    });

    updateVisibility();


    document.querySelectorAll("textarea.oneline").forEach(ta => {
        if (ta.closest("#other-awnsers")) return;

        ta.rows = 1;
        ta.addEventListener("keydown", e => {
            if (e.key === "Enter") e.preventDefault();
        });

        ta.addEventListener("input", () => {
            ta.value = ta.value.replace(/[\r\n]+/g, ' ');
            resizeTextarea(ta);
        });

        requestAnimationFrame(() => {
            ta.dispatchEvent(new Event("input"));
        });
    });

    document.querySelectorAll("textarea:not(.oneline)").forEach(ta => {
        ta.addEventListener("input", () => {
            ta.style.height = 'auto';
            ta.style.height = `${ta.scrollHeight}px`;
        });

        requestAnimationFrame(() => {
            ta.style.height = 'auto';
            ta.style.height = `${ta.scrollHeight}px`;
        });
    });

});

const game_create_button = document.getElementById("game-create-button");

game_create_button?.addEventListener("click",()=>{
    const questionText = document.getElementById("game-question")?.value ?? "";
    const answerText = document.getElementById("game-awnser-free")?.value ?? "";
    const gameMode = document.querySelector('input[name="game-choice"]:checked')?.id == "game-free";

    const wrongAnswers = Array.from(document.querySelectorAll('#other-awnsers textarea.oneline'))
    .map(ta => ta.value.trim())
    .filter(val => val !== "");

    const data = {
        question: questionText,
        created: new Date().toISOString(),
        freeGame: gameMode,
        answer: answerText,
        wrongAwnsers: wrongAnswers
    };

    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const guid = crypto.randomUUID();

    const a = document.createElement("a");
    a.href = url;
    a.download = `quizApp_game_${guid}.json`;
    a.click();

    URL.revokeObjectURL(url);
});

const uploadButton = document.getElementById("upload-quiz");
const fileInput = document.getElementById("quiz-file-input");
const questionDiv = document.getElementById("game-play-question");
const gamePlayTypeDiv = questionDiv.parentNode;

uploadButton.addEventListener("click", () => {
    fileInput.value = "";
    fileInput.click();
});

fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(event) {
        try {

            changeEndGameColorsBack()
            

            const data = JSON.parse(event.target.result);
            if (!data.question || !data.answer) throw "Missing fields.";

            questionDiv.textContent = data.question;
            while (questionDiv.nextSibling) {
                gamePlayTypeDiv.removeChild(questionDiv.nextSibling);
            }

            if (data.freeGame) {
                const input = document.createElement("textarea");
                input.className = "oneline";
                input.id = "game-play-free";
                input.rows = 1;
                input.placeholder = "Type your answer...";
                gamePlayTypeDiv.appendChild(input);

                const submit = document.createElement("div");
                submit.className = "button-to-go w-20";
                submit.textContent = "Submit Answer";
                gamePlayTypeDiv.appendChild(submit);

                submit.addEventListener("click", () => {
                    const userAnswer = input.value.trim();
                    endGame(userAnswer === data.answer, data.answer);
                });

            } else {
                const answers = [...data.awnsers, data.answer];
                const unique = [...new Set(answers)];
                const shuffled = unique.sort(() => Math.random() - 0.5);

                const container = document.createElement("div");
                container.id = "game-play-answers";
                container.className = "flex-center";
                container.style.flexWrap = "wrap";
                container.style.gap = "0px";
                container.style.marginTop = "20px";

                shuffled.forEach(ans => {
                    const btn = document.createElement("div");
                    btn.textContent = ans;
                    btn.className = "button-to-go";
                    btn.style.minWidth = "150px";
                    btn.style.maxWidth = "300px";
                    btn.style.width = "fit-content";
                    btn.style.whiteSpace = "normal";
                    btn.style.wordBreak = "break-word";
                    btn.style.margin = "8px";
                    btn.addEventListener("click", () => {
                        endGame(ans === data.answer, data.answer);
                    });
                    container.appendChild(btn);
                });

                gamePlayTypeDiv.appendChild(container);
            }

            uploadButton.disabled = true;
            uploadButton.style.display = "none";

        } catch (err) {
            alert("Invalid quiz file: " + err);
        }
    };
    reader.readAsText(file);
});

function endGame(correct, correctAnswer) {
    const result = document.createElement("div");
    result.style.marginTop = "20px";
    result.style.fontSize = "1.8rem";
    result.style.fontWeight = "bold";
    result.classList.add("result-animate");
    
    result.textContent = correct
        ? "🎉 Congratulations! You got it right!"
        : `❌ Wrong answer. The correct answer was: ${correctAnswer}`;
    const currentColor = correct ? "color-green" : "color-red";

    document.body.classList.add(currentColor);
    document.body.classList.forEach(cl => {
        if(cl.includes("color-") && cl != currentColor){
            document.body.classList.remove(cl);
        }
    });

    while (questionDiv.nextSibling) {
        gamePlayTypeDiv.removeChild(questionDiv.nextSibling);
    }
    gamePlayTypeDiv.appendChild(result);

    questionDiv.textContent = "";

    uploadButton.disabled = false;
    uploadButton.style.display = "block";
}

function changeEndGameColorsBack(){
    if(document.body.classList.contains("color-red") || document.body.classList.contains("color-green")){
        const color = localStorage.getItem("color");
        document.body.classList.add(color);
        document.body.classList.forEach(cl => {
            if(cl.includes("color-") && cl != color){
                document.body.classList.remove(cl);
            }
        });
    }
}