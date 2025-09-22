/**
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

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {BinaryNode} node
 * @param {number} x
 * @param {number} y
 * @param {number} xOffset
 */
export function drawTree(ctx, node, x, y, xOffset) {
    if (!node) return;

    if (!x) x = offset.x;
    if (!y) y = offset.y;

    const nodeRadius = 22;
    ctx.save();

    if (node.left) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - xOffset, y + 80);
        ctx.strokeStyle = '#888';
        ctx.stroke();
    }
    if (node.right) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + xOffset, y + 80);
        ctx.strokeStyle = '#888';
        ctx.stroke();
    }

    ctx.beginPath();
    ctx.arc(x, y, nodeRadius, 0, 2 * Math.PI);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#333';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(node.key, x, y);

    ctx.restore();

    drawTree(ctx, node.left, x - xOffset, y + 80, xOffset * 0.6);
    drawTree(ctx, node.right, x + xOffset, y + 80, xOffset * 0.6);
}