<template>
  <div class="price">
    <div class="won-description">You won a giphy 🎉</div>
    <iframe
      :src="url"
      width="100%"
      height="300px"
      frameBorder="0"
      class="giphy-embed"
      style="pointer-events: none"
      allowFullScreen
    ></iframe>
    <p>
      <a href="https://giphy.com/gifs/myuLckXB7OjfGw1gSb">via GIPHY</a>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Price",
  props: { priceUrl: String },
  data() {
    return {
      url: this.priceUrl,
    };
  },
});
</script>

<style scoped>

.price {
  display: flex;
  align-items: center;
  flex-direction: row;
}

@media (max-width: 800px) {
  .price {
    flex-direction: column;
  }
}
@media (max-width: 800px) {
  .won-description {
    padding-bottom: 5px;
  }
}

</style>
