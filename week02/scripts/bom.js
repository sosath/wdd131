const input = document.querySelector('#favchap');
const button = document.querySelector('#addButton');
const list = document.querySelector('#list');

button.addEventListener('click', () => {
  const chapter = input.value.trim();
  if (chapter === '') {
    alert('Please enter a chapter!');
    return;
  }

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
  });
});
