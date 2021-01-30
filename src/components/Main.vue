<template>
  <div>
    <Topbar />
  </div>
  <div class="contentArea">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Topbar from "./Topbar.vue";

export default defineComponent({
  name: "Main",
  components: { Topbar },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
