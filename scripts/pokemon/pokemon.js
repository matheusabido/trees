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
        const sp = lines[i].split(' ');
        let name = [];
        for (let i = 0; i < sp.length - 3; i++) {
            name.push(sp[i]);
        }
        pokemons.push({
            name: name.join(' '),
            hp: Number(sp[sp.length - 3]),
            atk: Number(sp[sp.length - 2]),
            def: Number(sp[sp.length - 1])
        });
    }
    return pokemons;
}