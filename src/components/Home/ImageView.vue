<template>
  <div class="wrapper">
    <div class="container">
      <div v-for="(shownImages, index) in shownImagesBlocks" :key="index">
        <div v-show="checkIfBlockLoaded(index)">
          <img
            class="image"
            v-for="(path, index) in shownImages"
            :key="index"
            :src="require('../../content/photography/' + path)"
            @load="onImageLoad"
          />
        </div>
      </div>
    </div>
    <!-- TODO otherwise button above:
    <ImageCategoryButton>
      <Sidebar />
    </ ImageCategoryButton> -->
    <div v-if="windowWidth > 800" class="sidebarContainer">
      <Sidebar :activeCategory="'random'" :handleItemClick="handleItemClick" />
    </div>
  </div>
  <div class="loaderContainer">
    <div class="loader" v-if="!maxImagesReached" @click="showMore()">
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
  <div class="loadMoreIdentifier" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Sidebar from "./Sidebar.vue";
import { imageContent, ImageContentElement } from "../../content";
import { getRandomImages } from "../../helpers/utilities";

interface ImageViewData {
  activeCategory: keyof typeof imageContent | "random";
  allImages: string[];
  shownImagesBlocks: string[][];
  maxImagesReached: boolean;
  isLoading: boolean;
  numberImagesLoaded: number;
  windowWidth: number;
}

const numberImageBlock = 10;

export default defineComponent({
  name: "ImageView",
  data(): ImageViewData {
    return {
      activeCategory: "random",
      allImages: [],
      shownImagesBlocks: [],
      maxImagesReached: false,
      numberImagesLoaded: 0,
      isLoading: false,
      windowWidth: window.innerWidth,
    };
  },
  components: { Sidebar },
  created() {
    if (!this.shownImagesBlocks.length) {
      this.isLoading = true;
      const randomImages = getRandomImages(50);
      this.allImages = randomImages;
      this.shownImagesBlocks.push(randomImages.slice(0, numberImageBlock));
    }
  },
  methods: {
    handleItemClick(clickedCategory: keyof typeof imageContent | "random") {
      this.isLoading = true;
      this.maxImagesReached = false;
      this.numberImagesLoaded = 0;

      this.activeCategory = clickedCategory;

      if (clickedCategory === "random") {
        const randomImages = getRandomImages(50);
        this.allImages = randomImages;
        this.shownImagesBlocks = [randomImages.slice(0, numberImageBlock)];
      } else {
        this.allImages = imageContent[clickedCategory].paths;
        this.shownImagesBlocks = [this.allImages.slice(0, numberImageBlock)];
      }
    },
    onImageLoad() {
      this.numberImagesLoaded++;
    },
    checkIfBlockLoaded(blockIndex: number): boolean {
      // We just check for the last block as the blocks before should be already loaded
      if (blockIndex !== this.shownImagesBlocks.length - 1) {
        return true;
      }
      let numberImagesToShow = 0;
      this.shownImagesBlocks.forEach((imageBlock) => {
        numberImagesToShow += imageBlock.length;
      });
      if (this.numberImagesLoaded === numberImagesToShow) {
        this.isLoading = false;
        return true;
      }
      return false;
    },
    hasScrolledIntoElement(el: any): boolean {
      const rect = el.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
      return isVisible;
    },
    scroll() {
      window.onscroll = () => {
        const scrolledTo = document.querySelector(".loadMoreIdentifier");
        if (
          scrolledTo
          && this.hasScrolledIntoElement(scrolledTo)
          && !this.isLoading
        ) {
          this.isLoading = true;
          setTimeout(() => {
            this.showMore();
          }, 500);
        }
      };
    },
    showMore() {
      let numberCurrentlyShown = 0;
      this.shownImagesBlocks.forEach((imageBlock) => {
        numberCurrentlyShown += imageBlock.length;
      });
      const numberNextShown = numberCurrentlyShown + numberImageBlock;
      const maxShown = this.allImages.length;
      let newImages;
      if (numberNextShown >= maxShown) {
        newImages = this.allImages.slice(numberCurrentlyShown, maxShown);
        this.maxImagesReached = true;
      } else {
        newImages = this.allImages.slice(numberCurrentlyShown, numberNextShown);
      }
      this.shownImagesBlocks.push(newImages);
    },
    onResize() {
      this.windowWidth = window.innerWidth;
    },
  },
  mounted() {
    this.scroll();
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },
});
</script>

<style scoped>
.wrapper {
  display: flex;
}
.container {
  width: 100%;
  justify-content: center;
}
@media (min-width: 800px) {
  .container {
    padding-left: 20%;
    width: 60%;
  }
}

.image {
  max-width: 100%;
}
.sidebarContainer {
  width: 20%;
}
.loadMoreIdentifier {
  height: 1px;
}

/* loader */
.loaderContainer {
  display: flex;
  justify-content: center;
}
.loader {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.loader div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 32px;
  height: 32px;
  margin: 8px;
  border: 4px solid #787878;
  border-radius: 50%;
  animation: loader 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #787878 transparent transparent transparent;
}
.loader div:nth-child(1) {
  animation-delay: -0.45s;
}
.loader div:nth-child(2) {
  animation-delay: -0.3s;
}
.loader div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes loader {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
