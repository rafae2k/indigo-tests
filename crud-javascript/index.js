const heroes = [];

let heroEditedIndex;

// CRUD
const createHero = (hero) => {
  heroes.push({
    id: heroes.length + 1,
    name: hero.name,
    description: hero.description,
  });

  updateTable();
};

const editHero = () => {
  const name = document.getElementById('hero-edit-name');
  const description = document.getElementById('hero-edit-description');

  if (!isFormValid({ name, description })) {
    return alert('You cannot add an empty hero 😅');
  }

  heroes[heroEditedIndex] = {
    id: heroes[heroEditedIndex].id,
    name: name.value,
    description: description.value,
  };

  name.value = '';
  description.value = '';

  updateTable();
  closeModal();

  heroEditedIndex = null;
};

const deleteHero = (index) => {
  heroes.splice(index, 1);
};

const editOrDelete = (event) => {
  if (event.target.type == 'button') {
    const [action, index] = event.target.id.split('-');

    if (action == 'edit') {
      heroEditedIndex = index;
      openModal();
    } else {
      deleteHero(index);
      updateTable();
    }
  }
};

const openModal = () =>
  document.getElementById('modal').classList.toggle('active');

const closeModal = () => {
  document.getElementById('modal').classList.remove('active');
};

updateTable = () => {
  document.querySelector('#heroes-list>tbody').innerHTML = '';
  heroes.forEach((hero, index) => {
    createRow(hero, index);
  });
};

const createRow = (hero, index) => {
  const newRow = document.createElement('tr');
  newRow.innerHTML = `
      <td>${hero.id}</td>
      <td>${hero.name}</td>
      <td>${hero.description}</td>
      <td class='buttons-wrapper'>
          <button type="button" class="button edit" id="edit-${index}">Edit</button>
          <button type="button" class="button delete" id="delete-${index}" >Delete</button>
      </td>
  `;

  document.querySelector('#heroes-list>tbody').appendChild(newRow);
};

const clearForm = (form) => {
  form.hero_name.value = '';
  form.hero_description.value = '';
};

const isFormValid = (values) => {
  const { name, description } = values;

  if (!name.value) return alert('Hero name is required');

  if (!description.value) return alert('Hero description is required');

  if (!name.value && !description.value)
    return alert('You cannot add an empty hero 😅');

  return true;
};

const handleSubmit = (e) => {
  e.preventDefault();
  const { hero_name: name, hero_description: description } = e.target;

  const isValid = isFormValid({ name, description });

  if (isValid) {
    createHero({ name: name.value, description: description.value });
    clearForm(e.target);
  }
};

// Event listeners
document
  .getElementById('add-hero-form')
  .addEventListener('submit', handleSubmit);

document
  .querySelector('#heroes-list>tbody')
  .addEventListener('click', editOrDelete);

document.getElementById('save').addEventListener('click', editHero);

document.getElementById('cancel').addEventListener('click', closeModal);

// Create table on page load
updateTable();
