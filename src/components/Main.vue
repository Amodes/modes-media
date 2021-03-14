<template>
  <div>
    <Topbar />
  </div>
  <Fun />
  <div class="content-area">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Topbar from "./Topbar/Topbar.vue";
import Fun from "./Game/StartGamePopup.vue";

export default defineComponent({
  name: "Main",
  components: { Topbar, Fun },
});
</script>

<style scoped>
.content-area {
  width: 100%;
}
</style>
