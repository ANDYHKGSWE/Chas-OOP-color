const wrapper = document.querySelector('.wrapper');
const rInput = document.querySelector('#r-input');
const gInput = document.querySelector('#g-input');
const bInput = document.querySelector('#b-input');
const submitBtn = document.querySelector('.submit-btn');
const hexRes = document.querySelector('.hex-result');
const rgbaRes = document.querySelector('.rgba-result');

const cursor = document.createElement('div');
cursor.classList.add('cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
	cursor.style.left = `${e.clientX}px`;
	cursor.style.top = `${e.clientY}px`;
});

document.querySelectorAll('.box').forEach((box) => {
	box.addEventListener('mouseenter', () => {
		cursor.classList.add('hover');
	});
	box.addEventListener('mouseleave', () => {
		cursor.classList.remove('hover');
	});
});

function Color(r, g, b) {
	this.r = clampValue(r);
	this.g = clampValue(g);
	this.b = clampValue(b);
}

function clampValue(value) {
	return Math.max(0, Math.min(255, value));
}

Color.prototype.rgb = function () {
	return `rgb(${this.r}, ${this.g}, ${this.b})`;
};

Color.prototype.hex = function () {
	return `#${((1 << 24) + (this.r << 16) + (this.g << 8) + this.b)
		.toString(16)
		.slice(1)
		.toUpperCase()}`;
};

Color.prototype.rgba = function (alpha = 1) {
	return `rgba(${this.r}, ${this.g}, ${this.b}, ${alpha})`;
};

document.addEventListener('DOMContentLoaded', () => {
	wrapper.classList.add('default-bg');
});

function handleFormSubmit(event) {
	event.preventDefault();

	const r = parseInt(rInput.value);
	const g = parseInt(gInput.value);
	const b = parseInt(bInput.value);

	const color = new Color(r, g, b);

	document.body.style.backgroundColor = color.rgb();
	hexRes.textContent = `HEX: ${color.hex()}`;
	rgbaRes.textContent = `RGBA: ${color.rgba()}`;

	clearInputFields();
}

function clearInputFields() {
	rInput.value = '';
	gInput.value = '';
	bInput.value = '';
}

submitBtn.addEventListener('click', handleFormSubmit);
