const paragraphs = [
    "Virat Kohli is an indian international cricketer and the former captain of the Indian National Cricket Team.Widely regarded as one of the greatest batsman in the history of soprts, he plays for Royal Challengers Banglore in the IPL and Delhi in domastic cricket . Kohli holds numerous records in his career which includes scoring most runs in internationals and IPL ,fastest to reach 10,000 ODI runs .In 2020 , the international cricket council named him the male cricketer of the decade. Kohli has also contributed to india's successes ,including winning the 2011 World Cup and the 2013 champions trophy . He is amonng the only four indian cricketers who has played 500 matches for india.Born and raised in New Delhi ,Kohli trained at the west delhi cricket academy and started his youth career with the delhi under-15 team...",
    "Virat Kohli is an indian international cricketer and the former captain of the indian national cricket team.Widely regarded as one of the greatest batsman in the history of soprts, he plays for royal challengers banglore in the IPL and delhi in domastic cricket . Kohli holds numerous records in his career which includes scoring most runs in internationals and IPL ,fastest to reach 10,000 ODI runs .In 2020 , the international cricket council named him the male cricketer of the decade. Kohli has also contributed to india's successes ,including winning the 2011 World Cup and the 2013 champions trophy . He is amonng the only four indian cricketers who has played 500 matches for india . Born and raised in New Delhi ,Kohli trained at the west delhi cricket academy and started his youth career with the delhi under-15 team...",
    "Virat Kohli is an indian international cricketer and the former captain of the indian national cricket team.Widely regarded as one of the greatest batsman in the history of soprts, he plays for royal challengers banglore in the IPL and delhi in domastic cricket . Kohli holds numerous records in his career which includes scoring most runs in internationals and IPL ,fastest to reach 10,000 ODI runs .In 2020 , the international cricket council named him the male cricketer of the decade. Kohli has also contributed to india's successes ,including winning the 2011 World Cup and the 2013 champions trophy . He is amonng the only four indian cricketers who has played 500 matches for india .Born and raised in New Delhi ,Kohli trained at the west delhi cricket academy and started his youth career with the delhi under-15 team...",
    "Virat Kohli is an indian international cricketer and the former captain of the indian national cricket team.Widely regarded as one of the greatest batsman in the history of soprts, he plays for royal challengers banglore in the IPL and delhi in domastic cricket . Kohli holds numerous records in his career which includes scoring most runs in internationals and IPL ,fastest to reach 10,000 ODI runs .In 2020 , the international cricket council named him the male cricketer of the decade. Kohli has also contributed to india's successes ,including winning the 2011 World Cup and the 2013 champions trophy . He is amonng the only four indian cricketers who has played 500 matches for india .Born and raised in New Delhi ,Kohli trained at the west delhi cricket academy and started his youth career with the delhi under-15 team...",
];
const typingText = document.querySelector(".typing-text p"),
    inpField = document.querySelector(".wrapper .input-field"),
    tryAgainBtn = document.querySelector(".content button"),
    timeTag = document.querySelector(".timeLeft span b"),
    errorTag = document.querySelector(".errors span"),
    wpmTag = document.querySelector(".wpm span"),
    cpmTag = document.querySelector(".cpm span");

let timer,
    maxTime = 60,
    timeLeft = maxTime,
    charIndex = errors = isTyping = 0;

function loadParagraph() {
    const ranIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    paragraphs[ranIndex].split("").forEach(char => {
        let span = `<span>${char}</span>`
        typingText.innerHTML += span;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
    let characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if (charIndex < characters.length - 1 && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        if (typedChar == null) {
            if (charIndex > 0) {
                charIndex--;
                if (characters[charIndex].classList.contains("incorrect")) {
                    errors--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        } else {
            if (characters[charIndex].innerText == typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                errors++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");

        let wpm = Math.round(((charIndex - errors) / 5) / (maxTime - timeLeft) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;

        wpmTag.innerText = wpm;
        errorTag.innerText = errors;
        cpmTag.innerText = charIndex - errors;
    } else {
        clearInterval(timer);
        inpField.value = "";
    }
}

function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
        let wpm = Math.round(((charIndex - errors) / 5) / (maxTime - timeLeft) * 60);
        wpmTag.innerText = wpm;
    } else {
        clearInterval(timer);
    }
}

function resetTest() {
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = errors = isTyping = 0;
    inpField.value = "";
    timeTag.innerText = timeLeft;
    wpmTag.innerText = 0;
    errorTag.innerText = 3;
    cpmTag.innerText = 0;
}

loadParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetTest);