import logo from "./logo.svg";
import "./App.css";
import "./styles.css";
import { useEffect, useState } from "react";

import coinImg from "./img/coin.png";
import diceImg from "./img/d6.png";
import d20Img from "./img/d20.png";

function App() {
  return (
    <>
      <Header />
      <CardContainer />

      <section className="second-container">
        <Randomizers />
        <ItemManager />
      </section>
    </>
  );
}

function Header() {
  return (
    <header>
      <button>Save</button>
      <button onclick="addMember()">Add new character</button>
    </header>
  );
}

function CardContainer() {
  return (
    <section className="card-container" id="card-container">
      <CharCard />
    </section>
  );
}

function CharCard() {
  return (
    <div className="char-card" id="test_card">
      <input type="text" placeholder="Character name" className="pc-name" />
      <div className="card-line"></div>
      <p className="card-header">Main info</p>
      <div className="main-info">
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
        <p className="card-header">Inventory</p>
        <ul className="inventory" id="test_card_items">
          <li id="test_card_items_testitem">
            <div>
              <p>Item name</p>
              <input type="number" id="test_card_items_testitem_amount" />
            </div>
            <div>
              <p style={{ fontSize: "15px" }}>Long ass description goes here</p>
              <button
                className="item-remove-button"
                onclick="removePlayerItem('test', 'testitem')"
              >
                Remove
              </button>
            </div>
          </li>
          <li>
            <div>
              <p>Item name</p>
              <input type="number" />
            </div>
            <p style={{ fontSize: "15px" }}>Long ass description goes here</p>
          </li>
          <li>
            <div>
              <p>Item name</p>
              <input type="number" />
            </div>
            <p style={{ fontSize: "15px" }}>Long ass description goes here</p>
          </li>
        </ul>
        <button class="card-delete" onclick="removeMember('test')">
          DELETE
        </button>
      </div>
    </div>
  );
}

function Randomizers() {
  const [coinVal, setCoin] = useState("Coin");
  const [diceVal, setDice] = useState(6);
  const [d20Val, setd20] = useState(20);

  function getRandom(maxNum) {
    return Math.floor(Math.random() * maxNum + 1);
  }

  return (
    <div className="rnd-buttons">
      <button
        style={{ backgroundImage: coinImg }}
        onclick={() => setCoin((a) => (a = getRandom(2)))}
        id="coin-btn"
      >
        {coinVal}
      </button>
      <button
        style={{ backgroundImage: diceImg }}
        onclick={getRandom(6)}
        id="d6-btn"
      >
        {diceVal}
      </button>
      <button
        style={{ backgroundImage: d20Img }}
        onclick={getRandom(20)}
        id="d20-btn"
      >
        {d20Val}
      </button>
    </div>
  );
}

function ItemManager() {
  <div className="item-list-container">
    <ul className="item-list" id="item-list">
      <li id="test_item">
        <p className="item-name">Item name</p>
        <p>Long ass description goes here</p>
        <div>
          <button>Give</button>
          <button onclick="removeItem('test')">Remove</button>
        </div>
      </li>
    </ul>
  </div>;
}

export default App;
