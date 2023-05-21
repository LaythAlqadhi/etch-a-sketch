const styleElement = document.createElement('style');
styleElement.textContent = `
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  .box:hover {
    background-color: black;
  }

  .button {
    color: white;
    border: none;
    border-radius: 4px;
    padding: 5px;
    font-size: 16px;
    width: 75px;
    margin: 20px 5px;
  }

  .size-btn {
    background-color: #777;
  }

  .delete-btn {
    background-color: #ff0000;
  }

  .bAndW-btn {
    background-color: #000000;
  }

  .randomColor-btn {
    animation: random 5s linear infinite;
  }

  @keyframes random {
    0% {background-color: red;}
    14% {background-color: orange;}
    28% {background-color: yellow;}
    42% {background-color: green;}
    57% {background-color: blue;}
    71% {background-color: indigo;}
    85% {background-color: violet;}
    100% {background-color: red;}
  }
`;

document.head.appendChild(styleElement);

let size = 16;
let mode = "B&W";
const container = document.createElement('div');
const buttonsContainer = document.createElement('div');
const sizeBtn = createButton('Size', 'size-btn', changeSize);
const deleteBtn = createButton('Delete', 'delete-btn', changeModeToDelete);
const bAndWBtn = createButton('B&W', 'bAndW-btn', changeModeToBAndW);
const randomColorBtn = createButton('Random', 'randomColor-btn', changeModeToRandom);
const boxes = document.createElement('div');

container.classList.add('container');
buttonsContainer.classList.add('buttons-container');
container.appendChild(buttonsContainer);

buttonsContainer.appendChild(sizeBtn);
buttonsContainer.appendChild(deleteBtn);
buttonsContainer.appendChild(bAndWBtn);
buttonsContainer.appendChild(randomColorBtn);

container.appendChild(boxes);
document.body.appendChild(container);

document.body.style.cssText = `
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  font-family: system-ui;
  background-color: #222;
`;

container.style.cssText = `
  display: flex;
  flex-direction: column;
  align-items: center;
`;

createBoxes();

function createButton(text, className, onClick) {
  const button = document.createElement('button');
  button.textContent = text;
  button.classList.add('button', className);
  button.addEventListener('click', onClick);
  return button;
}

function changeSize() {
  const newSize = prompt('Please enter the size (The maximum size is 100)');

  if (newSize != null && newSize <= 100) {
    size = newSize;
    clearBoxes();
    createBoxes();
  }
}

function changeModeToDelete() {
  mode = "Delete";
}

function changeModeToBAndW() {
  mode = "B&W";
}

function changeModeToRandom() {
  mode = "Random";
}

function generateRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function createBoxes() {
  boxes.style.cssText = `
    width: 350px;
    height: 350px;
    display: grid;
    grid-template-columns: repeat(${size}, 1fr);
    grid-template-rows: repeat(${size}, 1fr);
  `;

  for (let i = 0; i < size * size; i++) {
    const box = document.createElement('div');
    box.classList.add('box');
    boxes.appendChild(box);
    box.style.backgroundColor = 'white';
    box.addEventListener('click', changeBoxColor);
  }
}

function changeBoxColor(event) {
  const box = event.target;
  box.style.backgroundColor = getColor();
}

function getColor() {
  if (mode === "Random") {
    return generateRandomColor();
  } else if (mode === "B&W") {
    return '#000000';
  } else if (mode === "Delete") {
    return '#ffffff';
  }
}

function clearBoxes() {
  boxes.innerHTML = '';
}
