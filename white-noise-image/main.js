function init() {
    const form = document.forms[0];
    form.addEventListener('submit', event => {
        event.preventDefault();
        const w = parseInt(form.elements.width.value);
        const h = parseInt(form.elements.height.value);
        generate(w, h);
    }, false);
}

function generate(w, h) {
    const startTime = new Date().getTime();
    render(document.querySelector('img'), w, h);
    const executionTime = (new Date().getTime()) - startTime;
    const container = document.querySelector('b')
    container.innerText = `${executionTime/1000}s`;
    container.parentElement.style.display = '';
}

function render(target, w, h) {
    target.src = draw(w, h, bnwColorPicker);
    target.width = w;
    target.height = h;
}

function draw(w, h, pixelColorPicker) {
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const context = canvas.getContext('2d', { alpha: false });
    context.imageSmoothingEnabled = false;

    for(let x=w; x; x--) {
        for(let y=h; y; y--) {
            context.fillStyle = pixelColorPicker();
            context.fillRect(x, y, 1, 1);
        }
    }

    const result = canvas.toDataURL();
    context.reset();
    return result;
}

function bnwColorPicker() {
    return Math.random() > 0.5 ? '#000' : '#fff';
}