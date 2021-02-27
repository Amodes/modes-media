<template>
  <div class="topBarContainer">
    <div class="name">Alexander Modes</div>
    <div class="linkContainer">
      <router-link class="linkItem" to="/">Photography</router-link>
      <router-link class="linkItem" to="/about">About</router-link>
    </div>
    <div class="socialMedia">
      <div class="row">
        <a class="icon github" target="_blank" href="https://github.com/amodes">
          <img src="../assets/icons/github.svg"
        /></a>

        <a
          class="icon linkedin"
          target="_blank"
          href="https://de.linkedin.com/in/alexander-modes-499215129"
        >
          <img src="../assets/icons/linkedin.svg" />
        </a>
      </div>
      <div class="row">
        <a
          class="icon medium"
          target="_blank"
          href="https://medium.com/@amodes"
        >
          <img src="../assets/icons/medium.svg" />
        </a>

        <a
          class="icon instagram"
          target="_blank"
          href="https://www.instagram.com/_amodes_/"
        >
          <img src="../assets/icons/instagram.svg" />
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Topbar",
});
</script>

<style scoped>
.topBarContainer {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  box-sizing: border-box;
}
@media (min-width: 800px) {
  .topBarContainer {
    padding: 20px 0 20px 20%;
    width: 80%;
    align-items: center;
  }
}
.name {
  width: 60px;
  font-family: "Playfair Display", serif;
  font-size: 18px;
  font-weight: 500;
  border-radius: 2px;
}

.socialMedia {
  display: flex;
  flex-direction: column;
}
.icon {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.github,
.linkedin,
.medium,
.instagram {
  transition: background-color 0.6s;
}
.github:hover {
  background-color: #e0e0e0;
}
.linkedin:hover {
  background-color: #8488d9;
}
.medium:hover {
  background-color: #8cdb8c;
}
.instagram:hover {
  background-color: #dca2eb;
}

img {
  display: block;
  height: 15px;
  width: 15px;
}

.row {
  display: flex;
  align-items: center;
}
.linkContainer {
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (min-width: 800px) {
  .linkContainer {
    width: 30%;
    flex-direction: row;
    justify-content: space-around;
    display: flex;
  }
}

.linkItem:hover {
  font-size: 18px;
  transition: font-size 0.2s;
}

@media (max-width: 800px) {
  .linkItem {
    padding-bottom: 10px;
  }
}
</style>
