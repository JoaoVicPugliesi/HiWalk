import includeIllustrations from './load/personal-1-include-svg.js';
import load from './load/personal-1-load.js';
import soundtrack from './audios/personal-1-soundtrack.js';
import renderingPlaces from './personal-1-renderingplaces.js';
import click from './audios/personal-1-click.js';
import select from './audios/personal-1-select.js';
import gsapLinks from './gsap/gsap-links/personal-1-gsap-links.js';
import callTypewriter from './gsap/gsap-typewriter/personal-1-gsap-typewriter-call.js';
import parallax from './parallax/personal-1-parallax.js';
import gsapCar from './gsap/gsap-svg/personal-1-gsap-car.js';
import gsapSun from './gsap/gsap-svg/personal-1-gsap-sun.js';
import gsapScroll from './gsap/gsap-scroll/personal-1-gsap-scroll.js';
import displayPlaceInfo from './place/personal-1-place-info.js';
import displayPlaceCreate from './place/personal-1-place-create.js';
import placeCreateHttp from './place/personal-1-place-create-http.js';
import monthsNavigate from './month/personal-1-months-navigate.js';
import travelsDrag from './travel/personal-1-travels-drag.js';
import travelTranslate from './travel/personal-1-travels-translate.js';

includeIllustrations();
renderingPlaces();
gsapCar();
gsapSun();
parallax();
load();
soundtrack();
placeCreateHttp();
displayPlaceInfo();
displayPlaceCreate();
select();
click();
callTypewriter();
gsapScroll();
gsapLinks();
monthsNavigate();
travelsDrag();
travelTranslate();


