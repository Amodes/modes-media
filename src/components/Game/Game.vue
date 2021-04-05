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
        <Price v-if="price" :priceUrl="price" />
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
import {
  prices, emojis, animalIds,
} from "./constants";
import Price from "./Price.vue";
import { generateRandomNumberFromInterval } from "../../helpers/utilities";
import { calculateNewOffset, calculateSpeed, calculateNewPosition } from "./helpers";

interface Emoji {
  emoji: string;
  id: string;
}

interface GameData {
  firstIteration: boolean;
  emojis: Emoji[];
  clickedBadThings: [];
  savedAnimals: [];
  lifes: number;
  hasLost: boolean;
  hasWon: boolean;
  time: number;
  price: string;
  tabKey: number;
}

export default defineComponent({
  name: "Game",
  components: { Price },

  data(): GameData {
    return {
      emojis: window.innerWidth < 800 ? emojis.slice(0, emojis.length - 5) : emojis,
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
    transformEmojis(element) {
      element.style.fontSize = `${generateRandomNumberFromInterval(16, 35)}px`;

      const newOffset = calculateNewOffset();
      const top = element.offsetTop;
      const left = element.offsetLeft;
      const speed = calculateSpeed({ top, left }, newOffset);
      const newPosition = calculateNewPosition(newOffset);

      if (Math.random() > 0.2 || this.firstIteration) {
        element.animate(
          [
            { transform: `translateX(${newPosition.x})` },
            { transform: `translateY(${newPosition.y})` },
            { transform: "rotate(180deg)" },
          ],
          {
            duration: speed,
          },
        );
      }

      setTimeout(() => {
        element.style.left = `${newOffset.left}px`;
        element.style.top = `${newOffset.top}px`;
        if (!this.hasLost && !this.hasWon) {
          this.transformEmojis(element);
        }
      }, speed - 10);
    },
    handleClick(emojiData: Emoji) {
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
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 5px;
  box-sizing: border-box;
}

.game-data-section {
  background-color: rgb(180, 223, 190);
  opacity: 0.2;
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

.won-title {
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
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
