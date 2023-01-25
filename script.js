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
          <ul class="inventory" id="${el.name}_inv">
            ${itemHTML}
          </ul>
          <button class="card-delete" onclick="${el.name}">DELETE</button>
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
    <li>
      <p class="item-name">${el.name}</p>
      <p>${el.desc}</p>
      <button onclick="giveItem(${el.name})">Give</button>
    </li> 
    `;

    document
      .getElementById("item-list")
      .insertAdjacentHTML("afterbegin", itemAdd);
  });
}

function updateItems(player) {
  const char = players.find((f) => f.name === player);
}

createItems();

function giveItem(itemName) {
  const player = players.find(
    (f) => f.name === document.getElementById("receiver").value
  );
  const item = items.find((f) => itemName);
  const amount = document.getElementById("give-amount").value;

  if (player.inv.find((f) => f.name === itemName)) {
    player.inv.find((f) => f.name === itemName).amount += amount;
  } else {
    player.inv.push({ name: item.name, desc: item.desc, amount: amount });
  }
}

function randomize(maxNum, id) {
  const rnd = Math.floor(Math.random() * maxNum + 1);
  document.getElementById(id).textContent = rnd;
}

function addMember() {}

function removeMember(id) {}

// function giveItem(itemName) {
//   const receiver = document.getElementById('receiver').value;
//   const amount = document.getElementById('give-amount').value;

//   const sel = players.find((el) => el.name === receiver);
//   sel.inv.push()
// }
