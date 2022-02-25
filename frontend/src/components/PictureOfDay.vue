<template>
  <v-card :min-width="imgSize">
    <div v-if="isEditing">
      <v-select label="Size" :items="sizeItems" v-model="imgSize"></v-select>
      <v-radio-group v-model="option">
        <v-radio label="Daily" value="D"></v-radio>
        <v-radio label="Randomly" value="R"></v-radio>
        <v-radio label="Fixe" value="F"></v-radio>
      </v-radio-group>
      <v-text-field
        :disabled="option !== 'R'"
        label="refreshRate (in sec)"
        v-model="refreshRate"
      ></v-text-field>
      <v-date-picker
        v-if="option === 'F'"
        v-model="picker"
        :max="getToday()"
      ></v-date-picker>
    </div>
    <v-img v-else :width="imgSize" :height="imgSize" :src="uri"></v-img>
  </v-card>
</template>

<script>
import { NASAgetPicture } from "@/services/nasa/API";

export default {
  name: "PictureOfDay",
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
      picker: new Date(),
      uri: "",
      option: "D",
      imgSize: 300,
      sizeItems: [
        { text: "Small", value: "300" },
        { text: "Medium", value: "400" },
        { text: "Large", value: "500" },
      ],
      refreshRate: 86400,
    };
  },
  methods: {
    getToday() {
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const yyyy = today.getFullYear();
      return yyyy + "-" + mm + "-" + dd;
    },
    getYesterday() {
      const date = new Date()
      date.setDate(date.getDate() - 1);
      const dd = String(date.getDate()).padStart(2, "0");
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const yyyy = date.getFullYear();
      return yyyy + "-" + mm + "-" + dd;
    },
    getRandomDate() {
      const start = new Date(1995, 6, 5);
      const end = new Date();
      const randomDate = new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
      );
      const dd = String(randomDate.getDate()).padStart(2, "0");
      const mm = String(randomDate.getMonth() + 1).padStart(2, "0");
      const yyyy = randomDate.getFullYear();
      return yyyy + "-" + mm + "-" + dd;
    },
    getImage() {
      if (this.option === "F") {
        NASAgetPicture(this.picker).then((res) => {
          this.uri = res.url;
        });
      } else if (this.option === "D") {
        NASAgetPicture(this.getToday())
          .then((res) => {
            this.uri = res.url;
          })
          .catch(() => {
            const date = this.getYesterday();
            NASAgetPicture(date).then((res) => {
              this.uri = res.url;
            });
          });
      } else if (this.option === "R") {
        NASAgetPicture(this.getRandomDate()).then((res) => {
          this.uri = res.url;
        });
      }
    },
    fillInfos() {
      const info = this.personnalWidgetInfo;
      this.refreshRate = info.refreshRate || 86400;
      this.imgSize = info.size || 300;
      const options = info.options.split(";");
      if (options[0]) {
        this.option = options[0];
      }
      this.picker = options[1];
    },
    updateWidget() {
      this.getImage();
      const widget = {
        refreshRate: this.refreshRate,
        size: this.imgSize,
        options: this.option + ";" + this.picker,
      };
      return widget;
    },
  },
  watch: {
    personnalWidgetInfo: function () {
      this.fillInfos();
      this.getImage();
    },
    option: function (newOption, lastOption) {
      if (newOption === "R") {
        this.$store.commit("setTimer", {
          timer: setInterval(this.getImage, this.refreshRate * 1000),
          id: this.personnalWidgetInfo._id,
        });
      } else if (lastOption === "R") {
        this.$store.commit("deleteTimer", this.personnalWidgetInfo._id);
      }
    },
    refreshRate: function (newRefreshRate) {
      if (this.option === "R") {
        this.$store.commit("updateTimer", {
          timer: setInterval(this.getImage, newRefreshRate * 1000),
          id: this.personnalWidgetInfo._id,
        });
      }
    },
  },
};
</script>