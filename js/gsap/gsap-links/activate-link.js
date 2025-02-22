const activateLink = (e) => {
    const link = e.currentTarget;
    const icon = link.querySelector('i');
    const boundBox = link.getBoundingClientRect();

    const linkRange = 40;
    const iconRange = 30;
    const newX = ((e.clientX - boundBox.left) / link.offsetWidth) - 0.5;
    const newY = ((e.clientY - boundBox.top) / link.offsetHeight) - 0.5;

    gsap.to(link, {
        duration: 1,
        x: newX * linkRange,
        y: newY * linkRange,
        ease: Power4.easeOut
    });

    gsap.to(icon, {
        duration: 1,
        x: newX * iconRange,
        y: newY * iconRange,
        ease: Power4.easeOut
    });
};

export default activateLink;