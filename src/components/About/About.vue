<template>
  <div class="about-wrapper">
    <div class="about">
      <h2 class="top-section-text">Hi, I'm Alex</h2>
      <div class="main-section">
        <div class="top-section-image">
          <div class="image-with-counter">
            <img
              class="portrait"
              src="../../assets/images/alex-modes.jpg"
              @click="handleImageClick()"
            />
            <div class="click-count-wrapper">
              <div class="click-count" v-if="clickCount > 0">
                <span v-for="n in clickCount" :key="n"> . </span>
              </div>
            </div>
          </div>
          <div class="top-section-bottom-text">
            <div>I like to create digital things</div>
          </div>
        </div>

        <div class="main-text">
          <p>
          Greetings! I am Alex, a Senior Software Engineer with extensive experience in full-stack development,
          currently working at
            <a class="deed" href="https://joindeed.com/" target="_blank"
            >@Deed</a
          >
           in Berlin. My day-to-day work involves coding for web applications, mobile applications, and backend systems.</p>

           <p>
             When I first started to code this website, I wanted to create a classic programmer portfolio page. But let's be honest, you're probably not here to read my resume.
             And honestly, who can blame you? Unless you're a hiring manager or recruiter, my work experience might not be the most thrilling thing to read about.
             So, let me share with you a little about my other passions - traveling and photography.<br/>
             I believe that traveling is not just a way to escape the daily grind, but also a way to broaden your horizons, expand your perspective, and gain new insights that can be applied to your personal and professional life.
             That's why I've decided to make this website mainly about my travel photos.
           </p>

          <p>If you have any questions, comments, or just want to say hello, feel free to drop me a line at modes402@gmail.com. I'm always happy to connect with like-minded individuals.</p>
          <p class="start-game-text">Oh, and if you're feeling extra brave, try typing <i>"birdsarecool"</i> in order to play a super weird game or click 50 times on my picture to get a suprise.</p>

        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

const imageClickAmount = 50;

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
        alert("You really clicked another 50 times? 🤣");
        alert("That was fun 😈");
        alert("There are no facts you can activate");
        alert("haha");
        alert("haha haha");
        alert("haha haha haha");
        this.clickCount = 0;
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
  padding-bottom: 50px;
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
  font-weight: 600;
  padding: 0 0 20px;
  margin: 0;
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
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

@media (min-width: 800px) {
  .top-section-bottom-text {
    padding-left: 20px;
    transform: translateY(20px);
    font-size: 28px;
    font-weight: 600;
  }
}

@media (min-width: 800px) {
  .portrait {
    cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'  width='40' height='48' viewport='0 0 100 100' style='fill:black;font-size:15px;'><text y='50%'>🚀</text></svg>"), auto;
    width: 300px;
    align-self: flex-start;
  }
}

@media (max-width: 800px) {
  .portrait {
    width: 80%;
    align-self: flex-start;
  }
}

.main-text {
  font-size: 14px;
  padding-top: 15px;
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

.deed {
  color: #5a2fb1;
}

.click-count-wrapper {
  height: 10px;
}

.click-count {
  font-size: 8px;
}

</style>
