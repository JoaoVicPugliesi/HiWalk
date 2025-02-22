const gsapCar = () => {
    document.addEventListener('DOMContentLoaded', () => {
        let carTimeline = gsap.timeline({ repeat: -1, repeatDelay: 0 });
        
        carTimeline.to(".car", { left: "15%", opacity: 1, duration: 1 })
            .to(".car", { left: "-20%", opacity: 1, duration: 2 })
            .to(".car", { opacity: 0, duration: 0.1 })
            .to(".car", { left: "120%", opacity: 1, duration: 0 })
            .to(".car", { opacity: 1, left: "15%", duration: 9 });
        
        let wheel1Timeline = gsap.timeline({ repeat: -1 });
        let wheel2Timeline = gsap.timeline({ repeat: -1 });
        
        wheel1Timeline.to("#weel1", {
            duration: 1.1,
            ease: "linear",
            transformOrigin: "50% 50%"
        }).to("#weel1", {
            rotate: -360,
            duration: 8,
            ease: "linear",
            transformOrigin: "50% 50%"
        }).to("#weel1", {
            duration: 3,
            ease: "linear",
            transformOrigin: "50% 50%"
        })
        
        wheel2Timeline.to("#weel2", {
            duration: 1.1,
            ease: "linear",
            transformOrigin: "50% 50%"
        }).to("#weel2", {
            rotate: -360,
            duration: 8,
            ease: "linear",
            transformOrigin: "50% 50%"
        }).to("#weel2", {
            duration: 3,
            ease: "linear",
            transformOrigin: "50% 50%"
        })
        
        let trafficLightTimeLine1 = gsap.timeline({ repeat: -1 });
        let trafficLightTimeLine2 = gsap.timeline({ repeat: -1 });
        
        trafficLightTimeLine1.to("#traffic-light-1", {
            duration: 7,
            fill: "yellow"
        }).to("#traffic-light-1", {
            duration: 5,
            fill: "red"
        }).to("#traffic-light-1", {
            fill: "#FDEED1"
        });
        
        trafficLightTimeLine2.to("#traffic-light-2", {
            duration: 7,
            fill: "yellow"
        }).to("#traffic-light-2", {
            duration: 5,
            fill: "red"
        }).to("#traffic-light-2", {
            fill: "#FDEED1"
        });
        
        window.addEventListener('focus', function () {
            carTimeline.play();
            wheel1Timeline.play();
            wheel2Timeline.play();
            trafficLightTimeLine1.play();
            trafficLightTimeLine2.play();
        });
        
        window.addEventListener('blur', function () {
            carTimeline.pause();
            wheel1Timeline.pause();
            wheel2Timeline.pause();
            trafficLightTimeLine1.pause();
            trafficLightTimeLine2.pause();
        });

    });
}

export default gsapCar;