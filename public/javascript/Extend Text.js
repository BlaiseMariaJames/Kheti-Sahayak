let extendTexts = document.querySelectorAll(".extend");
let readMoreBtns = document.querySelectorAll(".read-more");
readMoreBtns.forEach((readMore, index) => {
    readMore.addEventListener("click", function () {
        this.style.display = 'none';
        extendTexts[index].classList.toggle("hide");
    });
});