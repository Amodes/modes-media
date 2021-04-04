<template>
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
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Navigation",
  data() {
    return {
      activePage: window.location.pathname,
    };
  },
  methods: {
    handleMenuClick(item: string) {
      this.activePage = item;
      this.$router.push(item);
      this.$emit("hide-menu");
    },
  },
});
</script>

<style scoped>
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
    padding-top: 30px;
  }
}

@media (min-width: 800px) {
  .active {
    border-bottom: 1.8px solid #000;
  }
}
</style>
