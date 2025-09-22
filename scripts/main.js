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

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawTree(context, tree.root, undefined, undefined, canvas.width / 6);
    requestAnimationFrame(render);
}
requestAnimationFrame(render);