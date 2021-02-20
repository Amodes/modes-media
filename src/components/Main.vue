<template>
 <div>
    <Topbar />
  </div>
  <Fun />
  <div class="contentArea">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Topbar from "./Topbar.vue";
import Fun from "./Fun/FunSite.vue";

export default defineComponent({
  name: "Main",
  components: { Topbar, Fun },
});
</script>

<style scoped>
.contentAre {
  width: 100%;
}

</style>
