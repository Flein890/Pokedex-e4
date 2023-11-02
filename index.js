const input = document.querySelector("#find-pokemon--input");
const button = document.querySelector("#find");
const container = document.querySelector(".container");
const error = document.querySelector(".error");
const form = document.querySelector("#form");
const stats = document.querySelector(".stats");
const footer = document.querySelector("#footer");

//genero la funcion asincronica para obtener los pokemones con el valor del input
const getPokemon = async () => {
  try {
    //guardo el fetch en una variable para poder guardar la respuesta mas facil
    const pokeinfo = fetch(`https://pokeapi.co/api/v2/pokemon/${input.value}`);
    const response = await pokeinfo;
    const data = await response.json();
    return data;
  } catch (err) {
    isInputValid();
  }
  //   console.log(data); //muestra el objeto del pokemon que se busco
  return data;
};

const template = ({ name, id, types, sprites, weight, height, stats }) => {
  return `
    <div class="pokemon-container">
        <img class="pokemon-image" src="${
          sprites.front_default
        }" alt="${name}" />
        <div class="poke-title">
          <span class="pokemon-name">${name}</span>
          <span class="pokemon-id">N°. ${id}</span>
        </div>
        <div class="stats">
          <div class="hp">hp: ${stats[0].base_stat}</div>
          <div class="attack">attack: ${stats[1].base_stat}</div>
          <div class="defense">defense: ${stats[2].base_stat}</div>
          <div class="speed">speed: ${stats[5].base_stat}</div>
          <div class="weight">weight: ${weight / 10}kg</div>
          <div class="height">height: ${height / 10}m</div>
          <div class="type">${types
            .map((typeE) => typeE.type.name)
            .join()}</div>
        </div>
      </div>`;
};

//agregar funcion para que añada mas divs segun cuantos tipos tenga el poke

//_________________________________________________________________________________
//funcion para validar si el input esta vacio
const isEmpty = () => {
  if (input.value === "") {
    container.innerHTML = "";
    error.classList.remove("hidden");
    error.classList.add("show");
    error.innerHTML = `<strong>No se ingreso un valor.</strong>`;
  }
};

//funcion para mostrar el error cuando el ID no es valido
const isInputValid = () => {
  container.innerHTML = "";
  error.classList.remove("hidden");
  error.classList.add("show");
  error.innerHTML = `<strong>No se ha podido encontrar un pokemon con ese ID.</strong>`;
};
//_________________________________________________________________________________

const render = async (e) => {
  e.preventDefault();
  const data = await getPokemon();
  isEmpty();
  container.innerHTML = template(data);
  error.classList.remove("show");
  error.classList.add("hidden");
};

footer.innerHTML = `<strong>Desarrollado por Franco Villanova</strong>`;

const init = () => {
  form.addEventListener("submit", render);
};
init();

//falta dividir peso y altura por 10
