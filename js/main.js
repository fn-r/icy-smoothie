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
    observer: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
});

function getDrinkList() {
    function createElement(elem, classes = [], props = {}, ...styles) {
        const el = document.createElement(elem)
        classes.forEach(c => {el.className = c})
        
        for (prop in props) {
            el[prop] = props[prop]
        }

        styles.forEach(style => {
            style = style.split(": ")
            el.style[style[0]] = style[1]
        })
        return el
    }

    function setSwiperSlide(drink, i) {
        const els = [
            createElement('h3', ['drink-data-name'], {innerText: drink.strDrink}),
            createElement('p', ['drink-data-p']),
        ]

        const info = createElement('section', ['slide-info'])
        els.forEach(el => info.append(el))

        const slide = createElement('section', ['swiper-slide'], {},
            `background-image: url(${drink.strDrinkThumb}`,
            'background-size: cover')
        slide.append(info)
        return slide
    }

    const wrapper = document.querySelector('.swiper-wrapper')
    const link = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic`

    fetch(link)
        .then((res) => res.json())
        .then((data) => {
            data.drinks.forEach((drink) => {
                wrapper.append(setSwiperSlide(drink))
            })
        })
}

getDrinkList()

swiper.loopDestroy()
    setTimeout(() => {
        swiper.loopCreate()
    }, 1000)
    swiper.activeIndex = 1