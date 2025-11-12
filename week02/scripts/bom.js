// I added the functionality of clicking when pressing 'Enter' as well.
document.addEventListener('DOMContentLoaded', () => {

  const input = document.querySelector('#favchap');
  const button = document.querySelector('#addButton');
  const list = document.querySelector('#list');

  function addChapter() {
    const chapter = input.value.trim();

    if (chapter !== '') {
      const li = document.createElement('li');
      const deleteButton = document.createElement('button');

      li.textContent = chapter;
      deleteButton.textContent = '❌';
      deleteButton.setAttribute('aria-label', `Remove ${chapter}`);
      deleteButton.classList.add('delete');

      li.append(deleteButton);
      list.append(li);

      input.value = '';
      input.focus();

      deleteButton.addEventListener('click', () => {
        list.removeChild(li);
        input.focus();
      });

    } else {
      alert('Please enter a chapter before adding!');
      input.focus();
    }
  }

  button.addEventListener('click', addChapter);

  input.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      addChapter();
    }
  });
});
