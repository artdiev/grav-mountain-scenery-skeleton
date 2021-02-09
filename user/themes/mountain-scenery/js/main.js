const lazy = window.lozad();
lazy.observe();

const initLangSwitcher = () => {
    const langBtn = document.getElementById('langBtn');

    const langAnimation = gsap.timeline({paused: true, reversed: true});

    langAnimation.fromTo(
        ".langList", 0.15, {
            opacity: 0,
            transform: "translate(1em, -2em) scale(0.8)",
        }, {
            opacity: 1,
            transform: "translate(0, 0) scale(1)",
            pointerEvents: "auto"
        }
    );

    const toggleAnimation = (tween) => {
        tween.reversed() ? tween.play() : tween.reverse()
    };

    langBtn.addEventListener("click", () => {
        toggleAnimation(langAnimation)
    });
};

const initLanding = () => {
    let height = window.innerHeight;
    let width = window.innerWidth;
    const tree = document.getElementById("treePath");
    const sky = document.getElementById("sky");
    const snow = document.getElementById("snow");

    const mainScene = gsap.timeline({
        onComplete: function () {
            this.restart()
        }
    });
    mainScene
        .to(tree, 1, {rotation: -1}, "-=0")
        .to(tree, 1, {rotation: 1}, "-=0")
        .to("#phone", 0.2, {fill: "black"}, "-=0")
        .to("#phone", 0.2, {fill: "#FFF3FF"}, "-=0")
        .to("#windParticles", 3, {x: 800})
        .to(tree, 1, {rotation: -4}, "-=2.8")
        .to(tree, 0.5, {rotation: 2}, "-=1.7")
        .to(tree, 0.5, {rotation: -2}, "-=1.2")
        .to(tree, 0.4, {rotation: 1}, "-=0.7")
        .to(tree, 0.3, {rotation: 0}, "-=0.3")
        .to(tree, 1, {rotation: -1}, "-=0")
        .to(tree, 1, {rotation: 0}, "-=0")
        .to("#phone", 0.2, {fill: "black"}, "-=0.3")
        .to("#phone", 0.2, {fill: "#FFF3FF"}, "-=0.1")
    ;


    const snowScene = gsap.timeline({
        onComplete: function () {
            this.restart()
        }
    }).pause();
    snowScene.to("#moving-up", 5.5, {transform: "translate(65.8pt, -21.1pt)", ease: Power0.easeNone})
        .to("#moving-down", 5.5, {transform: "translate(-63.4pt, 20.6pt)", ease: Power0.easeNone}, "-=5.5");


    //Animate falling
    function snowingAnimation(element) {
        gsap.to(element, {duration: "random(3,6.5)", y: height + 10, ease: Linear.easeNone, repeat: -1});
        gsap.to(element, {duration: "random(5,7)", x: '+=100', repeat: -1, yoyo: true, ease: Sine.easeInOut});
    };


    function addSnowfall(containerId, snowflakes) {

        let container = document.getElementById(containerId);

        //Create rounded snowflakes
        let fragment = new DocumentFragment();

        // Generate snowflakes
        for (let i = 0; i < snowflakes; i++) {
            let snowflakeDiv = document.createElement('div');
            gsap.set(snowflakeDiv,
                {
                    attr:
                        {
                            class: "snow" + gsap.utils.random(["Small", "Medium", "Large"])
                        },
                    x: gsap.utils.random(0, width),
                    y: "random(-10, 0)"
                });
            fragment.appendChild(snowflakeDiv);
            setTimeout(() => snowingAnimation(snowflakeDiv, true), i * 50)
        }

        return container.appendChild(fragment);
    }


    function RemoveChildrenFromDom() {
        snow.innerHTML = "";
    }

    function removeSnowfall() {
        if (snow.children.length > 0) {
            gsap.to(".snowSmall", {scale: 0.02, duration: 0.3});
            gsap.to(".snowMedium", {scale: 0.02, duration: 0.6});
            gsap.to(".snowLarge", {scale: 0.02, duration: 0.9, onComplete: RemoveChildrenFromDom});
        }
    }

    const snowSports = document.getElementById("snowSports");
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px',
        threshold: 0
    };
    snowSports.observer = new IntersectionObserver(
        entry => {
            if (entry[0].intersectionRatio > 0) {
                console.log("snowScene is intersecting");
                mainScene.pause();
                addSnowfall("snow", width / 25);
                snowScene.play()
            } else {
                snowScene.pause();
                console.log("snowScene not intersecting");
                removeSnowfall();
                setTimeout(() => mainScene.play(), 1200);
            }
        },
        observerOptions
    );
    snowSports.observer.observe(snowSports);

    const climbing = document.getElementById("climbing");
    climbing.observer = new IntersectionObserver(
        entry => {
            if (entry[0].intersectionRatio > 0) {
                console.log("climbing is intersecting");
                mainScene.pause();
            } else {
                console.log("climbing not intersecting");
                setTimeout(() => mainScene.play(), 1200);
            }
        },
        observerOptions
    );
    climbing.observer.observe(climbing);
};

const initFilters = () => {
    const rooms = document.getElementsByClassName('room-preview');

    const filterRooms = (e) => {
        if (e.target.closest('button')) {
            console.log(e);
            const target = e.target.closest('button');
            const filter = target.dataset.filter;
            gsap.to(indicator, 0.3, {
                x: target.offsetLeft,
                y: target.offsetTop,
                width: target.offsetWidth,
                height: target.offsetHeight
            });

            for (let room of rooms) {
                switch (filter) {
                    case 'all':
                        room.style.display = 'unset';
                        break;
                    case 'suite':
                        if (room.dataset.type !== 'suite') {
                            room.style.display = 'none'
                        } else {
                            room.style.display = 'unset'
                        }
                        break;
                    case 'studio':
                        if (room.dataset.type !== 'studio') {
                            room.style.display = 'none'
                        } else {
                            room.style.display = 'unset'
                        }
                        break;
                    case 'small':
                        if (room.dataset.capacity > 3) {
                            room.style.display = 'none'
                        } else {
                            room.style.display = 'unset'
                        }
                        break;
                    case 'medium':
                        if (room.dataset.capacity < 4 || room.dataset.capacity > 6) {
                            room.style.display = 'none'
                        } else {
                            room.style.display = 'unset'
                        }
                        break;
                    case 'large':
                        if (room.dataset.capacity < 7) {
                            room.style.display = 'none'
                        } else {
                            room.style.display = 'unset'
                        }
                        break;
                }
            }
        }
    };

    let filters = document.getElementById("filters");
    let indicator = document.getElementsByClassName("indicator");
    filters.addEventListener('click', filterRooms);
};

window.onload = () => {
    initLangSwitcher();
    if (document.getElementsByClassName('landing').length > 0) {
        initLanding();
    }
    if (document.getElementById('filters')) {
        initFilters();
    }
};
