<template>
  <div class="social-media">
    <div class="row">
      <a class="icon github" target="_blank" href="https://github.com/amodes">
        <img src="../../assets/icons/github.svg"
      /></a>
      <a
        class="icon linkedin"
        target="_blank"
        href="https://de.linkedin.com/in/alexander-modes-499215129"
      >
        <img src="../../assets/icons/linkedin.svg" />
      </a>
    </div>
    <div class="row">
      <a class="icon medium" target="_blank" href="https://medium.com/@amodes">
        <img src="../../assets/icons/medium.svg" />
      </a>

      <a
        class="icon instagram"
        target="_blank"
        href="https://www.instagram.com/_amodes_/"
      >
        <img src="../../assets/icons/instagram.svg" />
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SocialMedia",
});
</script>

<style scoped>
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
</style>
