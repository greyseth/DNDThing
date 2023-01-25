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

function createCards() {
  players.forEach(function (el) {
    const itemHTML = ``;

    el.inv.forEach(function (item) {});

    const card = `
    <div class="char-card">
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
          <ul class="inventory">
            <li>
              <div>
                <p>Item name</p>
                <input type="number" />
              </div>
              <p style="font-size: 15px">Long ass description goes here</p>
            </li>
            <li>
              <div>
                <p>Item name</p>
                <input type="number" />
              </div>
              <p style="font-size: 15px">Long ass description goes here</p>
            </li>
            <li>
              <div>
                <p>Item name</p>
                <input type="number" />
              </div>
              <p style="font-size: 15px">Long ass description goes here</p>
            </li>
          </ul>
          <button class="card-delete">DELETE</button>
        </div>
      </div>
    `;
  });
}

const testingCards = false;

if (testingCards) {
  for (let i = 0; i < 10; i++) {
    const html = `
        <div class="char-card">
        <input type="text" placeholder="Character name" class="pc-name" />
        <div class="card-line"></div>
        <p class="card-header">Main info</p>
        <div class="main-info">
          <div>
            <label for="char_num">Currency</label>
            <input type="number" id="char_num" />
          </div>
          <div>
            <label for="char_lives">Lives</label>
            <input type="number" id="char_lives" value="10" />
          </div>
        </div>
        <div>
          <p class="card-header">Inventory</p>
          <ul class="inventory">
            <li>
              <div>
                <p>Item name</p>
                <input type="number" />
              </div>
              <p style="font-size: 15px">Long ass description goes here</p>
            </li>
            <li>
              <div>
                <p>Item name</p>
                <input type="number" />
              </div>
              <p style="font-size: 15px">Long ass description goes here</p>
            </li>
            <li>
              <div>
                <p>Item name</p>
                <input type="number" />
              </div>
              <p style="font-size: 15px">Long ass description goes here</p>
            </li>
          </ul>
          <button class="card-delete">DELETE</button>
        </div>
      </div>
        `;

    document
      .getElementById("card-container")
      .insertAdjacentHTML("afterbegin", html);
  }
}

function randomize(maxNum, id) {
  const rnd = Math.floor(Math.random() * maxNum + 1);
  document.getElementById(id).textContent = rnd;
}
