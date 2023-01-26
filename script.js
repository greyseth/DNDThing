let players = [
  {
    name: "Seth Grayson",
    cur: 10,
    lives: 10,
    inv: [
      {
        name: "this thing",
        desc: "this is a something",
        amount: 2,
      },
    ],
  },
  {
    name: "Ron Corel",
    cur: 15,
    lives: 7,
    inv: [
      {
        name: "other thing",
        desc: "this is a different thing",
        amount: 3,
      },
    ],
  },
  {
    name: "test",
    cur: 15,
    lives: 7,
    inv: [
      {
        name: "other thing",
        desc: "this is a different thing",
        amount: 3,
      },
    ],
  },
];

let items = [
  {
    name: "Flashlight",
    desc: "This increases the chance to reach a destination safely.",
  },
  {
    name: "Stick",
    desc: "This is a weapon with a low attack chance.",
  },
  {
    name: "Sword",
    desc: "This is a weapon with a moderate attack chance.",
  },
];

function createCards() {
  players.forEach(function (el) {
    let itemHTML = ``;

    el.inv.forEach(function (item) {
      let itemAdd = `
      <li>
          <div>
            <p>${item.name}</p>
            <input type="number" value="${item.amount}"/>
          </div>
          <p style="font-size: 15px">${item.desc}</p>
        </li>
      `;

      itemHTML += itemAdd;
    });

    const card = `
    <div class="char-card" id="${el.name}_card">
        <input type="text" placeholder="Character name" class="pc-name" value="${el.name}" />
        <div class="card-line"></div>
        <p class="card-header">Main info</p>
        <div class="main-info">
          <div>
            <label for="char_num">Currency</label>
            <input type="number" id="char_num" value="${el.cur}"/>
          </div>
          <div>
            <label for="char_lives">Lives</label>
            <input type="number" id="char_lives" value="${el.lives}" />
          </div>
        </div>
        <div>
          <p class="card-header">Inventory</p>
          <ul class="inventory" id="${el.name}_card_items">
            ${itemHTML}
          </ul>
          <button class="card-delete" onclick="removeMember('${el.name}')">DELETE</button>
        </div>
      </div>
    `;

    document
      .getElementById("card-container")
      .insertAdjacentHTML("afterbegin", card);
  });
}

createCards();

function createItems() {
  items.forEach(function (el) {
    const itemAdd = `
    <li id="${el.name}_item">
      <p class="item-name">${el.name}</p>
      <p>${el.desc}</p>
      <div>
      <button onclick="giveItem('${el.name}')">Give</button>
      <button onclick="removeItem('${el.name}')">Remove</button>
      </div>      
    </li> 
    `;

    document
      .getElementById("item-list")
      .insertAdjacentHTML("afterbegin", itemAdd);
  });
}

createItems();

function giveItem(itemName) {
  const player = players.find(
    (f) => f.name === document.getElementById("receiver").value
  );
  const item = items.find((f) => f.name === itemName);
  const amount = document.getElementById("give-amount").value;

  const htmlAdd = `
  <li>
    <div>
      <p>${item.name}</p>
      <input type="number" id="${player.name}_card_items_${item.name}">
    </div>
    <div>
      <p style="font-size: 15px">${item.desc}</p>
      <button class="item-remove-button">Remove</button>
    </div>
  </li>
  `;

  //DOM manipulation
  document
    .getElementById(`${player.name}_card_items`)
    .insertAdjacentHTML("afterbegin", htmlAdd);

  //Local data save
}

function randomize(maxNum, id) {
  const rnd = Math.floor(Math.random() * maxNum + 1);
  document.getElementById(id).textContent = rnd;
}

function addMember() {}

function removeMember(name) {
  document.getElementById(`${name}_card`).remove();

  players.splice(players.findIndex((f) => f.name === name));
}

function removeItem(name) {
  document.getElementById(`${name}_item`).remove();

  items.splice(items.findIndex((f) => f.name === name));
}

//#region valueUpdate

function changeName(target, value) {
  players.find((f) => f.name === target).name = value;
}

function changeCur(target, value) {
  players.find((f) => f.name === target).name = value;
}

//#endregion

function addItem() {
  const name = document.getElementById("add-item-name");
  const desc = document.getElementById("add-item-desc");

  //DOM manipulation
  const html = `
  <li id="${name.value}_item">
      <p class="item-name">${name.value}</p>
      <p>${desc.value}</p>
      <div>
      <button onclick="giveItem('${name.value}')">Give</button>
      <button onclick="removeItem('${name.value}')">Remove</button>
      </div>      
    </li> 
  `;

  document.getElementById("item-list").insertAdjacentHTML("afterbegin", html);

  //Array modification
  items.push({ name: name.value, desc: desc.value });

  name.value = "";
  desc.value = "";
}
