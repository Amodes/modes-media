<template>
  <div
    v-if="currentOpenedImage"
    class="clicked-image-popup"
    @click="showImageInPopup(null)"
  >
    <div class="clicked-image-overlay" />
    <img
      class="popup-image"
      :src="
        require('../../photography-content/photography/' + currentOpenedImage)
      "
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
            :src="require('../../photography-content/photography/' + path)"
            @load="onImageLoad"
            @click="showImageInPopup(path)"
          />
        </div>
      </div>
    </div>
    <div class="opened-categories-container">
      <button
        v-if="isMobile"
        class="opened-categories"
        @click="toggleOpenCategories"
      >
        <img class="location-icon" src="../../assets/icons/planet.png" />
      </button>
    </div>
    <div
      v-if="!isMobile || mobileCategoriesOpen"
      class="sidebar-wrapper"
      :style="{ top: `${scrollYPosition}px` }"
    >
      <div class="overlay" @click="toggleOpenCategories()" />
      <div class="sidebar-container">
        <Sidebar
          :activeCategory="activeCategory"
          v-on:handle-item-click="onItemClick"
        />
      </div>
    </div>
  </div>
  <div v-if="!maxImagesReached" class="loader-container">
    <Loader />
  </div>
  <div class="load-more-identifier" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Sidebar from "./Sidebar.vue";
import Loader from "../common/Loader.vue";
import { imageContent } from "../../photography-content";
import { getRandomImages } from "../../helpers/utilities";

interface ImageViewData {
  activeCategory: string;
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
const randomCategory = "random";

export default defineComponent({
  name: "ImageView",
  data(): ImageViewData {
    return {
      activeCategory: randomCategory,
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
  components: { Sidebar, Loader },
  created() {
    if (!this.shownImagesBlocks.length) {
      this.isLoading = true;

      if (
        this.$route.query.category
        && imageContent[this.$route.query.category]
      ) {
        this.allImages = imageContent[this.$route.query.category].paths;
        this.activeCategory = this.$route.query.category;
      } else {
        const randomImages = getRandomImages();
        this.allImages = randomImages;
        this.shownImagesBlocks.push(randomImages.slice(0, numberImageBlock));
      }

      this.shownImagesBlocks = [this.allImages.slice(0, numberImageBlock)];
    }
  },
  methods: {
    onItemClick(clickedCategory: keyof typeof imageContent | "random") {
      if (this.activeCategory === clickedCategory) return;
      this.isLoading = true;
      this.$router.push({ query: { category: clickedCategory } });
      this.maxImagesReached = false;
      this.numberImagesLoaded = 0;

      if (clickedCategory === randomCategory) {
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
      window.scrollTo(0, 0);
    },
    toggleOpenCategories() {
      this.mobileCategoriesOpen = !this.mobileCategoriesOpen;
      if (this.mobileCategoriesOpen) {
        document.querySelector("body").style.overflowY = "hidden";
      } else {
        document.querySelector("body").style.overflowY = "auto";
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
    onScroll() {
      // needed for position of categories overlay on mobile
      this.scrollYPosition = window.scrollY;
      // needed for load more logic
      const scrolledTo = document.querySelector(".load-more-identifier");
      if (this.hasScrolledIntoElement(scrolledTo) && !this.isLoading) {
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

.clicked-image-popup {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
}

.clicked-image-overlay {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  opacity: 0.95;
}

.popup-image {
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
    padding-left: 22.5%;
    width: 55%;
  }
}

.image {
  max-width: 100%;
  cursor: pointer;
}

.sidebar-wrapper {
  width: 20%;
}

@media (max-width: 800px) {
  .sidebar-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    z-index: 5;
  }

  .overlay {
    width: 100%;
    height: 120%;
    background-color: #000;
    opacity: 0.8;
  }

  .sidebar-container {
    position: absolute;
    right: 10px;
    bottom: 50px;
    height: calc(100% - 100px);
    width: calc(100% - 20px);
    background-color: #f0d8a6;
    opacity: 1;
    border-radius: 4px;
    z-index: 5;
  }
}

.opened-categories-container {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  right: 0px;
  bottom: 0px;
  z-index: 3;
}

.opened-categories {
  padding: 10px;
  font-size: 40px;
  z-index: 2;
  -webkit-tap-highlight-color: transparent;
}

.location-icon {
  width: 65px;
}

.loader-container {
  display: flex;
  justify-content: center;
}

.load-more-identifier {
  height: 5px;
}
</style>
