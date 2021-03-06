<template>
  <div
    v-if="currentOpenedImage"
    class="imagePopup"
    @click="showImageInPopup(null)"
  >
    <div class="imageOverlay" />
    <img
      class="popupImage"
      :src="require('../../content/photography/' + currentOpenedImage)"
    />
  </div>
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
            @click="showImageInPopup(path)"
          />
        </div>
      </div>
    </div>
    <button
      v-if="isMobile"
      class="openCategories"
      @click="toggleOpenCategories"
    >
      <img class="locationIcon" src="../../assets/icons/location.svg" />
    </button>
    <div
      v-if="!isMobile || mobileCategoriesOpen"
      class="sidebarWrapper"
      :style="{ top: `${scrollYPosition}px` }"
    >
      <div class="overlay" @click="closeMobileCategory()" />
      <div class="sidebarContainer">
        <Sidebar
          :activeCategory="'random'"
          :handleItemClick="handleItemClick"
        />
      </div>
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
import { imageContent } from "../../content";
import { getRandomImages } from "../../helpers/utilities";

interface ImageViewData {
  activeCategory: keyof typeof imageContent | "random";
  allImages: string[];
  shownImagesBlocks: string[][];
  maxImagesReached: boolean;
  isLoading: boolean;
  numberImagesLoaded: number;
  isMobile: boolean;
  mobileCategoriesOpen: boolean;
  scrollYPosition: number;
  currentOpenedImage: string;
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
      isMobile: window.innerWidth < 800,
      mobileCategoriesOpen: false,
      scrollYPosition: 0,
      currentOpenedImage: null,
    };
  },
  components: { Sidebar },
  created() {
    if (!this.shownImagesBlocks.length) {
      this.isLoading = true;
      const randomImages = getRandomImages();
      this.allImages = randomImages;
      this.shownImagesBlocks.push(randomImages.slice(0, numberImageBlock));
    }
  },
  methods: {
    handleItemClick(clickedCategory: keyof typeof imageContent | "random") {
      if (this.activeCategory === clickedCategory) return;
      this.isLoading = true;
      this.maxImagesReached = false;
      this.numberImagesLoaded = 0;

      if (clickedCategory === "random") {
        const randomImages = getRandomImages();
        this.allImages = randomImages;
        this.shownImagesBlocks = [randomImages.slice(0, numberImageBlock)];
      } else {
        this.allImages = imageContent[clickedCategory].paths;
        this.shownImagesBlocks = [this.allImages.slice(0, numberImageBlock)];
      }
      if (this.mobileCategoriesOpen) {
        this.toggleOpenCategories();
      }

      this.activeCategory = clickedCategory;
    },
    toggleOpenCategories() {
      this.mobileCategoriesOpen = !this.mobileCategoriesOpen;
      if (this.mobileCategoriesOpen) {
        document.querySelector("body").style.overflowY = "hidden";
      } else {
        document.querySelector("body").style.overflowY = "auto";
      }
    },
    closeMobileCategory() {
      this.mobileCategoriesOpen = false;
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
    onScroll() {
      // needed for position of categories overlay on mobile
      this.scrollYPosition = window.scrollY;
      // needed for load more logic
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
      this.isMobile = window.innerWidth < 800;
    },
    showImageInPopup(path: string) {
      if (this.isMobile) {
        return;
      }
      this.currentOpenedImage = path;
      if (path) {
        document.querySelector("body").style.overflowY = "hidden";
      } else {
        document.querySelector("body").style.overflowY = "auto";
      }
    },
  },
  mounted() {
    window.addEventListener("resize", this.onResize);
    window.addEventListener("scroll", this.onScroll);
  },
  destroy() {
    window.removeEventListener("scroll", this.onScroll);
    window.removeEventListener("resize", this.onResize);
  },
});
</script>

<style scoped>
.wrapper {
  display: flex;
}

.imagePopup {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
}
.imageOverlay {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.8;
}
.popupImage {
  padding: 20px;
  z-index: 5;
  max-width: 100%;
  max-height: 100%;
  box-sizing: border-box;
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
  cursor: pointer;
}
.sidebarWrapper {
  width: 20%;
}
@media (max-width: 800px) {
  .sidebarWrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
  }

  .overlay {
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.8;
  }

  .sidebarContainer {
    position: absolute;
    right: 20px;
    bottom: 20px;
    width: calc(100% - 40px);
    background-color: #fff;
    opacity: 0.8;
    border-radius: 4px;
  }
}
.loadMoreIdentifier {
  height: 1px;
}
.openCategories {
  position: fixed;
  right: 20px;
  bottom: 20px;
  font-size: 40px;
  z-index: 2;
}

.locationIcon {
  width: 50px;
}

/* loader */
.loaderContainer {
  display: flex;
  justify-content: center;
}
.loader {
  display: inline-block;
  position: relative;
  width: 40px;
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
