import { indexPokemons, loadPokemonList } from "./pokemon/pokemon.js";
import { drawTree } from "./render/renderer.js";
import { BinaryTree } from "./tree/binarytree.js";

const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');

let tree = new BinaryTree();

document.querySelector('.controls-btn').onclick = () => {
    const key = document.querySelector('#key').value;
    const value = document.querySelector('#value').value;
    tree.add(Number(key), value);
}

document.getElementById('btn-hp').onclick = async () => {
    const pokemons = await loadPokemonList();
    tree = indexPokemons(pokemons, 'hp');
};

document.getElementById('btn-atk').onclick = async () => {
    const pokemons = await loadPokemonList();
    tree = indexPokemons(pokemons, 'atk');
};

document.getElementById('btn-def').onclick = async () => {
    const pokemons = await loadPokemonList();
    tree = indexPokemons(pokemons, 'def');
};

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawTree(context, tree);
    requestAnimationFrame(render);
}
requestAnimationFrame(render);