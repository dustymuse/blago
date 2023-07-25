document.addEventListener("DOMContentLoaded", function () {
    const newsItems = document.querySelectorAll(".new");

    newsItems.forEach(function (newsItem) {
        const hiddenParagraphs = newsItem.querySelectorAll(".new__text");
        const moreButton = document.createElement("p");
        moreButton.className = "more";
        moreButton.textContent = "Читать далее";

        if (hiddenParagraphs.length <= 2) {
            hiddenParagraphs[hiddenParagraphs.length - 1].style.marginBottom = "0";
            moreButton.style.display = "none";
        } else {
            hiddenParagraphs.forEach(function (paragraph, index) {
                if (index >= 2) {
                    paragraph.style.display = "none";
                }
            });

            moreButton.addEventListener("click", function () {
                hiddenParagraphs.forEach(function (paragraph) {
                    paragraph.style.display = "block";
                });
                moreButton.style.display = "none";
                if (lessButton) {
                    lessButton.style.display = "inline";
                }
                newsItem.style.marginBottom = "20px"; // Добавляем margin-bottom при появлении кнопок
                localStorage.setItem(`news${newsItem.dataset.id}`, "true");
            });

            let lessButton = null;

            if (hiddenParagraphs.length > 2) {
                lessButton = document.createElement("p");
                lessButton.className = "less";
                lessButton.textContent = "Свернуть";
                lessButton.style.display = "none";

                lessButton.addEventListener("click", function () {
                    hiddenParagraphs.forEach(function (paragraph, index) {
                        if (index >= 2) {
                            paragraph.style.display = "none";
                        }
                    });
                    moreButton.style.display = "inline";
                    lessButton.style.display = "none";
                    newsItem.style.marginBottom = "0"; // Удаляем margin-bottom при скрытии кнопок
                    localStorage.setItem(`news${newsItem.dataset.id}`, "false");
                });

                newsItem.appendChild(lessButton);
            }

            newsItem.appendChild(moreButton);

            const isExpanded = localStorage.getItem(`news${newsItem.dataset.id}`) === "true";
            if (isExpanded) {
                hiddenParagraphs.forEach(function (paragraph) {
                    paragraph.style.display = "block";
                });
                moreButton.style.display = "none";
                if (lessButton) {
                    lessButton.style.display = "inline";
                }
                newsItem.style.marginBottom = "20px"; // Устанавливаем margin-bottom при загрузке, если текст развернут
            }
        }
    });
});
