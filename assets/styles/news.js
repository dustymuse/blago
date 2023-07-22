//свернуть-развернуть-------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
    const newsItems = document.querySelectorAll(".new-more");

    newsItems.forEach(function (newsItem) {
        const moreButton = newsItem.querySelector(".more");
        const hiddenParagraphs = newsItem.querySelector(".hidden-paragraphs");
        const lessButton = newsItem.querySelector(".less");

        const isExpanded = localStorage.getItem(`news${newsItem.dataset.id}`) === "true";

        if (isExpanded) {
            hiddenParagraphs.style.display = "block";
            moreButton.style.display = "none";
        } else {
            hiddenParagraphs.style.display = "none";
            lessButton.style.display = "none";
        }

        moreButton.addEventListener("click", function () {
            hiddenParagraphs.style.display = "block";
            moreButton.style.display = "none";
            lessButton.style.display = "inline";
            localStorage.setItem(`news${newsItem.dataset.id}`, "true");
        });

        lessButton.addEventListener("click", function () {
            hiddenParagraphs.style.display = "none";
            moreButton.style.display = "inline";
            lessButton.style.display = "none";
            localStorage.setItem(`news${newsItem.dataset.id}`, "false");
        });
    });
});
