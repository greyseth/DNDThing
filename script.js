const testingCards = true;

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
