<template>
  <div class="topBarContainer">
    <div class="name">Alexander Modes</div>
    <router-link to="/">Photography</router-link>
    <router-link to="/about">About</router-link>
    <div class="socialMedia">
      <div class="row">
        <div class="icon">
          <a target="_blank" href="https://github.com/amodes">
            <img src="../assets/icons/github.svg"
          /></a>
        </div>

        <div class="icon">
          <a
            target="_blank"
            href="https://de.linkedin.com/in/alexander-modes-499215129"
          >
            <img src="../assets/icons/linkedin.svg" />
          </a>
        </div>
      </div>
      <div class="row">
        <div class="icon">
          <a target="_blank" href="https://medium.com/@amodes">
            <img src="../assets/icons/medium.svg" />
          </a>
        </div>
        <div class="icon">
          <a target="_blank" href="https://www.instagram.com/_amodes_/">
            <img src="../assets/icons/instagram.svg" />
          </a>
        </div>
      </div>
      <!-- <div class="icon">
        <a href="mailto:modes402@gmail.com">
          <img src="../assets/icons/mail.svg" />
        </a>
      </div> -->
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
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  box-sizing: border-box;
}
@media (min-width: 800px) {
  .topBarContainer {
    padding: 20px 0 20px 20%;
    width: 80%;
  }
}
.name {
  width: 100px;
  font-family: "Playfair Display", serif;
  font-size: 20px;
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
img {
  display: block;
  height: 15px;
  width: 15px;
}

path {
  stroke: green;
}
.row {
  display: flex;
  align-items: center;
}
</style>
