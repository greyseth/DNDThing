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
    id="${lastIndex}_card_name"/>
    <button onclick="updateName('${lastIndex}')" id="${lastIndex}_card_update">S</button>
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
      <li id="${lastIndex}_card_items_Id Card">
              <div>
                <p>Id Card</p>
              </div>
              <div>
                <p style="font-size: 15px">The character's identification card.</p>
                <button
                  class="item-remove-button"
                  onclick="removePlayerItem('${lastIndex}', 'Id Card')"
                >
                  Remove
                </button>
              </div>
            </li>
      </ul>
      <button class="card-delete" onclick="removeMember('${lastIndex}')" id="${lastIndex}_card_delete">DELETE</button>
    </div>
  </div>
  `;

  document
    .getElementById("card-container")
    .insertAdjacentHTML("afterbegin", html);
  players.push({
    name: `${lastIndex}`,
    cur: 0,
    lives: defaultLives,
    inv: ["Id Card"],
  });
  lastIndex++;
}

let isUpdating = false;
function updateName(target) {
  if (isUpdating) return;

  isUpdating = true;

  const change = document.getElementById(`${target}_card_name`).value;

  const card = document.getElementById(`${target}_card`);
  const update = document.getElementById(`${target}_card_update`);
  const name = document.getElementById(`${target}_card_name`);
  const cur = document.getElementById(`${target}_card_cur`);
  const lives = document.getElementById(`${target}_card_lives`);
  const inv = document.getElementById(`${target}_card_items`);
  const del = document.getElementById(`${target}_card_delete`);

  card.id = change;
  update.id = `${change}_card_update`;
  update.setAttribute("onclick", `updateName('${change}')`);
  name.id = `${change}_card_name`;
  cur.id = `${change}_card_cur`;
  cur.setAttribute("onchange", `updateCur('${change}')`);
  lives.id = `${change}_card_lives`;
  lives.setAttribute("onchange", `updateLives('${change}')`);
  inv.id = `${change}_card_items`;
  del.id = `${change}_card_delete`;
  del.setAttribute("onclick", `removeMember('${change}')`);

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

  document.getElementById(`${change}_card_name`).setAttribute("value", change);

  isUpdating = false;
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
