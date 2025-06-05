
//--------------------------------------- Элементы ----------------------------------------------------------------
const startGame = document.querySelector(".startGame");
const playBtn = document.querySelector("#play-btn");

const firstScene = document.querySelector(".first-scene");

const secondScene = document.querySelector(".second-scene");
const mattAndQuestionsElem = document.querySelector(".matt-and-questions");
const characterImg = document.querySelector("#matt-damons");
const questionsElem = document.querySelector(".questions");
const nextBtn = document.querySelector("#next-btn");

const thirdScene = document.querySelector(".third-scene");
const endScene = document.querySelector(".the-end");

//--------------------------------------- Аудио файлы -------------------------------------------------------------
const powerLossSound = new Audio("sounds/powerLoss.mp3");
const crashLoadingSound = new Audio("sounds/crashLanding.mp3");
const takeoffSound = new Audio("sounds/shipTakeoff.mp3");
const backgroundSound = new Audio("sounds/backgroundSound.mp3");
//--------------------------------------- механики игры ----------------------------------------------------------
let currentQuestion = 0;
let score = 0;

//---------------------------------------- реплики персонажей ----------------------------------------------------
const dialog = [
    {
        Matt: "Чёрт, не думал, что когда-нибудь снова увижу человека. Что случилось!?",
    },
    {
        Player:
            "Мы были на экспедиции по изучению космоса, но наш корабль дал сбой... Навигатор внезапно решил обновиться до Windows 95, и мы потеряли управление. Весь экипаж, включая капитана погибли... Выжил только я. От ударов мой скафандр потерял герметичность, и мой кислород уменьшается... похоже, мне осталось не долго.",
    },
    {
        Matt: " Мда, а я всегда знал, что Маки надёжнее.. Ладно, слушай сюда: У тебя мало времени. Хочешь выжить — отвечай на мои вопросы. Это проверка. За каждый правильный ответ я помогу тебе сделать шаг к спасению: починим скафандр, восстановим оборудование, выйдем на связь. Одно условие: Возьмёшь меня с собой, когда будешь улетать. Договор ?",
    },
];

const questions = [
    {
        question: "Твой скафандр повреждён. Что сделаешь в первую очередь?",
        options: [
            {
                text: "Использую ремонтный набор и герметик на основе полимера.",
                score: 1,
            },
            {
                text: "Обмотаю повреждённый участок изолентой и буду надеяться.",
                score: 0,
            },
            { text: "Сниму шлем — так легче дышать.", score: -1 },
        ],
    },
    {
        question: "Связь с Землёй отсутствует. Как её восстановить?",
        options: [
            {
                text: "Подключу аварийный передатчик к солнечным панелям и вручную настрою частоту.",
                score: 1,
            },
            { text: "Попробую громко кричать в небо.", score: 0 },
            { text: "Ударю по антенне монтировкой — может, поможет.", score: -1 },
        ],
    },
    {
        question: "Кислорода осталось мало. Как его восполнить?",
        options: [
            {
                text: "Найду модуль регенерации кислорода на старой базе NASA.",
                score: 1,
            },
            { text: "Попробую громко кричать в небо.", score: 0 },
            { text: "Ударю по антенне монтировкой — может, поможет.", score: -1 },
        ],
    },
    {
        question: "Без энергии ничего не работает. Как её добыть?",
        options: [
            { text: "Настрою переносную солнечную станцию.", score: 1 },
            { text: "Укушу аккумулятор — должно сработать.", score: 0 },
            { text: "Ударю по антенне монтировкой — может, поможет.", score: -1 },
        ],
    },
    {
        question: "Где ты найдёшь воду?",
        options: [
            {
                text: "Использую процессор для извлечения воды из марсианской почвы.",
                score: 1,
            },
            { text: "Растоплю лёд в тени скалы, если найду.", score: 0 },
            { text: "Выдавлю из растения, похожего на кактус.", score: -1 },
        ],
    },
    {
        question: "Без пищи ты долго не продержишься. Как поступишь?",
        options: [
            {
                text: "Начну выращивать картошку с помощью марсианской почвы и удобрений.",
                score: 1,
            },
            { text: "Попробую съесть запасы из скафандра Мэтта.", score: 0 },
            { text: "Поем пыль. В ней тоже что-то есть.", score: -1 },
        ],
    },
    {
        question: "Тебе нужно починить корабль. Где взять инструменты?",
        options: [
            {
                text: "Использую мастерскую на старом ровере, спрятанном в кратере.",
                score: 1,
            },
            { text: "Разберу свою антенну и сделаю из неё отвёртку", score: 0 },
            { text: "Рисую гаечный ключ на земле — может, появится.", score: -1 },
        ],
    },
    {
        question: "Обшивка корабля треснула. Как её восстановить?",
        options: [
            {
                text: "Использую термопластик с аварийной базы и сварю швы.",
                score: 1,
            },
            { text: "Заклею трещины изолентой и фольгой.", score: 0 },
            { text: "Закрою трещины коробками от еды.", score: -1 },
        ],
    },
    {
        question: "Как запустить корабль?",
        options: [
            {
                text: "Проведу тест запуска на холостом ходу и прогрею двигатель.",
                score: 1,
            },
            { text: "Просто нажму кнопку Пуск.", score: 0 },
            {
                text: "Вставлю флешку с Windows и надеюсь, что не зависнет снова.",
                score: -1,
            },
        ],
    },
    {
        question: "Всё готово. Последний шаг?",
        options: [
            {
                text: "Загрузить маршрут, синхронизировать с орбитой и взлететь.",
                score: 1,
            },
            { text: "Напоследок сфотографироваться.", score: 0 },
            { text: " Оставить записку для следующего выжившего.", score: -1 },
        ],
    },
];


// --------------------------------------------------- логика игры -----------------------------------------------



// Пролог 
nextBtn.addEventListener("click", () => {
    questionsElem.innerHTML = dialog[1].Player;
    characterImg.src = "image/cosmonaut.png";

    nextBtn.addEventListener("click", () => {
        questionsElem.innerHTML = dialog[2].Matt;
        characterImg.src = "image/Matt-Damon.png";
        nextBtn.textContent = "Конечно!";

        nextBtn.addEventListener("click", () => {
            questionsElem.innerHTML = questions[0].question;

            nextBtn.addEventListener("click", () => {
                questionsElem.innerHTML = questions[1].options[0].text;
            });
        });
    });
});

function startDialog() {
    questionsElem.innerHTML = dialog[0].Matt;
}
startDialog();

function showQuestions() {
    setTimeout(() => {
        characterImg.style.display = "block";
        mattAndQuestionsElem.style.display = "flex";
        mattAndQuestionsElem.style.justifyContent = "center";
        mattAndQuestionsElem.style.alignItems = "center";
        secondScene.style.display = "flex";
        secondScene.style.justifyContent = "center";
        secondScene.style.alignItems = "center";
        backgroundSound.play();
    }, 20000);
}

function showSecondScene() {
    setTimeout(() => {
        firstScene.style.display = "none";
        secondScene.style.display = "block";
        crashLoadingSound.play();
        showQuestions();
    }, 8000);
}

playBtn.addEventListener("click", () => {
    startGame.style.display = "none";
    firstScene.style.display = "block";
    powerLossSound.play();
    showSecondScene();
});


// Основная часть
nextBtn.addEventListener("click", startGameDialog);

function startGameDialog() {
    questionsElem.innerHTML = dialog[1].Player;
    characterImg.src = "image/cosmonaut.png";
    nextBtn.textContent = "Что дальше?";
    nextBtn.removeEventListener("click", startGameDialog);
    nextBtn.addEventListener("click", mattResponse);
}

function mattResponse() {
    questionsElem.innerHTML = dialog[2].Matt;
    characterImg.src = "image/Matt-Damon.png";
    nextBtn.textContent = "Конечно!";
    nextBtn.removeEventListener("click", mattResponse);
    nextBtn.addEventListener("click", showQuestion);
}

function showQuestion() {
    questionsElem.innerHTML = questions[currentQuestion].question;
    nextBtn.style.display = "none";

    const oldButtons = document.querySelectorAll(".answer-btn");
    oldButtons.forEach((btn) => btn.remove());

    questions[currentQuestion].options.forEach((option, index) => {
        const btn = document.createElement("button");
        btn.classList.add("answer-btn");
        btn.textContent = option.text;
        btn.style.display = "block";
        btn.style.marginTop = "10px";
        btn.style.padding = "10px";
        btn.style.backgroundColor = "#3f2d14";
        btn.style.color = "#fff";
        btn.style.border = "none";
        btn.style.borderRadius = "10px";
        btn.style.cursor = "pointer";

        btn.addEventListener("click", () => {
            score += option.score;

            currentQuestion++;

            if (currentQuestion < questions.length) {
                showQuestion();
            } else {
                endGame();
            }
        });

        questionsElem.appendChild(btn);
    });
}

// Эпилог 
function endGame() {

    let finalText = "";
    if (score >= 8) {
        finalText = "Вы выжили. Эвакуация прошла успешно.✅";
        mattAndQuestionsElem.innerHTML = finalText;


        function showLastScene() {
            setTimeout(() => {
                thirdScene.style.display = "none";
                endScene.style.display = "flex";
                backgroundSound.play();
            }, 40000);
        }

        setTimeout(() => {
            secondScene.style.display = "none";
            thirdScene.style.display = "block";
            takeoffSound.play();
            showLastScene();
            backgroundSound.pause();
        }, 4000);
    } else if (score >= 4) {
        finalText = "Вы будете жить. Но корабль восстановить не удалось";
        mattAndQuestionsElem.innerHTML = finalText;

        setTimeout(() => {
            secondScene.style.display = 'none'
            endScene.style.display = 'flex'
        }, 4000);


    } else {
        finalText = "Увы... Ты стал частью Марса. В буквальном смысле.💀";
        mattAndQuestionsElem.innerHTML = finalText;
        setTimeout(() => {
            secondScene.style.display = 'none'
            endScene.style.display = 'flex'
        }, 4000);
    }

    questionsElem.innerHTML += "<br>" + finalText;
}