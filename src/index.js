let url = "http://localhost:3000/pokemons/";
const pokeForm = document.querySelector(".poke-form");
const pokeList = document.querySelector(".poke-list");

function addPokemon(pokemon) {
  const liEl = document.createElement("li");
  const imgEl = document.createElement("img");
  const h2El = document.createElement("h2");
  const deleteButton = document.createElement("button");
  const likeButton = document.createElement('button')

  liEl.classList.add("pokemon");
  
  imgEl.src = pokemon.image;
  h2El.innerText = pokemon.name;
  deleteButton.innerText = "Delete";
  likeButton.innerText = 'Do you like it?'

  deleteButton.addEventListener("click", (e) => {
    e.preventDefault();

    fetch(url + pokemon.id, {
      method: "DELETE",
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (pokemons) {
        addPokemon(pokemons)
      });
  });

  liEl.append(imgEl, h2El, deleteButton, likeButton);
  pokeList.append(liEl);
}

function addPokemons(pokemons) {
  pokemons.forEach((pokemon) => addPokemon(pokemon));
}

function listenToAddPokemonForm() {
  pokeForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const pokemon = {
      name: pokeForm.name.value,
      image: pokeForm.image.value,
    };

    // CREATE
    fetch("http://localhost:3000/pokemons", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pokemon),
    })
      .then((res) => res.json())
      .then((pokemon) => addPokemon(pokemon));
  });

  pokeForm.reset();
}

// READ

function read() {
  fetch(url)
    .then((res) => res.json())
    .then((pokemons) => addPokemons(pokemons));
}

function init() {
  listenToAddPokemonForm();
  read();
}

init();
