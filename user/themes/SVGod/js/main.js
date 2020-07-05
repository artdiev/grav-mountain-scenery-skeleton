
//lazy load

const lazyload = window.lozad();
lazyload.observe();

//language switcher
const LangBtn = document.getElementById('langBtn');
const langAnimation = gsap.timeline({paused: true, reversed: true});

// initial state: closed
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

// if closed: open, if open: close
const toggleAnimation = (tween) => {
    tween.reversed() ? tween.play() : tween.reverse()
};

langBtn.addEventListener("click", () => {toggleAnimation(langAnimation)});





if (document.getElementsByClassName('landing').length > 0) {

    let height = window.innerHeight;
    let width = window.innerWidth;
    let tree = document.getElementById("treePath");
    let sky = document.getElementById("sky");

    const mainScene = gsap.timeline({ onComplete:function() {this.restart()}});
    mainScene
        .to(tree, 1, {rotation: -1}, "-=0")
        .to(tree, 1, {rotation: 1}, "-=0")
        .to(sky, 0.7, {y: -12}, "-=1")
        .to(sky, 0.5, {y: 0}, "-=0.3")
        .to("#windParticles", 3, {x: 800})
        .to(sky, 1.5, {y: -20}, "-=3")
        .to(sky, 1.5, {y: 0}, "-=1.5")
        .to(tree, 1, {rotation: -4}, "-=2.8")
        .to(tree, 0.5, {rotation: 2}, "-=1.7")
        .to(tree, 0.5, {rotation: -2}, "-=1.2")
        .to(tree, 0.4, {rotation: 1}, "-=0.7")
        .to(tree, 0.3, {rotation: 0}, "-=0.3")
        .to(["#mid_right", "#mid_left", "#far_right"], 0.7, {x: 5, }, "-=3")
        .to(["#mid_right", "#mid_left", "#far_right"], 0.7, {x: 0, }, "-=1.5")
        .to(tree, 1, {rotation: -1}, "-=0")
        .to(tree, 1, {rotation: 0}, "-=0")
        .to(sky, 0.7, {y: -12}, "-=1")
        .to(sky, 0.5, {y: 0}, "-=0.3")
        .to("#phone", 0.1, {fill: "black"}, "-=0")
        .to("#phone", 0.1, {fill: "#FFF3FF"}, "-=0")
    ;


    const snowScene = gsap.timeline({onComplete:function() {this.restart()}}).pause();
    snowScene.to("#moving-up", 5.5, {transform: "translate(65.8pt, -21.1pt)", ease: Power0.easeNone})
        .to("#moving-down", 5.5, {transform: "translate(-63.4pt, 20.6pt)", ease: Power0.easeNone}, "-=5.5");


    //Animate falling
    function snowingAnimation(element) {
        gsap.to(element,{duration: "random(3,6.5)", y:height+10,ease:Linear.easeNone,repeat: -1});
        gsap.to(element,{duration: "random(5,7)", x:'+=100',repeat: -1,yoyo:true,ease:Sine.easeInOut});
    };


    function addSnowfall(containerId, snowflakes) {

        let container = document.getElementById(containerId);

        //Create rounded snowflakes
        let fragment = new DocumentFragment();

        // Generate snowflakes
        for (let i = 0; i < snowflakes; i++) {
            let snowflakeDiv = document.createElement('div');
            gsap.set(snowflakeDiv, {attr: {class: "snow" + gsap.utils.random(["Small", "Medium", "Large"])}, x: gsap.utils.random(0, width), y: "random(-10, 0)" });
            fragment.appendChild(snowflakeDiv);
            setTimeout(() => snowingAnimation(snowflakeDiv, true), i*50)
        }

        return container.appendChild(fragment);
    }

    function RemoveChildrenFromDom() {
        console.log('snowflakes removed')
        return document.getElementById("snow").innerHTML = "";
    }

    function removeSnowfall() {
        if (document.getElementById("snow").children.length > 0) {
            gsap.to(".snowSmall", {scale: 0.02, duration: 0.4});
            gsap.to(".snowMedium", {scale: 0.02, duration: 0.8});
            gsap.to(".snowLarge", {scale: 0.02, duration: 1.2, onComplete: RemoveChildrenFromDom});
        } else return;
    }


//    Intersection Observer
    const observedElements = document.querySelectorAll('#snowSports');
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px',
        threshold: 0
    };
    observedElements.forEach(el => {

        el.observer = new IntersectionObserver(
            entry => {
                if (entry[0].intersectionRatio > 0) {
                    console.log("is intersecting");
                    addSnowfall("snow", width/15)
                    mainScene.pause()
                    snowScene.play()
                } else {
                    snowScene.pause()
                    mainScene.play()
                    console.log("not intersecting")
                    removeSnowfall()
                }
            },
            observerOptions
        );

        el.observer.observe(el);
    });





}

if (document.getElementById('filters')) {
    const rooms = document.getElementsByClassName('room-preview');
    let filter = 'all';

    function filterToggle(input) {
        filter = input;
        filterSlider(input);
        filterRooms(filter)
    }

// create room animations
    let roomAnim = [];
    for (let room of rooms) {
        let anim = gsap.timeline({paused: true, reversed: true});
        anim.fromTo(
            room, 0.4, {
                display: 'unset',
                opacity: 1,
                transform: "translate(0, 0)"
            }, {
                display: 'none',
                opacity: 0.5,
                transform: "translate(0, -0em)",
            }
        );
        roomAnim.push(anim);
    }

    let filterTargets = document.querySelectorAll("#filters button");
    let indicator = document.getElementsByClassName("indicator");
    gsap.set(indicator, {x:filterTargets[0].offsetLeft});
    gsap.set(indicator, {y:filterTargets[0].offsetTop});
    gsap.set(indicator, {width:filterTargets[0].offsetWidth});
    gsap.set(indicator, {height:filterTargets[0].offsetHeight});
    function filterSlider (input) {
        switch (input) {
            case 'all':
                gsap.to(indicator, 0.3, {x:filterTargets[0].offsetLeft, y:filterTargets[0].offsetTop});
                break;
            case 'suite':
                gsap.to(indicator, 0.3, {x:filterTargets[1].offsetLeft, y:filterTargets[1].offsetTop});
                break;
            case 'studio':
                gsap.to(indicator, 0.3, {x:filterTargets[2].offsetLeft, y:filterTargets[2].offsetTop});
                break;
            case 'small':
                gsap.to(indicator, 0.3, {x:filterTargets[3].offsetLeft, y:filterTargets[3].offsetTop});
                break;
            case 'medium':
                gsap.to(indicator, 0.3, {x:filterTargets[4].offsetLeft, y:filterTargets[4].offsetTop});
                break;
            case 'large':
                gsap.to(indicator, 0.3, {x:filterTargets[5].offsetLeft, y:filterTargets[5].offsetTop});
                break;
        }
    }

    function filterRooms(filter) {
        let count = 0;
        for (let room of rooms) {
            roomAnim[count].reversed() ? console.log('visible already') : toggleAnimation(roomAnim[count]);
            switch (filter) {
                case 'suite':
                    if (room.dataset.type !== 'suite') {
                        console.log('filtering suite');
                        roomAnim[count].reversed() ? toggleAnimation(roomAnim[count]) : console.log('hidden already');
                    }
                    break;
                case 'studio':
                    if (room.dataset.type !== 'studio') {
                        console.log('filtering studio');
                        roomAnim[count].reversed() ? toggleAnimation(roomAnim[count]) : console.log('hidden already');
                    }
                    break;
                case 'small':
                    if (room.dataset.capacity > 3) {
                        console.log('filtering small');
                        roomAnim[count].reversed() ? toggleAnimation(roomAnim[count]) : console.log('hidden already');
                    }
                    break;
                case 'medium':
                    if (room.dataset.capacity < 4 || room.dataset.capacity > 6) {
                        console.log('filtering medium');
                        roomAnim[count].reversed() ? toggleAnimation(roomAnim[count]) : console.log('hidden already');
                    }
                    break;
                case 'large':
                    if (room.dataset.capacity < 7) {
                        console.log('filtering large');
                        roomAnim[count].reversed() ? toggleAnimation(roomAnim[count]) : console.log('hidden already');
                    }
                    break;
            }
            count++;
        }
    }
}
