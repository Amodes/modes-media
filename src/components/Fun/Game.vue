<template :key="tabKey">
  <div class="wrapper" v-for="(element, key) in emojis" :key="key">
    <div @click="handleClick(element)" class="emoji" :id="element.id">
      {{ element.emoji }}
    </div>
    <div class="game-data-section">
      <div>Time {{ time }}</div>
      <div>Lifes {{ lifes }} / 2</div>
      Saved Animals {{ savedAnimals.length }} / 6
      <div v-for="(animal, key) in savedAnimals" :key="key">{{ animal }}</div>
    </div>
  </div>
  <div v-if="hasLost || hasWon" class="popup">
    <div class="overlay" />
    <div class="popup-content">
      <div v-if="hasLost">😿😿😿 You couldn't save all animals.</div>
      <div class="won-container" v-else>
        <div class="won-title">😸😸😸 You saved all animals!</div>
        <button v-if="!price" class="button" @click="setPrice()">
          🎁 Get your price
        </button>
        <div class="price" v-if="price">
          <div class="won-description">You won a giphy 🎉</div>
          <iframe
            :src="price"
            width="100%"
            height="300px"
            frameBorder="0"
            class="giphy-embed"
            style="pointer-events: none"
            allowFullScreen
          ></iframe>
          <p>
            <a href="https://giphy.com/gifs/myuLckXB7OjfGw1gSb">via GIPHY</a>
          </p>
        </div>
      </div>
      <div class="bottom-button-bar">
        <button class="button restart" @click="resetAndStart()">
          ♻️ Try again
        </button>
        <button class="button" @click="closeGame()">✖️ Close</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface GameData {
  firstIteration: boolean;
  emojis: any;
  clickedBadThings: [];
  savedAnimals: [];
  lifes: number;
  hasLost: boolean;
  hasWon: boolean;
  time: number;
  price: string;
  tabKey: number;
}
const prices = [
  "https://giphy.com/embed/WU8nnAdxZWeM8",
  "https://giphy.com/embed/myuLckXB7OjfGw1gSb",
  "https://giphy.com/embed/RyqiL8NJMUzvi",
  "https://giphy.com/embed/401riYDwVhHluIByQH",
  "https://giphy.com/embed/cYejmY7tuJ4HTmBYHP",
];
const emojis = [
  { emoji: "🐒", id: "monkey" },
  { emoji: "🦍", id: "gorilla" },
  { emoji: "🐧", id: "penguin" },
  { emoji: "🦊", id: "fox" },
  { emoji: "🦙", id: "lama" },
  { emoji: "🐥", id: "chicken" },
  { emoji: "☠️", id: "skull" },
  { emoji: "🤯", id: "head" },
  { emoji: "💩", id: "Donald Trump" },
  { emoji: "🗡️", id: "sword" },
  { emoji: "🔫", id: "gun" },
  { emoji: "🔪", id: "knife" },
  { emoji: "🧨", id: "dynamite" },
  { emoji: "🚽", id: "Afd" },
  { emoji: "💣", id: "bomb" },
  { emoji: "💥", id: "explosion" },
  { emoji: "🔥", id: "fire" },
  { emoji: "❄️", id: "ice" },
  { emoji: "⚡", id: "lightning" },
];
const animalIds = ["monkey", "gorilla", "penguin", "fox", "lama", "chicken"];
// The higher this number the easier the game gets
const DIFFICULTY = 0.1;

const randomIntFromInterval = (min: number, max: number): number => {
  const random = Math.floor(Math.random() * (max - min + 1) + min);
  return random;
};

export default defineComponent({
  name: "Game",
  data(): GameData {
    return {
      emojis,
      firstIteration: true,
      clickedBadThings: [],
      savedAnimals: [],
      lifes: 2,
      hasLost: false,
      hasWon: false,
      time: 60,
      price: "",
      tabKey: 0,
    };
  },
  props: { onClose: Function },
  methods: {
    makeNewPosition() {
      const h = window.innerWidth;
      const w = window.innerHeight;
      const nh = Math.floor(Math.random() * h);
      const nw = Math.floor(Math.random() * w);
      return [nh, nw];
    },

    transformEmojis(element) {
      element.style.fontSize = `${randomIntFromInterval(10, 40)}px`;

      const newq = this.makeNewPosition();
      const top = element.offsetTop;
      const left = element.offsetLeft;
      const speed = this.calcSpeed([top, left], newq);
      const negativeX = Math.random() < 0.5;
      const negativeY = Math.random() < 0.5;
      let newX;
      let newY;
      if (negativeX) {
        newX = `-${newq[0]}px`;
      } else {
        newX = `${newq[0]}px`;
      }

      if (negativeY) {
        newY = `-${newq[1]}px`;
      } else {
        newY = `${newq[1]}px`;
      }

      if (Math.random() > 0.2 || this.firstIteration) {
        element.animate(
          [
            { transform: `translateX(${newX})` },
            { transform: `translateY(${newY})` },
            { transform: "rotate(180deg)" },
          ],
          {
            duration: speed,
          },
        );
      }

      setTimeout(() => {
        element.style.left = `${newq[0]}px`;
        element.style.top = `${newq[1]}px`;
        if (!this.hasLost && !this.hasWon) {
          this.transformEmojis(element);
        }
      }, speed - 10);
    },
    calcSpeed(prev, next) {
      const x = Math.abs(prev[1] - next[1]);
      const y = Math.abs(prev[0] - next[0]);
      const greatest = x > y ? x : y;
      const speedModifier = DIFFICULTY;
      const speed = Math.ceil(greatest / speedModifier);
      return speed;
    },
    handleClick(emojiData: any) {
      if (this.hasWon || this.hasLost) {
        return;
      }
      const animalClicked = animalIds.includes(emojiData.id);

      const clickedEmoji = document.getElementById(emojiData.id);

      clickedEmoji.style.fontSize = "100px";

      setTimeout(() => {
        if (animalClicked) {
          if (this.savedAnimals.includes(emojiData.emoji)) {
            return;
          }
          // eslint-disable-next-line no-alert
          alert(`${emojiData.id} saved`);
          this.savedAnimals.push(emojiData.emoji);
          clickedEmoji.style.display = "none";
        } else {
          if (this.clickedBadThings.includes(emojiData.emoji)) {
            return;
          }
          // eslint-disable-next-line no-alert
          alert(
            `You touched the dangerous ${emojiData.id}. You lost one life.`,
          );
          clickedEmoji.style.fontSize = "20px";
          this.clickedBadThings.push(emojiData.emoji);
          this.lifes -= 1;
        }

        if (this.lifes === 0) {
          this.hasLost = true;
        }
        if (this.savedAnimals.length === 6) {
          this.hasWon = true;
        }
      }, 400);
    },
    startGame() {
      setTimeout(() => {
        this.firstIteration = false;
      }, 1000);
      document.querySelectorAll(".emoji").forEach((element) => {
        this.transformEmojis(element);
      });
    },
    resetAndStart() {
      this.firstIteration = true;
      this.savedAnimals = [];
      this.clickedBadThings = [];

      this.lifes = 2;
      this.hasLost = false;
      this.hasWon = false;
      this.time = 60;
      this.price = "";
      this.tabKey += 1;
      animalIds.forEach((id) => {
        document.getElementById(id).style.display = "block";
      });
      this.startGame();
    },
    reduceTime() {
      if (!this.hasLost && !this.hasWon) {
        this.time -= 1;
      }
      if (this.time === 0) {
        this.hasLost = true;
      }
    },
    setPrice() {
      if (!this.price) {
        this.price = prices[Math.floor(Math.random() * prices.length)];
      }
    },
    closeGame() {
      this.onClose();
    },
  },
  mounted() {
    document.querySelector("body").style.overflowY = "hidden";
    setInterval(this.reduceTime, 1000);
    this.startGame();
  },
  beforeUnmount() {
    document.querySelector("body").style.overflowY = "auto";
  },
});
</script>

<style scoped>
.wrapper {
  overflow-x: hidden;
  overflow-y: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 5px;
  box-sizing: border-box;
}

.game-data-section {
  background-color: #fff;
  opacity: 0.1;
  font-size: 12px;
  border-radius: 4px;
  padding: 5px;
  width: 160px;
}

.emoji {
  cursor: pointer;
  z-index: 2;
  width: 50px;
  height: 50px;
  position: absolute;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  transition: font-size 0.2s;
}

.popup {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
}

.overlay {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.5;
}

.popup-content {
  width: 80%;
  max-height: 90%;
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
  z-index: 4;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.won-container {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.wont-title {
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
}

@media (max-width: 800px) {
  .won-description {
    padding-bottom: 5px;
  }
}

.price {
  display: flex;
  align-items: center;
  flex-direction: row;
}

@media (max-width: 800px) {
  .price {
    flex-direction: column;
  }
}

.bottom-button-bar {
  padding-top: 10px;
  display: flex;
  width: 230px;
  justify-content: space-between;
}

.button {
  padding: 10px;
  background-color: #abab;
  border-radius: 4px;
  margin-top: 10px;
}

.button:hover {
  background-color: rgba(117, 128, 117, 0.673);
}
</style>
