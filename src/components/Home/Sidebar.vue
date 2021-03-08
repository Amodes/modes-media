<template>
  <ul class="container">
    <li class="item shuffle" @click="onClickCategory('random')">
      <img class="icon" src="../../assets/icons/shuffle.svg" />
      Shuffle
      <span class="circle" v-if="activeItem === 'random'"> ● </span>
    </li>
    <li
      v-for="(item, key) in navigationItems"
      :key="key"
      @click="onClickCategory(key)"
      class="item"
    >
      {{ item.title }}
      <span class="circle" v-if="activeItem === key"> ● </span>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { imageContent } from "../../photography-content";

export default defineComponent({
  name: "Sidebar",
  data: () => ({
    navigationItems: imageContent,
    activeItem: "random",
  }),
  props: { activeCategory: String, handleItemClick: Function },
  methods: {
    onClickCategory(item: string) {
      this.handleItemClick(item);
      this.activeItem = item;
    },
  },
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0 20px 0;
  font-size: 14px;
}

@media (min-width: 800px) {
  .container {
    padding: 30px 0 0 0;
  }
}

.item {
  height: 20px;
  cursor: pointer;
  padding: 20px 0 0 0;
}

.item:hover {
  font-size: 18px;
  transition: font-size 0.2s;
}

@media (min-width: 800px) {
  .item {
    cursor: pointer;
    padding: 10px 0 0 0;
  }
}

.shuffle {
  display: flex;
}

.icon {
  padding-right: 5px;
  width: 20px;
  height: 20px;
}

.circle {
  margin-left: 3px;
}
</style>
