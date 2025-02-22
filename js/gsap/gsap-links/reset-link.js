const resetLink = (e) => {
    const link = e.currentTarget;
    const icon = link.querySelector('i');

    gsap.to(link, {
        duration: 1,
        x: 0,
        y: 0,
        ease: Elastic.easeOut
    });

    gsap.to(icon, {
        duration: 1,
        x: 0,
        y: 0,
        ease: Elastic.easeOut
    });
};

export default resetLink;