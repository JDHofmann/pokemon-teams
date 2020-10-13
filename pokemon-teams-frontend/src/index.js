document.addEventListener("DOMContentLoaded", () => {

  const BASE_URL = "http://localhost:3000"
  const TRAINERS_URL = `${BASE_URL}/trainers`
  const POKEMONS_URL = `${BASE_URL}/pokemons`
  
  
  // const renderPokemon = (pokemon) => {
  //   // console.log(pokemon)
  //   let li = document.createElement('li');
  //   return li;
  // }
  
  const trainersPokemon = (p) => {
    const ul = document.createElement('ul');
    for(const pokemon of p){
      // renderPokemon(pokemon)
      let li = document.createElement('li');
      li.innerHTML = `
      ${pokemon.nickname}(${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button>
      `
      ul.append(li);
    }
    return ul;
  }
  
  const renderTrainerCard = (t) => {
    let card = document.createElement('div');
    card.classList.add('card');
    card.dataset.id = t.id;
    card.innerHTML = `
    <p>${t.name}</p>
    <button data-trainer-id="${t.id}">Add Pokemon</button>
    `
    let ul = trainersPokemon(t.pokemons)
    card.append(ul)
    document.querySelector('main').append(card)
  }
  
  const renderAllTrainers = (data) => {
    for(const trainer of data){
      renderTrainerCard(trainer)
    }
  }
  
  fetch(`${BASE_URL}/trainers`)
  .then(response => response.json())
  .then(renderAllTrainers)
})
