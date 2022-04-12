const swiper = new Swiper(".mySwiper", {
    loop: true,
    effect: "cards",
    grabCursor: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    observer: true
});

function getDrinkList() {
    function setSwiperSlide(drink) {
        let slide = `
        <div class="swiper-slide" style="background:url(${drink.strDrinkThumb});">
            ${drink.strDrink}
        </div>
        `
        return slide
    }

    const wrapper = document.querySelector('.swiper-wrapper')
    const link = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic`

    fetch(link)
        .then((res) => res.json())
        .then((data) =>{
            data.drinks.forEach((drink) => {
                wrapper.innerHTML += setSwiperSlide(drink)
        })})
    swiper.loopDestroy()
    setTimeout(() => {
        swiper.loopCreate()
    }, 1000)
    swiper.activeIndex = 1
}

getDrinkList()