// Получаем все слайды и кнопки навигации
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentSlide = 0;
const slideInterval = 5000; // Интервал автоматического пролистывания (в миллисекундах)

// Функция для отображения текущего слайда и скрытия остальных
const showSlide = (slideIndex) => {
  slides.forEach((slide, index) => {
    if (index === slideIndex) {
      slide.style.display = 'block';
    } else {
      slide.style.display = 'none';
    }
  });
};

// Функция для переключения на предыдущий слайд
const goToPrevSlide = () => {
  currentSlide--;
  if (currentSlide < 0) {
    currentSlide = slides.length - 1;
  }
  showSlide(currentSlide);
};

// Функция для переключения на следующий слайд
const goToNextSlide = () => {
  currentSlide++;
  if (currentSlide === slides.length) {
    currentSlide = 0;
  }
  showSlide(currentSlide);
};

// Обработчики событий для кнопок навигации
prevBtn.addEventListener('click', goToPrevSlide);
nextBtn.addEventListener('click', goToNextSlide);

// Автоматическое пролистывание слайдов
setInterval(goToNextSlide, slideInterval);

// Показываем первый слайд при загрузке страницы
showSlide(currentSlide);

// В этом примере добавлены функции для автоматического пролистывания слайдов с помощью setInterval и для обработки событий нажатия на кнопки навигации. Переключение между слайдами осуществляется с помощью функций goToPrevSlide и goToNextSlide. Вы можете настроить интервал автоматического пролистывания путем изменения значения переменной slideInterval. Убедитесь, что кнопки навигации (prevBtn и nextBtn) соответствуют вашим HTML-элементам кнопок.