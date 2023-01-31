import supabase from "./dndb/src/supabase.js";

// Player Management
window.pushPlayer = (data) => {
  players.push(data);
};

window.updatePlayerName = (select, data) => {
  players.find((f) => f.id === select).name = data;
};

window.updatePlayerCur = (select, data) => {
  players.find((f) => f.id === select).cur = data;
};

window.updatePlayerLives = (select, data) => {
  players.find((f) => f.id === select).lives = data;
};

window.deletePlayer = (select) => {
  players.splice(players.findIndex((f) => f.id === select));
};
// Why didnt i just make the same functions inside the other script? hell if i know...

// queryPlayers();
// async function queryPlayers() {
//   const { data: users, error } = await supabase.from("players").select("*");
//   users.map(function (el) {
//     const toAdd = {
//       name: el.name,
//       cur: el.currency,
//       lives: el.lives,
//       inv: el.items,
//     };
//     players.push(toAdd);
//   });

//   createCards();
//   // console.log(players);
//   // console.log(users);

//   console.log(users);
//   console.log(players);
// }

// let items = [
//   {
//     name: "Flashlight",
//     desc: "This increases the chance to reach a destination safely.",
//   },
//   {
//     name: "Stick",
//     desc: "This is a weapon with a low attack chance.",
//   },
//   {
//     name: "Sword",
//     desc: "This is a weapon with a moderate attack chance.",
//   },
//   {
//     name: "Id Card",
//     desc: "The character's identification card.",
//   },
// ];

//Item management
window.pushToItems = (toPush) => {
  items.push(toPush);
};

window.deleteItem = (select) => {
  items.splice(items.findIndex((f) => f.name === select));
};

function createCards() {
  players.forEach(function (el) {
    let itemHTML = ``;

    el.inv.forEach(function (item) {
      let itemAdd = `
      <li id="${el.id}_card_items_${item}">
          <div>
            <p>${item}</p>
          </div>
          <div>
            <p style="font-size: 15px">${
              items.find((f) => f.name === item).desc
            }</p>
            <button class="item-remove-button" onclick="removePlayerItem(${
              el.id
            }, '${item}')"
            id="${el.id}_card_items_${item}_del">Remove</button>
          </div>
        </li>
      `;

      itemHTML += itemAdd;
    });

    const card = `
  <div class="char-card" id="${el.id}_card">
    <input type="text" 
    placeholder="Character name" 
    class="pc-name"
    value="${el.name}"
    id="${el.id}_card_name" />
    <button onclick="updateName(${el.id})" id="${el.id}_card_update">S</button>
    <div class="card-line"></div>
    <p class="card-header">Main info</p>
    <div class="main-info">
      <div>
        <label for="${el.id}_card_cur">Currency</label>
        <input type="number" id="${el.id}_card_cur" onchange="updateCur(${el.id})"/>
      </div>
      <div>
        <label for="${el.id}_card_lives">Lives</label>
        <input type="number" id="${el.id}_card_lives" value="${el.lives}" onchange="updateLives(${el.id})"/>
      </div>
    </div>
    <div>
      <p class="card-header">Inventory</p>
      <ul class="inventory" id="${el.id}_card_items">
        ${itemHTML}
      </ul>
      <button class="card-delete" onclick="removeMember(${el.id})" id="${el.id}_card_delete">DELETE</button>
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
