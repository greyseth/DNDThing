let players = [
  {
    name: "Seth Grayson",
    cur: 10,
    lives: 10,
    inv: [
      {
        name: "this thing",
        desc: "this is a something",
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

const defaultLives = 10;
let lastIndex = 0;

function createCards() {
  players.forEach(function (el) {
    let itemHTML = ``;

    el.inv.forEach(function (item) {
      let itemAdd = `
      <li id="${el.name}_card_items_${item.name}">
          <div>
            <p>${item.name}</p>
          </div>
          <div>
            <p style="font-size: 15px">${item.desc}</p>
            <button class="item-remove-button" onclick="removePlayerItem('${el.name}', '${item.name}')"
            id="${el.name}_card_items_${item.name}_del">Remove</button>
          </div>
        </li>
      `;

      itemHTML += itemAdd;
    });

    const card = `
    <div class="char-card" id="${el.name}_card">
        <input type="text" placeholder="Character name" class="pc-name" value="${el.name}" id="${el.name}_card_name"
        onchange="updateName('${el.name}')"/>
        <div class="card-line"></div>
        <p class="card-header">Main info</p>
        <div class="main-info">
          <div>
            <label for="${el.name}_card_cur">Currency</label>
            <input type="number" id="${el.name}_card_cur" value="${el.cur}" onchange="updateCur('${el.name}')"/>
          </div>
          <div>
            <label for="${el.name}_card_lives">Lives</label>
            <input type="number" id="${el.name}_card_lives" value="${el.lives}" onchange="updateLives('${el.name}')/>
          </div>
        </div>
        <div>
          <p class="card-header">Inventory</p>
          <ul class="inventory" id="${el.name}_card_items">
            ${itemHTML}
          </ul>
          <button class="card-delete" onclick="removeMember('${el.name}')" id="${el.name}_card_delete">DELETE</button>
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
  <li  id="${player.name}_card_items_${item.name}">
    <div>
      <p>${item.name}</p>
    </div>
    <div>
      <p style="font-size: 15px">${item.desc}</p>
      <button class="item-remove-button" id="${player.name}_card_items_${item.name}_del" onclick="removePlayerItem('${player.name}', '${item.name}')">Remove</button>
    </div>
  </li>
  `;

  //DOM manipulation
  for (let i = 0; i < amount; i++) {
    document
      .getElementById(`${player.name}_card_items`)
      .insertAdjacentHTML("afterbegin", htmlAdd);

    players
      .find((f) => player.name)
      .inv.push({ name: item.name, desc: item.desc });
  }
}

function randomize(maxNum, id) {
  const rnd = Math.floor(Math.random() * maxNum + 1);
  document.getElementById(id).textContent = rnd;
}

function addMember() {
  const html = `
  <div class="char-card" id="${lastIndex}_card">
    <input type="text" 
    placeholder="Character name" 
    class="pc-name"
    id="${lastIndex}_card_name"
    onchange="updateName('${lastIndex}')" />
    <div class="card-line"></div>
    <p class="card-header">Main info</p>
    <div class="main-info">
      <div>
        <label for="${lastIndex}_card_cur">Currency</label>
        <input type="number" id="${lastIndex}_card_cur" onchange="updateCur('${lastIndex}')"/>
      </div>
      <div>
        <label for="${lastIndex}_card_lives">Lives</label>
        <input type="number" id="${lastIndex}_card_lives" value="${defaultLives}" onchange="updateLives('${lastIndex}')"/>
      </div>
    </div>
    <div>
      <p class="card-header">Inventory</p>
      <ul class="inventory" id="${lastIndex}_card_items">
      </ul>
      <button class="card-delete" onclick="removeMember('${lastIndex}')" id="${lastIndex}_card_delete">DELETE</button>
    </div>
  </div>
  `;

  document
    .getElementById("card-container")
    .insertAdjacentHTML("afterbegin", html);
  players.push({ name: `${lastIndex}`, cur: 0, lives: defaultLives, inv: [] });
  lastIndex++;
}

function testUpdateName(target) {
  if (document.getElementById(`${target}_card_name`).value) {
    console.log(document.getElementById(`${target}_card_name`).value);
  }
}

function updateName(target) {
  const change = document.getElementById(`${target}_card_name`).value;

  const card = document.getElementById(`${target}_card`);
  const name = document.getElementById(`${target}_card_name`);
  const cur = document.getElementById(`${target}_card_cur`);
  const lives = document.getElementById(`${target}_card_lives`);
  const inv = document.getElementById(`${target}_card_items`);
  const del = document.getElementById(`${target}_card_delete`);

  card.id = change;
  name.id = `${change}_card_name`;
  name.setAttribute("onchange", updateName(change));
  cur.id = `${change}_card_cur`;
  cur.setAttribute("onchange", updateCur(change));
  lives.id = `${change}_card_lives`;
  lives.setAttribute("onchange", updateLives(change));
  inv.id = `${change}_card_items`;
  del.id = `${change}_card_delete`;
  del.setAttribute("onclick", removeMember(change));

  players
    .find((f) => f.name === target)
    .inv.forEach(function (el) {
      document.getElementById(
        `${target}_card_items_${el.name}`
      ).id = `${change}_card_items_${el.name}`;
      document.getElementById(
        `${target}_card_items_${el.name}_del`
      ).onclick = `removePlayerItem('${change}', '${el.name}')`;
    });

  players.find((f) => f.name === target).name = change;
}

function updateCur(target) {
  const amount = document.getElementById(`${target}_card_cur`).value;
  players.find((f) => f.name === target).cur = amount;
}

function updateLives(target) {
  const amount = document.getElementById(`${target}_card_lives`).value;
  players.find((f) => f.name === target).lives = amount;
}

function removeMember(name) {
  document.getElementById(`${name}_card`).remove();

  players.splice(players.findIndex((f) => f.name === name));
}

function removePlayerItem(player, item) {
  //DOM
  document.getElementById(`${player}_card_items_${item}`).remove();

  //Array
  const p = players.find((f) => f.name === player);
  p.inv.splice(p.inv.findIndex((f) => f.name === item));
}

function removeItem(name) {
  document.getElementById(`${name}_item`).remove();

  items.splice(items.findIndex((f) => f.name === name));
}

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
