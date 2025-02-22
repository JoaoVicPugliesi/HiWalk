const gsapTypewriter = (words, typewriter, typecursor, delay, times) => {
    
    let mainTimeline = gsap.timeline({ repeat: times });

    words.forEach(word => {
        let textTimeline = gsap.timeline({ repeat: 1, yoyo: true, repeatDelay: delay });

        textTimeline.to(typewriter, {
            text: word,
            duration: 1,
            onUpdate: () => {
                cursorTimeline.restart();
                cursorTimeline.pause();
            },
            onComplete: () => {
                cursorTimeline.play();
            }
        });

        mainTimeline.add(textTimeline);
    });

    let cursorTimeline = gsap.timeline({ repeat: -1, repeatDelay: 0.8 });

    cursorTimeline.to(typecursor, { opacity: 1, duration: 0 })
        .to(typecursor, { opacity: 0, duration: 0, delay: 0.8 });

    window.addEventListener('focus', function () {
        mainTimeline.play();
        cursorTimeline.play();
    });

    window.addEventListener('blur', function () {
        mainTimeline.pause();
        cursorTimeline.pause();
    });
};

export default gsapTypewriter;