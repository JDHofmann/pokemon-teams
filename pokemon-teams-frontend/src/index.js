document.addEventListener("DOMContentLoaded", () => {

  const BASE_URL = "http://localhost:3000"
  const TRAINERS_URL = `${BASE_URL}/trainers`
  const POKEMONS_URL = `${BASE_URL}/pokemons`
  
  
  document.addEventListener('click', e => {
    if(e.target.matches("[data-trainer-id]")){
      const id = e.target.dataset.trainerId;

      let addOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({trainer_id: id})
      }

      fetch(`${BASE_URL}/pokemons`, addOptions)
      .then(response => response.json())
      .then( function(pokemon){

        let next = e.target.nextElementSibling
        let newPokemon = renderPokemon(pokemon)
        console.log(newPokemon)
        next.append(newPokemon)
      })
    }
    else if(e.target.matches(".release")){
      pokemonId = e.target.dataset.pokemonId;
      const deleteOptions = {
        method: "DELETE"
      }
      fetch(`${BASE_URL}/pokemons/${pokemonId}`, deleteOptions)
      .then(response => response.json())
      .then(_data => {
        e.target.parentElement.remove()
      })
    }
  })


  const renderPokemon = (pokemon) => {
    let li = document.createElement('li');
    li.innerHTML = `
      ${pokemon.nickname}(${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button>
      `
    return li;
  }
  
  const trainersPokemon = (p) => {
    const ul = document.createElement('ul');
    for(const pokemon of p){
      let li = renderPokemon(pokemon)
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
