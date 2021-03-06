<template>
  <div class="wrapper">
    <div class="about">
      <div class="top-section">
        <img class="portrait" src="../../assets/images/me.jpg" @click="handleImageClick()" />
        <div class="top-section-text">
          Hello, my name is Alex.
          <div>I like to create digital things.</div>
        </div>
      </div>
      <div class="main-text">
      Especially software. Currently I work in Berlin as a Fullstack Javascript Developer
       <a class="kontist" href="https://kontist.com/" target="_blank">@Kontist</a>.<br>
      So what is this website about?  I'd liked to have an own
      website but didn't really know what to put there. Maybe some kind of portfolio?
      Nah, that is a bit boring (Especially as you can just visit linkedin for it).
      But I don't really had a lot of content for it so I decided
      "let's just put travel photos here for now". And thats already the (boring)
      story behind this little place of the internet here. <br>
      I hope you enjoy it.
      <br><br>
      PS: If you want to reach out, feel free to contact me modes402@gmail.com<br>

      <h2> 5 Facts about this website</h2>
      Click on my image 100x times to activate them. (Yes you read corretly, 100 times)
    </div></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

const imageClickAmount = 10;

interface AboutData {
 clickCount: 0;
}
export default defineComponent({
  name: "About",
  data(): AboutData {
    return {
      clickCount: 0,
    };
  },
  methods: {
    handleImageClick() {
      this.clickCount += 1;
      console.log(this.clickCount, imageClickAmount);
      if (this.clickCount === imageClickAmount) {
        alert("Your clicks are not fast enough. You have to click faster. Try again!");
      }
      if (this.clickCount === imageClickAmount * 2) {
        alert("Your clicks are not fast enough. Difficulty got decreased. Try again!");
      }
      if (this.clickCount === imageClickAmount * 3) {
        alert("You really clicked another 100 times? 🤣");
        alert("That was fun 😈");
        alert("There are no facts you can activate");
        alert("haha");
        alert("haha haha");
        alert("haha haha haha");
      }
    },

  },
});
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 100px;
}

@media (min-width: 800px) {
.top-section {
  display: flex;
  align-items: center;
}
}

@media (min-width: 800px) {
.top-section-text {
  padding-left: 40px;
  font-size: 25px;
}
}
@media (max-width: 800px) {
.top-section-text {
  padding-top: 10px;
  font-size: 25px;
}
}

@media (min-width: 800px) {
  .portrait {
  width: 300px;
}
}

@media (max-width: 800px) {
  .portrait {
  width: 100%;
}
}

.about {
  width: 100%;
}

@media (min-width: 800px) {
  .about {
  width: 60%;
}
}

.main-text {
  padding-top: 20px;
}

.kontist {
 color: #5A2FB1;
}
</style>
