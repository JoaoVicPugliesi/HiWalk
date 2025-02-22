const gsapScroll = () => {

    document.addEventListener('DOMContentLoaded', () => {

        const sections = document.querySelectorAll("section");
        sections.forEach(section => {
            let sectionsH3 = section.querySelectorAll(".section-h3");
            let sectionsP = section.querySelectorAll(".section-p");
            let places = section.querySelectorAll('.place');

            places.forEach(place => {
                gsap.set(place, {
                    yPercent: 100,
                    opacity: 0,
                });
    
                gsap.to(place, {
                    yPercent: 0,
                    opacity: 1,
                    scrollTrigger: {
                        trigger: section,
                        start: "top 50%",
                        end: "bottom 150%",
                        scrub: true,
                    },
                });
            });
            
            sectionsH3.forEach(sectionH3 => {
                gsap.set(sectionH3, {
                    xPercent: -100,
                    opacity: 0,
                });

                gsap.to(sectionH3, {
                    xPercent: 0,
                    opacity: 1,
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        end: "bottom 150%",
                        scrub: true,
                    },
                });
            });

            sectionsP.forEach(sectionP => {
                gsap.set(sectionP, {
                    xPercent: -100,
                    opacity: 0,
                });

                gsap.to(sectionP, {
                    xPercent: 0,
                    opacity: 1,
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        end: "bottom 150%",
                        scrub: true,
                    },
                });
            });
        });
    });
};

export default gsapScroll;
