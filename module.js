import supabase from "./dndb/src/supabase.js";

let players = [
  {
    name: "Seth Grayson",
    cur: 10,
    lives: 10,
    inv: ["Sword"],
  },
  {
    name: "Ron Corel",
    cur: 15,
    lives: 7,
    inv: ["Sword"],
  },
  {
    name: "test",
    cur: 15,
    lives: 7,
    inv: ["Sword"],
  },
];

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
  {
    name: "Id Card",
    desc: "The character's identification card.",
  },
];

const defaultLives = 10;
let lastIndex = 0;

function createCards() {
  players.forEach(function (el) {
    let itemHTML = ``;

    el.inv.forEach(function (item) {
      let itemAdd = `
      <li id="${el.name}_card_items_${item}">
          <div>
            <p>${item}</p>
          </div>
          <div>
            <p style="font-size: 15px">${
              items.find((f) => f.name === item).desc
            }</p>
            <button class="item-remove-button" onclick="removePlayerItem('${
              el.name
            }', '${item}')"
            id="${el.name}_card_items_${item}_del">Remove</button>
          </div>
        </li>
      `;

      itemHTML += itemAdd;
    });

    const card = `
  <div class="char-card" id="${el.name}_card">
    <input type="text" 
    placeholder="Character name" 
    class="pc-name"
    value="${el.name}"
    id="${el.name}_card_name" />
    <button onclick="updateName('${el.name}')" id="${el.name}_card_update">S</button>
    <div class="card-line"></div>
    <p class="card-header">Main info</p>
    <div class="main-info">
      <div>
        <label for="${el.name}_card_cur">Currency</label>
        <input type="number" id="${el.name}_card_cur" onchange="updateCur('${el.name}')"/>
      </div>
      <div>
        <label for="${el.name}_card_lives">Lives</label>
        <input type="number" id="${el.name}_card_lives" value="${el.lives}" onchange="updateLives('${el.name}')"/>
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
