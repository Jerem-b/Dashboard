<template>
  <v-card :min-width="size">
    <div v-if="isEditing">
      <v-select label="Size" :items="sizeItems" v-model="size"></v-select>
      <v-text-field label="Latitude" type="number" v-model="lat" />
      <v-text-field label="Longitude" type="number" v-model="lon" />
      <v-text-field
        label="refreshRate (in sec)"
        v-model="refreshRate"
      ></v-text-field>
    </div>
    <div v-else-if="rep">
      <p>CO2: {{rep.co}} μg/m3</p>
      <p>NO: {{rep.no}} μg/m3</p>
      <p>NO2: {{rep.no2}} μg/m3</p>
      <p>O3: {{rep.o3}} μg/m3</p>
      <p>SO2: {{rep.so2}} μg/m3</p>
      <p>PM25: {{rep.pm2_5}} μg/m3</p>
      <p>PM10: {{rep.pm10}} μg/m3</p>
      <p>NH3: {{rep.nh3}} μg/m3</p>
    </div>
  </v-card>
</template>

<script>
import { WEATHERGetCurrentPollution } from "@/services/weather/API";
export default {
  name: "Pollution",
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
      lat: 50,
      lon: 50,
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
      WEATHERGetCurrentPollution(this.lat, this.lon).then((res) => {
        this.rep = res.list[0].components;
      });
    },
    fillInfos() {
      const info = this.personnalWidgetInfo;
      this.refreshRate = info.refreshRate || 10;
      this.size = info.size || 300;
      const options = info.options.split(";");
      if (options[0]) {
        this.lat = options[0];
      }
      if (options[1]) {
        this.lon = options[1];
      }
    },
    updateWidget() {
      this.getData();
      const widget = {
        refreshRate: this.refreshRate,
        size: this.size,
        options: this.lat+ ";" + this.lon,
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