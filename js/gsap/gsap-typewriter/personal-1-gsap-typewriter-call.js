import gsapTypewriter from "./personal-1-gsap-typewriter.js";

const callTypewriter = () => {
    
    const homeWords = [
        'Hi, Walker!', 
        'Discover!', 
        'Imagine!', 
        'Rediscover!', 
        'Reimagine!', 
        'Finally...', 
        'HiWalk'];
    const homeTypewriter = document.querySelector('#home-typewriter');
    const homeTypecursor = document.querySelector('#home-typecursor');
    gsapTypewriter(homeWords, homeTypewriter, homeTypecursor, 10, -1);
    const aboutWords = [
        'Your Gateway to Seamless Travel',
        'Effortless Journeys, Every Step',
        'Where Travel Meets Innovation',
        'Step into the Future of Mobility',
        'Smart Travel, Simplified',
        'Elevating Your Travel Experience',
        'Bridging Distances, Effortlessly',
        'Your Personal Travel Companion',
        'Navigate the World with Ease',
        'Revolutionizing the Way You Move'
      ];
      
    const aboutTypewriter = document.querySelector('#about-typewriter');
    const aboutTypecursor = document.querySelector('#about-typecursor');
    gsapTypewriter(aboutWords, aboutTypewriter, aboutTypecursor, 6, -1);

};

export default callTypewriter;