<template>
  <v-card :min-width="size">
    <div v-if="isEditing">
      <v-select label="Size" :items="sizeItems" v-model="size"></v-select>
      <v-select label="Camera" :items="camItems" v-model="cam"></v-select>
      <v-text-field
        label="refreshRate (in sec)"
        v-model="refreshRate"
      ></v-text-field>
      <v-date-picker v-model="picker" :max="getToday()"></v-date-picker>
    </div>
    <v-carousel
      v-else
      :interval="refreshRate * 1000"
      :cycle="true"
      :touchless="true"
      :show-arrows="false"
      :show-indicators="false"
      hide-delimiters
    >
      <v-carousel-item v-for="(uri, index) in uris" :key="index">
        <v-img
          :src="uri"
          :lazy-src="uri"
          :width="size"
        ></v-img>
      </v-carousel-item>
    </v-carousel>
  </v-card>
</template>

<script>
import { NASAgetRoverPicture } from "@/services/nasa/API";
export default {
  name: "PictureRover",
  props: {
    isEditing: {
      type: Boolean,
      default: false,
    },
    personnalWidgetInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      refreshRate: 8,
      picker: "",
      uris: [],
      size: 300,
      sizeItems: [
        { text: "Small", value: 300 },
        { text: "Medium", value: 400 },
        { text: "Large", value: 500 },
      ],
      cam: "FHAZ",
      camItems: [
        { text: "FHAZ", value: "FHAZ" },
        { text: "RHAZ", value: "RHAZ" },
        { text: "MAST", value: "MAST" },
        { text: "CHEMCAM", value: "CHEMCAM" },
        { text: "MAHLI", value: "MAHLI" },
        { text: "MARDI", value: "MARDI" },
        { text: "NAVCAM", value: "NAVCAM" },
      ],
    };
  },
  methods: {
    getImage() {
      NASAgetRoverPicture(this.picker, this.cam).then((res) => {
        if (res.photos.length > 0) {
          this.uris = res.photos.map((photo) => photo.img_src);
        }
      });
    },
    getToday() {
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const yyyy = today.getFullYear();
      return yyyy + "-" + mm + "-" + dd;
    },
    fillInfos() {
      const info = this.personnalWidgetInfo;
      this.refreshRate = info.refreshRate || 10;
      this.size = info.size || 300;
      const options = info.options.split(";");
      if (options[0]) {
        this.cam = options[0];
      }
      if (options[1]) {
        this.picker = options[1];
      } else {
        this.picker = this.getToday();
      }
    },
    updateWidget() {
      this.getImage();
      const widget = {
        refreshRate: this.refreshRate,
        size: this.size,
        options: this.cam + ";" + this.picker,
      };
      return widget;
    },
  },
  watch: {
    personnalWidgetInfo: function () {
      this.fillInfos();
      this.getImage();
    },
  },
};
</script>