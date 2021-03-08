<template>
  <div class="topbar-container">
    <div class="name" @click="handleMenuClick('/')">Alexander Modes</div>
    <div class="right-side-container">
      <div class="link-container">
        <div
          class="link-item"
          v-bind:class="{ linkItem: true, active: activePage === '/' }"
          @click="handleMenuClick('/')"
        >
          Photography
        </div>
        <div
          class="link-item"
          v-bind:class="{ linkItem: true, active: activePage === '/about' }"
          @click="handleMenuClick('/about')"
        >
          About
        </div>
      </div>
      <div class="social-media">
        <div class="row">
          <a
            class="icon github"
            target="_blank"
            href="https://github.com/amodes"
          >
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
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Topbar",
  data() {
    return { activePage: window.location.pathname };
  },
  methods: {
    handleMenuClick(item: string) {
      this.activePage = item;
      this.$router.push(item);
    },
  },
});
</script>

<style scoped>
.topbar-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  box-sizing: border-box;
}

@media (min-width: 800px) {
  .topbar-container {
    padding: 20px 0 20px 20%;
    width: 80%;
    align-items: center;
  }
}

.name {
  cursor: pointer;
  width: 60px;
  font-family: "Playfair Display", serif;
  font-size: 18px;
  font-weight: 500;
  border-radius: 2px;
}

.right-side-container {
  display: flex;
}

@media (max-width: 800px) {
  .right-side-container {
    width: 50%;
    justify-content: space-between;
  }
}

.social-media {
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

.link-container {
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (min-width: 800px) {
  .link-container {
    flex-direction: row;
    justify-content: space-around;
    display: flex;
    padding-right: 50px;
  }
}

.link-item {
  cursor: pointer;
  padding-bottom: 2px;
}

@media (min-width: 800px) {
  .link-item {
    margin-right: 25px;
  }
}

@media (max-width: 800px) {
  .link-item {
    padding-bottom: 10px;
  }
}

@media (min-width: 800px) {
  .active {
    border-bottom: 1.8px solid #000;
  }
}
</style>
