<template>
  <div class="main">
    <div>
      <Topbar />
    </div>
    <Fun />
    <div class="content-area">
      <router-view />
    </div>
  </div>
  <div class="imprint">
    <button @click="onClickImprint()">Imprint/Disclaimer</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Topbar from "./Topbar/Topbar.vue";
import Fun from "./Game/StartGamePopup.vue";

export default defineComponent({
  name: "Main",
  components: { Topbar, Fun },
  methods: {
    onClickImprint() {
      this.$router.push("imprint");
    },
  },
});
</script>

<style scoped>
.content-area {
  width: 100%;
}

.main {
  min-height: 98vh;
}

.imprint {
  position: absolute;
  color: #757575;
  font-size: 12px;
  padding-bottom: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
