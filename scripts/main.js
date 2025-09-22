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

// Função para buscar node por key
function findNodeByKey(node, key) {
    if (!node) return null;
    if (node.key === key) return node;
    if (key < node.key) return findNodeByKey(node.left, key);
    return findNodeByKey(node.right, key);
}

document.getElementById('search-btn').onclick = () => {
    const key = Number(document.getElementById('search-key').value);
    const resultsDiv = document.getElementById('search-results');
    resultsDiv.innerHTML = '';
    if (isNaN(key)) {
        resultsDiv.textContent = 'Digite uma chave válida.';
        return;
    }
    const node = findNodeByKey(tree.root, key);
    if (!node) {
        resultsDiv.textContent = 'Nenhum resultado encontrado.';
        return;
    }
    let current = node.value?.head;
    const values = [];
    while (current) {
        values.push(current.value);
        current = current.next;
    }
    if (values.length === 0) {
        resultsDiv.textContent = 'Nenhum valor encontrado para esta chave.';
    } else {
        resultsDiv.innerHTML = '<b>Resultados:</b> ' + values.map(v => {
            if (typeof v !== 'object') {
                return `<p>${v}</p>`;
            } 
            return `<p>${v.name} [HP: ${v.hp}, DEF: ${v.def}, ATK: ${v.atk}]</p>`;
        }).join('');
    }
}