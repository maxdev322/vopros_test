window.onload = function () {

    // Marquee3k.init();

    // function hidePreloader() {
    //     window.scrollTo(0, 0);
    // }

    // setTimeout(() => {
    //     hidePreloader();
    // }, 0);

    const lenis = new Lenis({
        duration: 1.7, // продолжительность анимации прокрутки (по умолчанию 1)
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // можно использовать свою функцию easing
        smoothWheel: true, // плавная прокрутка колесом мыши
        smoothTouch: true, // плавная прокрутка при использовании touch
        gestureOrientation: 'vertical', // направление прокрутки
        infinite: false // если true, позволяет бесконечную прокрутку
    })

//      // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
// lenis.on('scroll', ScrollTrigger.update);

// // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
// // This ensures Lenis's smooth scroll animation updates on each GSAP tick
// gsap.ticker.add((time) => {
//   lenis.raf(time * 1000); // Convert time from seconds to milliseconds
// });

// // Disable lag smoothing in GSAP to prevent any delay in scroll animations
// gsap.ticker.lagSmoothing(0);

    lenis.on('scroll', (e) => {
        console.log(e)
    })

    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Начните новую прокрутку без полной остановки
                lenis.scrollTo(targetElement, {
                    offset: 0, // Настройте отступ по необходимости
                    duration: 1.5, // Длительность прокрутки
                    immediate: false // Плавный скролл
                });
            }
        });
    });


    const canvas = document.getElementById('animationCanvas');
    const context = canvas.getContext('2d');

    const frameCount = 200;
    const frames = [];
    let currentFrame = 0;
    let imagesLoaded = 0;

    const loadingImage = document.getElementById('loadingImage'); // Захватываем изображение

    // Загружаем все изображения для анимации логотипа
    for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        img.src = `./img/logo_wp/${String(i).padStart(4, '0')}.webp`;
        img.onload = () => {
            imagesLoaded++;

            if (imagesLoaded === frameCount / 4) {
                gsap.timeline()
                    .to(loadingImage, {
                        opacity: 0,
                        duration: 0.6,
                        ease: 'power2.inOut',
                    })
                    .to('#preloader', {
                        y: '-100%', // Прелоадер уезжает вверх
                        duration: 0.8,
                        ease: 'power2.inOut',
                        onComplete: () => {
                            document.getElementById('preloader').style.display = 'none'; // Убираем прелоадер из DOM после анимации
                        }
                    }, '+=0.1'); // Задержка 0.3 секунды перед анимацией прелоадера
            }
        };
        frames.push(img);
    }

    // Функция обновления кадров анимации логотипа
    function updateFrame() {
        currentFrame = (currentFrame + 1) % frameCount;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(frames[currentFrame], 0, 0, canvas.width, canvas.height);
    }

    // Запускаем анимацию логотипа
    setInterval(updateFrame, 1000 / 60);

    // Регистрация ScrollTrigger для GSAP (если нужно для будущих целей)
    gsap.registerPlugin(ScrollTrigger);

    // Переменная для хранения предыдущей позиции скролла
    let lastScrollTop = 0;
    const header = document.querySelector('.header');

    // Добавляем слушатель на событие скролла
    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Если скролл идет вниз, прячем хедер
        if (!menuOpen & scrollTop > lastScrollTop) {
            gsap.to(header, { duration: 0.8, y: '-100%' });
        }
        // Если скролл вверх, показываем хедер
        else {
            gsap.to(header, { duration: 0.8, y: '0%' });
        }

        // Обновляем позицию последнего скролла
        lastScrollTop = scrollTop;
    });

    const burgerMenu = document.getElementById('burger-menu');
    const mobileNav = document.getElementById('mobile-nav');
    const menuInner = document.getElementById('burger_inner_text');
    const menuLinks = document.getElementsByClassName('mobile-nav__link');
    let menuOpen = false;

    console.log(menuLinks);

    for (let link of menuLinks) {
        link.addEventListener('click', () => {
            // Анимация закрытия меню
            gsap.to(mobileNav, { duration: 1.2, x: '100%', ease: 'power4.inOut', onComplete: () => menuOpen = false });
            menuInner.innerHTML = "Меню";
            menuInner.classList.remove("menu_open");
        });
    }

    // Добавляем обработчик событий для иконки бургера
    burgerMenu.addEventListener('click', () => {
        if (!menuOpen) {
            // Анимация открытия меню
            gsap.to(mobileNav, { duration: 1.2, x: '0%', ease: 'power4.inOut', onComplete: () => menuOpen = true });
            menuInner.innerHTML = "Закрыть";
            menuInner.classList.add("menu_open");
            // menuOpen = true;
        } else {
            // Анимация закрытия меню
            gsap.to(mobileNav, { duration: 1.2, x: '100%', ease: 'power4.inOut', onComplete: () => menuOpen = false });
            menuInner.innerHTML = "Меню";
            menuInner.classList.remove("menu_open");
            // menuOpen = false;
        }
    });


    gsap.to('.marquee_line_wrap', {
        x: '-2%',
        ease: 'none',
        scrollTrigger: {
            trigger: '.marquee_line_wrap',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            // markers: true,
        },
    });

    let canvWidth = canvas.offsetWidth;
    let canvHalfWidth = canvas.offsetWidth / 2;

    gsap.set('#animationCanvas', {
        opacity: '100%',
        height: canvWidth,
        width: canvWidth,
        'webkitFilter': 'blur(0rem)',
    })

    gsap.fromTo('#animationCanvas', {
        opacity: '100%',
        height: canvWidth,
        width: canvWidth,
        'webkitFilter': 'blur(0rem)',
    }, {
        opacity: '50%',
        height: canvHalfWidth,
        width: canvHalfWidth,
        'webkitFilter': 'blur(0.4rem)',
        scrollTrigger: {
            trigger: '.about',
            start: 'top bottom',
            end: 'bottom center',
            scrub: true,
            // markers: true,
        },
    });

    gsap.set('#animationCanvas', {
        opacity: '50%',
        height: canvHalfWidth,
        width: canvHalfWidth,
        'webkitFilter': 'blur(0.4rem)',
    })

    gsap.fromTo('#animationCanvas', {
        opacity: '50%',
        height: canvHalfWidth,
        width: canvHalfWidth,
        ease: 'power1.in',
        'webkitFilter': 'blur(0.4rem)',
    }, {
        opacity: '100%',
        height: canvWidth,
        width: canvWidth,
        'webkitFilter': 'blur(0rem)',
        ease: 'power1.in',
        scrollTrigger: {
            trigger: '.footer',
            start: '-100% bottom',
            end: 'bottom bottom',
            scrub: true,
            // markers: true,
        },
    });

    gsap.set('#animationCanvas', {
        opacity: '100%',
        height: canvWidth,
        width: canvWidth,
        'webkitFilter': 'blur(0rem)',
    })

    gsap.set('.approach__main_text .color_rose', {
        // color: 'var(--text-color)',
    })

    // gsap.to('.approach__main_text .color_rose', {
    //     // color: 'var(--rose-color)',
    //     fontWeight: '700',
    //     // ease: 'none',
    //     scrollTrigger: {
    //         trigger: '.approach__sticky_block',
    //         start: 'top top',
    //         end: 'bottom bottom',
    //         scrub: true,
    //         // markers: true,
    //     },
    // });

    const worksItemsblock = document.querySelectorAll(".works__item_img_block");
    // const worksItemsImg = document.querySelectorAll(".works__item_img_block img");

    worksItemsblock.forEach((w_block) => {

        let worksItemsImg = w_block.querySelector(".works__item_img_block img")

        gsap.to(worksItemsImg, {
            y: '20%',
            ease: 'none',
            scrollTrigger: {
                trigger: w_block,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
                // markers: true,
            },
        });
    });

    // const worksItemsblock = document.querySelectorAll(".works__item_img_block");
    // // const worksItemsImg = document.querySelectorAll(".works__item_img_block img");

    // worksItemsblock.forEach((w_block) => {

    //     // let worksItemsImg = w_block.querySelector(".works__item_img_block img")

    //     gsap.to(w_block, {
    //         // y: '100px',
    //         alignItems: 'start',
    //         // ease: 'none',
    //         scrollTrigger: {
    //             trigger: w_block,
    //             start: 'top center',
    //             end: 'bottom top',
    //             scrub: true,
    //             // markers: true,
    //         },
    //     });
    // });



    document.querySelectorAll('.works__item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.set(item.querySelector('.works__item_name_inner'), { y: '115%' })
            gsap.set(item.querySelector('.works__item_desc_inner'), { y: '115%' })
            gsap.to(item.querySelector('.works__item_name_inner'), { y: 0, duration: 0.5, ease: 'power3.inout' });
            gsap.to(item.querySelector('.works__item_desc_inner'), { y: 0, duration: 0.5, ease: 'power3.inout' });
        });

        item.addEventListener('mouseleave', () => {
            gsap.to(item.querySelector('.works__item_name_inner'), { y: '-115%', duration: 0.5, ease: 'power3.inout' });
            gsap.to(item.querySelector('.works__item_desc_inner'), { y: '-115%', duration: 0.5, ease: 'power3.inout' });

        });

    });



};
