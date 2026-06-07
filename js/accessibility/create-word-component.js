function create_word_component(current_word) {
  let lettersHTML = '';
  const base_url = 'https://res.cloudinary.com/dibxo0toz/image/upload/';

  for (let i = 0; i < current_word.length; i++) {
    const letter = current_word[i].toLowerCase();
    console.log(letter);
    lettersHTML += `
      <img
        src="${base_url}${letter}.svg"
        alt="${letter}"
        draggable="false"
      />
    `;
  }

  return `
    <div class="accessibility-tutorial-ASL-translation-component">
      <div class="accessibility-word">
        <h3>${current_word}</h3>
      </div>

      <div class="accessibility-ASL-letters">
        ${lettersHTML}
      </div>
    </div>
  `;
}

export default create_word_component;