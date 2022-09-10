let url = "http://localhost:3000/pokemons/";
const pokeForm = document.querySelector(".poke-form");
const pokeList = document.querySelector(".poke-list");

function addPokemon(pokemon) {
  const liEl = document.createElement("li");
  const imgEl = document.createElement("img");
  const h2El = document.createElement("h2");
  const deleteButton = document.createElement("button");
  const likeButton = document.createElement("button");
  likeButton.innerText =
    pokemon.preference === true
      ? "Do you like it? Yes!"
      : "Do you like it? No!";

  liEl.classList.add("pokemon");

  imgEl.src = pokemon.image;
  h2El.innerText = pokemon.name;
  deleteButton.innerText = "Delete";

  deleteButton.addEventListener("click", (e) => {
    e.preventDefault();

    fetch(url + pokemon.id, {
      method: "DELETE",
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (pokemons) {
        addPokemon(pokemons);
      });
  });

  likeButton.addEventListener("click", (e) => {
    e.preventDefault();
    
    if (pokemon.preference === true) {
      likeButton.innerText = "Do you like it? Yes!";
      fetch(url + pokemon.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ preference: false }),
      })
        .then(function (response) {
          return response.json();
        })
        .then((pokemon) => {
          console.log(pokemon);
        });
    } else {
      likeButton.innerText = "Do you like it? No!";
      fetch(url + pokemon.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ preference: true }),
      })
        .then(function (response) {
          return response.json();
        })
        .then((pokemon) => {
          console.log(pokemon);
        });
    }
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
      preference: true,
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
