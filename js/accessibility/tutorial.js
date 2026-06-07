import create_word_component from "./create-word-component.js";

const open_tutorial_btn = document.getElementById("open-tutorial-btn");
const accessibility_tutorial_ASL_translation = document.querySelector(
  ".accessibility-tutorial-ASL-translation",
);
const tutorial_container = document.querySelector(
  ".acessibility-tutorial-container",
);
const accessibility_tutorial_text = document.querySelector(
  ".accessibility-tutorial-text p",
);
const accessibility_tutorial_ASL_translation_display = document.querySelector(
  ".accessibility-tutorial-ASL-translation-display",
);
const accessibility_tutorial_translate = document.querySelector(
  ".accessibility-tutorial-options-translate",
);
const accessibility_tutorial_options_next = document.querySelector(
  ".accessibility-tutorial-options-next i",
);
const accessibility_tutorial_options_previous = document.querySelector(
  ".accessibility-tutorial-options-previous i",
);
const accessibility_tutorial_options_counter = document.querySelector(
  ".accessibility-tutorial-options-counter h3",
);
const tutorial_parts = [
  "Hi, my name is Fox, i am your HiWalk Guider. Remember! You can use the buttons on the right to navigate through sections or translate the text into Libras signals.",
  "As you can imagine, Hiwalk is a platform that provides a high level of adventure, here you can explore, choose and manage your next trips without trouble.",
  "Hiwalk is separated by sections, which one representing the differences from each place unique atmosphere, which you may encounter along the way.",
  "On the left bar you may see icons, each one represents an explorable section, above you may see icons able of changing the font size, increasing readability, feel free to try.",
  "I need to remind you its a prototype. In future you shall see an updated version of the same experience. Anyway, thank you and i hope i helped you through your journey so far.",
];

let counter = 1;
let can_close = false;
const parts_length = tutorial_parts.length;

function tutorial_translation_toggle() {
  accessibility_tutorial_ASL_translation_display.innerHTML = "";

  if (accessibility_tutorial_ASL_translation.classList.contains("visible")) {
    accessibility_tutorial_ASL_translation.classList.remove("visible");
    return;
  }

  const current_text = tutorial_parts[counter - 1];

  const words = current_text.split(" ");

  for (let i = 0; i < words.length; i++) {
    const current_word = words[i];
    const clean_word = current_word.replace(/[^a-zA-Z]/g, "");

    accessibility_tutorial_ASL_translation_display.innerHTML +=
      create_word_component(clean_word);
  }

  requestAnimationFrame(() => {
    accessibility_tutorial_ASL_translation_display.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
  accessibility_tutorial_ASL_translation.classList.add("visible");
}

function tutorial_open() {
  tutorial_container.classList.add("visible");
}

function tutorial_close(can_close) {
  if (can_close) {
    tutorial_container.classList.remove("visible");
  }
}

function tutorial_next() {
  if (counter < parts_length) {
    counter++;
    accessibility_tutorial_text.textContent = tutorial_parts[counter - 1];
    if (counter == parts_length) {
      accessibility_tutorial_options_counter.textContent = "X";
      can_close = true;
      return;
    }
    accessibility_tutorial_options_counter.textContent = `${counter}/5`;
  }
}

function tutorial_previous() {
  if (counter > 1) {
    counter--;
    accessibility_tutorial_text.textContent = tutorial_parts[counter - 1];
    accessibility_tutorial_options_counter.textContent = `${counter}/5`;
  }
}

function tutorial_caller() {
  accessibility_tutorial_options_next.addEventListener("click", () => {
    tutorial_next();
  });
  accessibility_tutorial_options_previous.addEventListener("click", () => {
    tutorial_previous();
  });

  accessibility_tutorial_options_counter.addEventListener("click", () => {
    tutorial_close(can_close);
  });

  open_tutorial_btn.addEventListener("click", () => {
    tutorial_open();
  });

  accessibility_tutorial_translate.addEventListener("click", () => {
    tutorial_translation_toggle();
  });
  accessibility_tutorial_ASL_translation.addEventListener("click", () => {
    tutorial_translation_toggle();
  });
}

export default tutorial_caller;
