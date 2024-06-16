// app.js
import { cargarEntrenadores } from './entrenadores.js'; // Importar la función desde otro archivo

document.addEventListener('DOMContentLoaded', () => {
  cargarEntrenadores(); // Llamar a la función al cargar el documento
});
// entrenadores.js
export async function cargarEntrenadores() {
    try {
      const response = await fetch('entrenadores.json');
      if (!response.ok) {
        throw new Error('No se pudo cargar la lista de entrenadores');
      }
      const entrenadores = await response.json();
      mostrarEntrenadores(entrenadores);
    } catch (error) {
      console.error(error);
    }
  }
  
  function mostrarEntrenadores(entrenadores) {
    const entrenadoresDiv = document.getElementById('entrenadores');
    entrenadoresDiv.innerHTML = ''; // Limpiar contenido existente
  
    entrenadores.forEach(entrenador => {
      const card = document.createElement('div');
      card.classList.add('card');
      
      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body');
      
      const nombreEntrenador = document.createElement('h5');
      nombreEntrenador.classList.add('card-title');
      nombreEntrenador.textContent = entrenador.nombre;
  
      const verPokemonsBtn = document.createElement('button');
      verPokemonsBtn.classList.add('btn', 'btn-primary', 'mr-2');
      verPokemonsBtn.textContent = 'Ver Pokémon';
      verPokemonsBtn.addEventListener('click', () => verPokemons(entrenador));
  
      const seleccionarParaCombateBtn = document.createElement('button');
      seleccionarParaCombateBtn.classList.add('btn', 'btn-success');
      seleccionarParaCombateBtn.textContent = 'Seleccionar para combate';
      seleccionarParaCombateBtn.addEventListener('click', () => seleccionarParaCombate(entrenador));
  
      cardBody.appendChild(nombreEntrenador);
      cardBody.appendChild(verPokemonsBtn);
      cardBody.appendChild(seleccionarParaCombateBtn);
      
      card.appendChild(cardBody);
      entrenadoresDiv.appendChild(card);
    });
  }
  
  function verPokemons(entrenador) {
    const pokemonListDiv = document.getElementById('pokemon-list');
    pokemonListDiv.innerHTML = '';
  
    const titulo = document.createElement('h3');
    titulo.textContent = `Pokémon de ${entrenador.nombre}`;
    pokemonListDiv.appendChild(titulo);
  
    const listaPokemon = document.createElement('ul');
    entrenador.pokemones.forEach(pokemon => {
      const itemPokemon = document.createElement('li');
      itemPokemon.textContent = pokemon;
      listaPokemon.appendChild(itemPokemon);
    });
  
    pokemonListDiv.appendChild(listaPokemon);
  }
  
  let entrenador1 = null;
  let entrenador2 = null;
  
  function seleccionarParaCombate(entrenador) {
    if (!entrenador1) {
      entrenador1 = entrenador;
    } else if (!entrenador2) {
      entrenador2 = entrenador;
      mostrarMensajeCombate();
    } else {
      console.log('Ya se han seleccionado dos entrenadores para el combate');
    }
  }
  
  function mostrarMensajeCombate() {
    const combateDiv = document.getElementById('combate');
    combateDiv.innerHTML = '';
  
    const mensaje = document.createElement('p');
    mensaje.textContent = `Se realizará un nuevo combate entre ${entrenador1.nombre} vs ${entrenador2.nombre}`;
    combateDiv.appendChild(mensaje);
  
    const nuevoCombateBtn = document.createElement('button');
    nuevoCombateBtn.classList.add('btn', 'btn-info');
    nuevoCombateBtn.textContent = 'Nuevo combate';
    nuevoCombateBtn.addEventListener('click', iniciarNuevoCombate);
    nuevoCombateBtn.disabled = !(entrenador1 && entrenador2);
    
    combateDiv.appendChild(nuevoCombateBtn);
  }
  
  function iniciarNuevoCombate() {
    console.log(`Iniciar nuevo combate entre ${entrenador1.nombre} vs ${entrenador2.nombre}`);
    // Aquí podrías implementar la lógica para el combate
  }
  