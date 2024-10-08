window.onload = function () {

    // Marquee3k.init();

    // function hidePreloader() {
    //     window.scrollTo(0, 0);
    // }

    // setTimeout(() => {
    //     hidePreloader();
    // }, 0);

    const lenis = new Lenis()

    lenis.on('scroll', (e) => {
        // console.log(e)
    })

    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)


    const canvas = document.getElementById('animationCanvas');

    const context = canvas.getContext('2d');
    const frameCount = 200;
    const frames = [];
    let currentFrame = 0;

    for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        img.src = `./img/logo/${String(i).padStart(4, '0')}.png`;
        frames.push(img);
    }

    function updateFrame() {
        currentFrame = (currentFrame + 1) % frameCount;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(frames[currentFrame], 0, 0, canvas.width, canvas.height);
    }

    setInterval(updateFrame, 1000 / 60);

    gsap.registerPlugin(ScrollTrigger)


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