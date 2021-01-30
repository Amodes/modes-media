<template>
  <ul>
    <li   @click="onClickCategory('random')" >Random</li>
    <li
      v-for="(item, key) in navigationItems"
      :key="key"
      @click="onClickCategory(key)"
    >
      <!-- TODO show text via translation -->
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
