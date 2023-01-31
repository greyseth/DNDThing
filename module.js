import supabase from "./dndb/src/supabase.js";

// Player Management
async function pushPlayerDB(newData) {
  const { data, error } = await supabase.from("players").insert([
    {
      id: newData.id,
      name: newData.name,
      currency: newData.cur,
      items: newData.inv,
    },
  ]);
}

window.pushPlayer = (data) => {
  players.push(data);
  pushPlayerDB(data);
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

//Item management
async function pushItemDB(newData) {
  const { data, error } = await supabase
    .from("items")
    .insert([{ name: newData.name, desc: newData.desc }]);
}

window.pushToItems = (toPush) => {
  items.push(toPush);
  pushItemDB(toPush);
};

async function spliceItemDB(toDel) {
  const { data, error } = await supabase
    .from("items")
    .delete()
    .eq("name", toDel);
}

window.deleteItem = (select) => {
  items.splice(items.findIndex((f) => f.name === select));
  spliceItemDB(select);
};

async function queryPlayers() {
  const { data: users, error } = await supabase.from("players").select("*");
  users.map(function (el) {
    const toAdd = {
      id: el.id,
      name: el.name,
      cur: el.currency,
      lives: el.lives,
      inv: el.items,
    };
    players.push(toAdd);
  });

  createCards();
}

async function queryItems() {
  const { data, error } = await supabase.from("items").select("*");
  data.map(function (el) {
    items.push({
      name: el.name,
      desc: el.desc,
    });
  });

  createItems();

  await queryPlayers();
}

queryItems();

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
// createCards();

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
// createItems();

async function updateAll() {
  const { data: users, error } = await supabase.from("players");
  players.forEach(function (p) {});
}
