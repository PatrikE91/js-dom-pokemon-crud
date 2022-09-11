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
      .then(response => response.json())
      .then(pokemons => {
        pokeList.innerHTML = "";
        readAsync(pokemons);
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
        .then(response => response.json())
        .then((pokemon) => {
          pokeList.innerHTML = "";
          readAsync(pokemon);
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
        .then(response => response.json())
        .then((pokemon) => {
          pokeList.innerHTML = "";
          readAsync(pokemon);
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

// function read() {
//   fetch(url)
//     .then((res) => res.json())
//     .then((pokemons) => addPokemons(pokemons));
// }

async function readAsync() {
  let response = await fetch(url);
  let json = await response.json();
  addPokemons(json)
}


function init() {
  listenToAddPokemonForm();
  readAsync()
  .then(result => console.log(result))
  .catch(err => console.error(err))
}

init();
