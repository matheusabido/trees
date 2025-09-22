import { BinaryTree } from '../tree/binarytree.js';

export function indexPokemons(pokemons, indexBy) {
    const newTree = new BinaryTree();
    for (const current of pokemons) {
        const key = current[indexBy];
        newTree.add(key, current);
    }
    return newTree;
}

export async function loadPokemonList() {
    const response = await fetch('pokemon.txt');
    const text = await response.text();
    const lines = text.trim().split(/\r?\n/);
    const count = Number(lines[0]);
    const pokemons = [];
    for (let i = 1; i <= count && i < lines.length; i++) {
        const [name, hp, atk, def] = lines[i].split(/\s+/);
        pokemons.push({
            name,
            hp: Number(hp),
            atk: Number(atk),
            def: Number(def)
        });
    }
    return pokemons;
}