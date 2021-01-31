<template>
  <ul class="container">
    <li class="item shuffle" @click="onClickCategory('random')">
      <img class="icon" src="../../assets/icons/shuffle.svg" />Shuffle</li>
    <li
      v-for="(item, key) in navigationItems"
      :key="key"
      @click="onClickCategory(key)"
      class="item"
    >

      {{ item.title }}
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { imageContent } from "../../content";

export default defineComponent({
  name: "Sidebar",
  data: () => ({
    navigationItems: imageContent,
  }),
  props: { activeCategory: String, handleItemClick: Function },
  methods: {
    onClickCategory(item: string) {
      if (this.handleItemClick) this.handleItemClick(item);
    },
  },
});
</script>

<style scoped>

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
}

.item {
  cursor: pointer;
  padding-bottom: 5px;
}

.shuffle {
  display: flex;
}

.icon {padding-right: 5px; width: 20px; height: 20px}

 </style>
