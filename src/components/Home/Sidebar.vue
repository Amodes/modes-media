<template>
  <div class="container">
    <div class="items">
      <div class="items-overlay" />
      <ul class="items-wrapper">
        <li class="item" @click="onClickCategory('random')">
          <div class="shuffle">
            <img class="icon" src="../../assets/icons/shuffle.svg" />
            Shuffle
            <span class="circle" v-if="activeItem === 'random'"> ● </span>
          </div>
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
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { imageContent } from "../../photography-content";

export default defineComponent({
  name: "Sidebar",
  props: { activeCategory: String },
  data() {
    return {
      navigationItems: imageContent,
      activeItem: this.activeCategory,
    };
  },
  watch: {
    activeCategory(newCategory) {
      this.activeItem = newCategory;
    },
  },
  methods: {
    onClickCategory(item: string) {
      this.$emit("handle-item-click", item);
    },
  },
});
</script>

<style scoped>
.container {
  font-size: 16px;
}

.items-wrapper {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

@media (min-width: 800px) {
  .container {
    font-size: 12px;
  }

  .items {
    position: fixed;
  }

  .items-overlay {
    position: absolute;
    top: 255px;
    height: 35px;
    width: 150px;

    background: -moz-linear-gradient(
      top,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 1) 99%,
      rgba(255, 255, 255, 1) 100%
    ); /* FF3.6-15 */
    background: -webkit-linear-gradient(
      top,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 1) 99%,
      rgba(255, 255, 255, 1) 100%
    ); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 1) 99%,
      rgba(255, 255, 255, 1) 100%
    ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  }

  .items-wrapper {
    padding: 10px 10px 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 250px;
    width: 140px;
    overflow-y: auto;
  }

  .item {
    height: 30px;
    cursor: pointer;
    padding: 10px 0;
    box-sizing: border-box;
  }
}

@media (max-width: 800px) {
  .items-wrapper {
    padding: 10px 10px 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-height: 75vh;
    overflow-y: auto;
  }

  .item {
    height: 30px;
    cursor: pointer;
    padding: 20px 0;
    box-sizing: border-box;
  }
}

.item:hover {
  font-size: 15px;
  transition: font-size 0.2s;
}

.shuffle {
  display: flex;
  align-items: center;
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
