<template>
  <div class="wrapper" v-for="(element, key) in emojis" :key="key">
    <div @click="handleClick(element)" class="emoji" :id="element.id">{{element.emoji}}</div>
    <div class="savedWrapper">
            Saved Animals {{savedAnimals.length}} / 6
            <div v-for="(animal, key) in savedAnimals" :key="key">{{animal}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface FunData {
  firstIteration: boolean;
  emojis: any;
  savedAnimals: [];
}

export default defineComponent({
  name: "Fun",
  data(): FunData {
    return {
      emojis: [
        { emoji: "🐒", id: "monkey" },
        { emoji: "🦍", id: "gorilla" },
        { emoji: "🐧", id: "penguin" },
        { emoji: "🦊", id: "fox" },
        { emoji: "🦙", id: "lama" },
        { emoji: "🐥", id: "chicken" },
        { emoji: "☠️", id: "skull" },
        { emoji: "🤯", id: "head" },
        { emoji: "💩", id: "poo" },
        { emoji: "🗡️", id: "sword" },
        { emoji: "🔫", id: "gun" },
        { emoji: "🔪", id: "knife" },
        { emoji: "🧨", id: "dynamite" },
        { emoji: "🚽", id: "toilet" },
        { emoji: "💣", id: "bomb" },
        { emoji: "💥", id: "explosion" },
        { emoji: "🔥", id: "fire" },
        { emoji: "❄️", id: "ice" },
        { emoji: "⚡", id: "lightning" },

      ],
      firstIteration: true,
      savedAnimals: [],
    };
  },
  methods: {
    makeNewPosition() {
      const h = window.innerWidth;
      const w = window.innerHeight;
      const nh = Math.floor(Math.random() * h);
      const nw = Math.floor(Math.random() * w);
      return [nh, nw];
    },

    animateDiv(element) {
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
        this.animateDiv(element);
      }, speed - 10);
    },
    calcSpeed(prev, next) {
      const x = Math.abs(prev[1] - next[1]);
      const y = Math.abs(prev[0] - next[0]);

      const greatest = x > y ? x : y;

      const speedModifier = 0.3;

      const speed = Math.ceil(greatest / speedModifier);

      return speed;
    },
    handleClick(element: any) {
      if (["monkey", "gorilla", "penguin", "fox", "lama", "chicken"].includes(element.id)) {
        // eslint-disable-next-line no-alert
        alert(`${element.id} saved`);
        document.getElementById(`${element.id}`).remove();
        this.savedAnimals.push(element.emoji);
      } else {
        // eslint-disable-next-line no-alert
        alert("Thats no animal :(");
      }
    },
  },
  mounted() {
    setTimeout(() => {
      this.firstIteration = false;
    }, 1000);
    document.querySelectorAll(".emoji").forEach((element) => {
      this.animateDiv(element);
    });
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
}
.emoji {
  cursor: pointer;
  z-index: 10;
  width: 50px;
  height: 50px;
  position: absolute;
}
</style>
