const heroes = [];

const form = document.getElementById('add-hero-form');

const createTableRow = () => {
  const list = document.getElementById('heroes-list');
  const row = document.createElement('tr');
  const id = document.createElement('td');
  const name = document.createElement('td');
  const description = document.createElement('td');

  const lastHero = heroes[heroes.length - 1];

  id.textContent = lastHero.id;
  name.textContent = lastHero.name;
  description.textContent = lastHero.description;

  row.appendChild(id);
  row.appendChild(name);
  row.appendChild(description);
  list.appendChild(row);
};

const addHero = (hero) => {
  heroes.push({
    id: heroes.length + 1,
    name: hero.name,
    description: hero.description,
  });

  createTableRow();
};

form.addEventListener('submit', (e) => {
  const { hero_name: name, hero_description: description } = form;

  e.preventDefault();

  // double negation to convert a possible falsy value to boolean
  if (!!name && !!description) {
    addHero({
      name: form.hero_name.value,
      description: form.hero_description.value,
    });

    form.hero_name.value = '';
    form.hero_description.value = '';
  } else {
    alert('You cannot add an empty hero 😅');
  }
});
