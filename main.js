const API = "http://localhost:8000/fixie";

// document.querySelector('.modal')

// ! BODY > Modal

let add = document.querySelector(".addFixModal");
let modal = document.querySelector(".modal");

add.addEventListener("click", () => {
  modal.classList.toggle("none");
});

// ! MODAL > DB.JSON
let inpName = document.querySelector(".inpName");
let inputs = document.querySelectorAll("input");
let inpDescription = document.querySelector(".inpDescription");
let inpCost = document.querySelector(".inpCost");
let inpImage = document.querySelector(".inpImage");
let addFix = document.querySelector(".addFix");

addFix.addEventListener("click", () => {
  if (
    !inpName.value == "" &&
    !inpDescription.value == "" &&
    !inpCost.value == "" &&
    !inpImage.value == ""
  ) {
    let obj = {
      name: inpName.value,
      description: inpDescription.value,
      cost: inpCost.value,
      image: inpImage.value,
    };
    console.log(obj);
    addApi(obj);
    inpName.value = "";
    inpDescription.value = "";
    inpCost.value = "";
    inpImage.value = "";
  } else {
    alert("Заполните все!");
  }
});

// !Create

function addApi(obj) {
  fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(obj),
  }).then(() => toView());
}

// ! BODY > DESK
let desk = document.querySelector(".desk");

function toView(obj) {
  fetch(API)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      desk.innerHTML = "";
      data.forEach((elem) => {
        desk.innerHTML += `
        <div class="card">
        <img class="imgCard" src="${elem.image}" alt="">
        <div class="name2">Name</div>
        <div class="cardName">${elem.name}</div>
        <div class="surname2">Surename</div>
        <div class="cardDescription">${elem.description}</div>
        <div class="number2">Phone Number</div>
        <div class="cardBuy">${elem.cost}</div>
        <button id="${elem.id}" class="delete">DELETE</button>
        <button id="${elem.id}" class="edit">EDIT</button>
        </div>
    `;
      });
    });
}
toView();

//! DELETE

let modalEdit = document.querySelector(".modal_edit");
let editBtn = document.querySelector(".edit");

document.addEventListener("click", (e) => {
  let click = [...e.target.classList];
  let id = e.target.id;
  if (click.includes("delete")) {
    fetch(`${API}/${id}`, {
      method: "DELETE",
    }).then(() => toView());
  } else if (click.includes("edit")) {
    modalEdit.classList.toggle("none1");
    fetch(`${API}/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        (editName.value = data.name),
          (editDescription.value = data.description),
          (editCost.value = data.cost),
          (editImg.value = data.image);
        editBtn.setAttribute("id", data.id);
      });
  }
});

let editName = document.querySelector(".editName");
let editDescription = document.querySelector(".editDescription");
let editCost = document.querySelector(".editCost");
let editImg = document.querySelector(".editImg");

editBtn.addEventListener("click", () => {
  let obj2 = {
    name: editName.value,
    description: editDescription.value,
    cost: editCost.value,
    image: editImg.value,
  };
  editCard(obj2, editBtn.id);
});

function editCard(obj, id) {
  fetch(`${API}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(obj),
  }).then(() => toView());
}
