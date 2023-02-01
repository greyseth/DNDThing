// let players = [
//   {
//     id: 0,
//     name: "Seth Grayson",
//     cur: 10,
//     lives: 10,
//     inv: ["Id Card", "Sword"],
//   },
//   {
//     id: 1,
//     name: "Ron Corel",
//     cur: 15,
//     lives: 7,
//     inv: ["Id Card", "Sword"],
//   },
//   {
//     id: 2,
//     name: "test",
//     cur: 15,
//     lives: 7,
//     inv: ["Id Card", "Sword"],
//   },
// ];

let players = [];
let items = [];

function randomize(maxNum, id) {
  const rnd = Math.floor(Math.random() * maxNum + 1);
  document.getElementById(id).textContent = rnd;
}

const defaultLives = 10;
let lastIndex = 0;

function addMember() {
  const html = `
  <div class="char-card" id="${lastIndex}_card">
    <input type="text" 
    placeholder="Character name" 
    class="pc-name"
    id="${lastIndex}_card_name"/>
    <button onclick="updateName(${lastIndex})" id="${lastIndex}_card_update">S</button>
    <div class="card-line"></div>
    <p class="card-header">Main info</p>
    <div class="main-info">
      <div>
        <label for="${lastIndex}_card_cur">Currency</label>
        <input type="number" id="${lastIndex}_card_cur" onchange="updateCur(${lastIndex})"/>
      </div>
      <div>
        <label for="${lastIndex}_card_lives">Lives</label>
        <input type="number" id="${lastIndex}_card_lives" value="${defaultLives}" onchange="updateLives('${lastIndex}')"/>
      </div>
    </div>
    <div>
      <p class="card-header">Inventory</p>
      <ul class="inventory" id="${lastIndex}_card_items">
      <li id="${lastIndex}_card_items_Id Card">
              <div>
                <p>Id Card</p>
              </div>
              <div>
                <p style="font-size: 15px">The character's identification card.</p>
                <button
                  class="item-remove-button"
                  onclick="removePlayerItem(${lastIndex}, 'Id Card')"
                >
                  Remove
                </button>
              </div>
            </li>
      </ul>
      <button class="card-delete" onclick="removeMember(${lastIndex})" id="${lastIndex}_card_delete">DELETE</button>
    </div>
  </div>
  `;

  document
    .getElementById("card-container")
    .insertAdjacentHTML("afterbegin", html);
  //   players.push({
  //     name: `${lastIndex}`,
  //     cur: 0,
  //     lives: defaultLives,
  //     inv: ["Id Card"],
  //   });
  pushPlayer({
    id: lastIndex,
    name: ``,
    cur: 0,
    lives: defaultLives,
    inv: ["Id Card"],
  });
  lastIndex++;
}

// let isUpdating = false;
function updateName(target) {
  updatePlayerName(
    target,
    document.getElementById(`${target}_card_name`).value
  );
}

function updateCur(target) {
  players.find((f) => f.id === target).cur = document.getElementById(
    `${target}_card_cur`
  ).value;
}

function updateLives(target) {
  players.find((f) => f.id === target).lives = document.getElementById(
    `${target}_card_lives`
  ).value;
}

function removeMember(target) {
  document.getElementById(`${target}_card`).remove();

  deletePlayer(target);
}

function removePlayerItem(target, item) {
  document.getElementById(`${target}_card_items_${item}`).remove();

  const player = players.find((f) => f.id === target);
  player.inv.splice(player.inv.findIndex((f) => f.name === item));
}

//Item functions
function giveItem(itemTarget) {
  const receiver = document.getElementById(`receiver`);
  const amount = document.getElementById("give-amount");
  const player = players.find((f) => f.name === receiver.value);
  const parent = document.getElementById(`${player.id}_card_items`);
  const item = items.find((f) => f.name === itemTarget);
  console.log(player.id);
  const html = `
  <li id="${player.id}_card_items_${item.name}">
    <div>
      <p>${item.name}</p>
    </div>
    <div>
      <p style="font-size: 15px">${item.desc}</p>
      <button class="item-remove-button" onclick="removePlayerItem(${player.id}, '${item.name}')"
      id="${player.id}_card_items_${item.name}_del">Remove</button>
    </div>
  </li>
  `;

  for (let i = 0; i < amount.value; i++) {
    parent.insertAdjacentHTML("afterbegin", html);
    player.inv.push(item.name);
  }
}

function removeItem(name) {
  document.getElementById(`${name}_item`).remove();

  deleteItem(name);
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
  //   import {items} from'./module.js';
  //   items.push({ name: name.value, desc: desc.value });
  pushToItems({ name: name.value, desc: desc.value });

  name.value = "";
  desc.value = "";
}

function logPlayers() {
  console.log(players);
}

function logPlayersDB() {
  testGetPlayers();
}
