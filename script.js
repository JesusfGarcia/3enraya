let turno = false;
let winner = false;
let contador = 0;

const clickEvent = (event) => {
  const div = document.getElementById(event.target.id);
  if (div.innerText !== "" || winner) {
    return;
  }
  div.innerText = turno ? "O" : "X";
  detectWinner();
  turno = !turno;
  contador++;
};

const contenedor = document.getElementById("juego");

for (let i = 0; i < contenedor.children.length; i++) {
  const div = contenedor.children[i];
  div.addEventListener("click", (event) => {
    clickEvent(event);
  });
}

const detectWinner = () => {
  const list = [];
  for (let i = 0; i < contenedor.children.length; i++) {
    const div = contenedor.children[i];
    list.push(div.innerText);
  }

  const checkCondition = checkConditionBase(list);

  const condicion1 = checkCondition(0, 1, 2);
  const condicion2 = checkCondition(3, 4, 5);
  const condicion3 = checkCondition(6, 7, 8);
  const condicion4 = checkCondition(0, 3, 6);
  const condicion5 = checkCondition(1, 4, 7);
  const condicion6 = checkCondition(2, 5, 8);
  const condicion7 = checkCondition(0, 4, 8);
  const condicion8 = checkCondition(2, 4, 6);

  if (
    condicion1 ||
    condicion2 ||
    condicion3 ||
    condicion4 ||
    condicion5 ||
    condicion6 ||
    condicion7 ||
    condicion8
  ) {
    mostrarMensaje();
    desactivar_tablero();
    mostrarVolverAJugar();
  } else {
    if (contador === 8) {
      mostrarMensajeEmpate();
      desactivar_tablero();
      mostrarVolverAJugar();
    }
  }
};

const checkConditionBase = (list = []) => {
  return (base, num1, num2) => {
    return (
      list[base] === list[num1] &&
      list[base] === list[num2] &&
      list[base] !== ""
    );
  };
};
const mostrarMensajeEmpate = () => {
  const container = document.getElementById("container");
  const h1 = document.createElement("h1");
  h1.innerText = `Empate`;
  h1.id = "h1";
  container.prepend(h1);
};

const mostrarMensaje = () => {
  const container = document.getElementById("container");
  const h1 = document.createElement("h1");
  h1.innerText = `Gano la letra ${turno ? "O" : "X"}`;
  h1.id = "h1";
  container.prepend(h1);
};

const mostrarVolverAJugar = () => {
  const container = document.getElementById("container");
  const button = document.createElement("button");
  button.innerText = "Volver a Jugar";
  button.onclick = resetearTablero;
  button.className = "playAgain";
  button.id = "button";
  container.appendChild(button);
};

const desactivar_tablero = () => {
  winner = true;
};

const resetearTablero = () => {
  turno = false;
  winner = false;
  contador = 0;
  for (let i = 0; i < contenedor.children.length; i++) {
    const div = contenedor.children[i];
    div.innerText = "";
  }
  const container = document.getElementById("container");
  const button = document.getElementById("button");
  const h1 = document.getElementById("h1");
  container.removeChild(button);
  container.removeChild(h1);
};

const multiplicador = (a) => {
  return (b) => {
    return a * b;
  };
};
