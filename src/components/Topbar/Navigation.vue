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
  props: { activeItem: String },
  data() {
    return {
      activePage: this.activeItem,
    };
  },
  watch: {
    activeItem(newActivePage) {
      this.activePage = newActivePage;
    },
  },
  methods: {
    handleMenuClick(item: string) {
      this.$emit("on-menu-click", item);
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
    font-size: 14px;
    margin-right: 25px;
  }
}

@media (max-width: 800px) {
  .link-item {
    font-size: 18px;
    padding-top: 30px;
  }
}

@media (min-width: 800px) {
  .active {
    border-bottom: 1.8px solid #000;
  }
}
</style>
