//свернуть-развернуть блоки-----------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
    const newsItems = document.querySelectorAll(".new");

    newsItems.forEach(function (newsItem) {
        const hiddenParagraphs = newsItem.querySelectorAll(".new__text");
        const moreButton = document.createElement("p");
        moreButton.className = "more";
        moreButton.textContent = "Читать далее";

        hiddenParagraphs.forEach(function (paragraph, index) {
            if (index >= 2) {
                paragraph.style.display = "none";
            }
        });

        moreButton.addEventListener("click", function () {
            hiddenParagraphs.forEach(function (paragraph, index) {
                if (index >= 2) {
                    paragraph.style.display = "block";
                }
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
            hiddenParagraphs.forEach(function (paragraph, index) {
                if (index >= 2) {
                    paragraph.style.display = "block";
                }
            });
            moreButton.style.display = "none";
            if (lessButton) {
                lessButton.style.display = "inline";
            }
            newsItem.style.marginBottom = "20px";
        }
    });
});


//перенос на след.страницу-------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
    const newsItems = document.querySelectorAll(".new");
    const newsLines = document.querySelectorAll(".news__line");
    const itemsPerPage = 5; // Количество блоков new на одной странице
    const pagination = document.querySelector(".pagination");
    const urlParams = new URLSearchParams(window.location.search);
    let currentPage = parseInt(urlParams.get("page")) || 1;
    let hasScrolledToHeader = false;

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
                history.replaceState(null, "", "?page=" + currentPage);

                // Выполняем плавную прокрутку до .for-slider при переключении страницы
                const forSliderElement = document.querySelector(".for-slider");
                const headerHeight = document.querySelector(".header").offsetHeight;
                const forSliderTop = forSliderElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                window.scrollTo({ top: forSliderTop, behavior: "smooth" });
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

    // Проверяем, откуда был выполнен переход на страницу новостей
    const referrer = document.referrer;
    const currentURL = window.location.href;
    if (referrer && !referrer.includes(currentURL)) {
        scrollToHeader();
    }

    window.addEventListener("scroll", function () {
        // Проверяем, было ли листание страницы новостей
        if (!hasScrolledToHeader && window.scrollY > newsItems[0].getBoundingClientRect().top) {
            scrollToHeader();
        }
    });
});
