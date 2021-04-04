<template>
  <div class="about-wrapper">
    <div class="about">
      <div class="top-section-text">Hi, I'm Alex</div>
      <div class="main-section">
        <div class="top-section-image">
          <img
            class="portrait"
            src="../../assets/images/me.jpg"
            @click="handleImageClick()"
          />

          <div class="top-section-bottom-text">
            <div>I like to create digital things</div>
          </div>
        </div>

        <div class="main-text">
          Especially software.<br />
          Currently I am working as a Fullstack Javascript Developer in Berlin

          <a class="kontist" href="https://kontist.com/" target="_blank"
            >@Kontist</a
          >.<br />
          So what is this website about? Maybe some kind of portfolio? Nah, that
          is a bit boring (Especially as you can just visit linkedin for it).
          But I didn't really had a lot of content for it so I decided "let's
          just put travel photos here for now". And that's kind of the story
          behind this little place on the internet here. <br />
          I hope you enjoy it.
          <br /><br />
          If you want to reach out, feel free to contact me
          modes402@gmail.com<br />
          <span class="start-game-text"
            >By the way: If you want to play a game, type
            "makethiswebsitegreatagain".</span>

          <h2 class="facts-title">5 Facts about this website</h2>
          Click on my image 100x times to activate them. (Yes you read corretly,
          100 times)
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

const imageClickAmount = 100;

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
      if (this.clickCount === imageClickAmount) {
        alert(
          "Your clicks are not fast enough. You have to click faster. Try again!",
        );
      }
      if (this.clickCount === imageClickAmount * 2) {
        alert(
          "Your clicks are not fast enough. Difficulty got decreased. Try again!",
        );
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
.about-wrapper {
  width: calc(100% - 60px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 20px;
  padding-bottom: 100px;
  padding-left: 60px;
}

@media (min-width: 800px) {
  .about-wrapper {
    width: calc(55% - 50px);
    padding-left: calc(22.5% + 50px);
  }
}

.about {
  background-color: #f0d8a6;
  padding: 30px 10px 50px 10px;
  width: 100%;
}

.main-section {
  padding: 0 10px;
}

@media (min-width: 800px) {
  .main-section {
    padding: 0 50px;
  }
}

.top-section-text {
  font-size: 28px;
  font-weight: 500;
  padding-bottom: 20px;
  transform: translateX(-50px);
}

.top-section-image {
  font-size: 25px;
}

@media (min-width: 800px) {
  .top-section-image {
    display: flex;
    justify-content: center;
  }
}

.top-section-bottom-text {
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

@media (min-width: 800px) {
  .top-section-bottom-text {
    padding-left: 20px;
    transform: translateY(20px);
    font-size: 28px;
    font-weight: 500;
  }
}

@media (min-width: 800px) {
  .portrait {
    width: 300px;
  }
}

@media (max-width: 800px) {
  .portrait {
    width: 80%;
  }
}

.main-text {
  font-size: 14px;
  padding-top: 20px;
}

@media (min-width: 800px) {
  .main-text {
    padding-top: 50px;
  }
}

@media (max-width: 800px) {
  .start-game-text {
    display: none;
  }
}

.kontist {
  color: #5a2fb1;
}

.facts-title {
  padding-top: 30px;
}
</style>
