<template>
  <v-card :min-width="size">
    <div v-if="isEditing">
      <v-select label="Size" :items="sizeItems" v-model="size"></v-select>
      <v-text-field label="City" v-model="city" />
      <v-text-field
        label="refreshRate (in sec)"
        v-model="refreshRate"
      ></v-text-field>
    </div>
    <div v-else>
      <p>City: {{this.city}}</p>
      <p>Current temperature: {{rep.temp}} °C</p>
      <p>Feels like: {{rep.feels_like}} °C</p>
      <p>Pressure: {{rep.pressure}} Pa</p>
      <p>Humidity: {{rep.humidity}} %</p>
    </div>
  </v-card>
</template>

<script>
import { WEATHERGetCurrentWeather } from "@/services/weather/API";
export default {
  name: "Weather",
  props: {
    isEditing: {
      type: Boolean,
      default: false
    },
    personnalWidgetInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      city: "london",
      rep: null,
      size: 300,
      sizeItems: [
        { text: "Small", value: 300 },
        { text: "Medium", value: 400 },
        { text: "Large", value: 500 },
      ],
      refreshRate: 10,
    }
  },
  methods: {
    getData() {
      WEATHERGetCurrentWeather(this.city).then((res) => {
        this.rep = res.main;
      });
    },
    fillInfos() {
      const info = this.personnalWidgetInfo;
      this.refreshRate = info.refreshRate || 10;
      this.size = info.size || 300;
      const options = info.options.split(";");
      if (options[0]) {
        this.city = options[0];
      }
    },
    updateWidget() {
      this.getData();
      const widget = {
        refreshRate: this.refreshRate,
        size: this.size,
        options: this.city+ ";",
      };
      return widget;
    },
  },
  watch: {
    personnalWidgetInfo: function () {
      this.fillInfos();
      this.getData();
    },
  },
}
</script>