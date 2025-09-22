import { BinaryTree } from "../tree/binarytree.js";

/**14
 * @type {HTMLCanvasElement}
 */
const canvas = document.querySelector('#canvas');

function updateCanvasSize() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
}

window.onresize = updateCanvasSize;
updateCanvasSize();



let offset = { x: canvas.width / 2, y: 66};
let isDragging = false;
let lastMouse = { x: 0, y: 0 };
let zoom = 1;
const minZoom = 0.2;
const maxZoom = 3;


canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    lastMouse.x = e.clientX;
    lastMouse.y = e.clientY;
});

canvas.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const dx = e.clientX - lastMouse.x;
        const dy = e.clientY - lastMouse.y;
        offset.x += dx;
        offset.y += dy;
        lastMouse.x = e.clientX;
        lastMouse.y = e.clientY;
    }
});

canvas.addEventListener('mouseup', () => {
    isDragging = false;
});

canvas.addEventListener('mouseleave', () => {
    isDragging = false;
});

// Zoom com scroll do mouse
canvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    const zoomFactor = 0.1;
    if (e.deltaY < 0) {
        zoom = Math.min(maxZoom, zoom + zoomFactor);
    } else {
        zoom = Math.max(minZoom, zoom - zoomFactor);
    }
});

// Zoom com pinch no celular
let lastTouchDist = null;
canvas.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) {
        lastTouchDist = getTouchDist(e.touches);
    }
});
canvas.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2) {
        const dist = getTouchDist(e.touches);
        if (lastTouchDist) {
            const delta = dist - lastTouchDist;
            zoom += delta * 0.002;
            zoom = Math.max(minZoom, Math.min(maxZoom, zoom));
        }
        lastTouchDist = dist;
    }
});
canvas.addEventListener('touchend', (e) => {
    if (e.touches.length < 2) {
        lastTouchDist = null;
    }
});

function getTouchDist(touches) {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Essa foi a função mais mal feita por IA que eu já vi.
 * Devo reescrever ela quando me sobrar um tempo...
 * 
 * This is the worst AI made function I've ever seen.
 * I should rewrite it when I have some free time...
 * 
 * C'est la pire fonction jamais créée par une IA.
 * Je devrais la réécrire quand j'aurai un peu de temps...
 * 
 * @param {CanvasRenderingContext2D} ctx
 * @param {BinaryTree} tree
 */
export function drawTree(ctx, tree) {
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(offset.x, offset.y);
    ctx.scale(zoom, zoom);

    const nodeRadius = 28;
    const levelHeight = 80;
    const canvasWidth = canvas.width / zoom;
    const maxWidth = canvasWidth > 1200 ? 1200 : canvasWidth - 40;

    function assignPositions(node, depth, index, siblings) {
        if (!node) return [];
        const x = siblings === 1 ? 0 : ((index / (siblings - 1)) - 0.5) * maxWidth;
        const y = depth * levelHeight;
        let positions = [{ node, x, y }];
        if (node.left) {
            positions = positions.concat(assignPositions(node.left, depth + 1, index * 2, siblings * 2));
        }
        if (node.right) {
            positions = positions.concat(assignPositions(node.right, depth + 1, index * 2 + 1, siblings * 2));
        }
        return positions;
    }

    const positions = assignPositions(tree.root, 0, 0, 1);

    positions.forEach(({ node, x, y }) => {
        if (node.left) {
            const leftPos = positions.find(p => p.node === node.left);
            if (leftPos) {
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(leftPos.x, leftPos.y);
                ctx.strokeStyle = '#888';
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        }
        if (node.right) {
            const rightPos = positions.find(p => p.node === node.right);
            if (rightPos) {
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(rightPos.x, rightPos.y);
                ctx.strokeStyle = '#888';
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        }
    });

    positions.forEach(({ node, x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, nodeRadius, 0, 2 * Math.PI);
        ctx.fillStyle = '#fff';
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 3;
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#222';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.key, x, y);
    });

    ctx.restore();
}