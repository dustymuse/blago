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
                newsItem.style.marginBottom = "20px";
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
                    newsItem.style.marginBottom = "0";
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
                newsItem.style.marginBottom = "20px";
            }
        }
    });
});

//перенос на след.страницу-------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
    const newsItems = document.querySelectorAll(".new");
    const newsLines = document.querySelectorAll(".news__line");
    const itemsPerPage = 5; // Количество блоков new на одной странице
    const pagination = document.querySelector(".pagination");
    let currentPage = sessionStorage.getItem("currentPage") || 1;
    let scrollPosition = sessionStorage.getItem("scrollPosition") || 0;

    function showPage(pageNumber) {
        const startIndex = (pageNumber - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        newsItems.forEach(function (newsItem, index) {
            if (index >= startIndex && index < endIndex) {
                newsItem.style.display = "block";
                newsLines[index].style.display = "block";
            } else {
                newsItem.style.display = "none";
                newsLines[index].style.display = "none";
            }
        });

        // После отображения страницы прокручиваем к элементу с классом for-slider
        const forSlider = document.querySelector(".for-slider");
        forSlider.scrollIntoView({ behavior: "smooth" });
    }

    function updatePaginationButtons() {
        pagination.innerHTML = "";
        for (let i = 1; i <= Math.ceil(newsItems.length / itemsPerPage); i++) {
            const pageButton = document.createElement("button");
            pageButton.textContent = i;
            pageButton.className = "page-number";
            pageButton.dataset.page = i;

            if (i === parseInt(currentPage)) {
                pageButton.disabled = true;
                pageButton.classList.add("page-number_active");
            } else {
                pageButton.disabled = false;
                pageButton.classList.remove("page-number_active");
            }

            pageButton.addEventListener("click", function () {
                currentPage = i;
                showPage(currentPage);
                updatePaginationButtons();
                sessionStorage.setItem("currentPage", currentPage);
            });

            pagination.appendChild(pageButton);
        }
    }

    if (newsItems.length > itemsPerPage) {
        pagination.style.display = "block";
        showPage(currentPage);
        updatePaginationButtons();
    } else {
        pagination.style.display = "none";
    }
});

// Сохраняем текущую позицию страницы перед закрытием или переходом на другую страницу
window.addEventListener("beforeunload", function () {
    sessionStorage.setItem("scrollPosition", window.scrollY);
});

