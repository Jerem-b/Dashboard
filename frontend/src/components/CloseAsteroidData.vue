<template>
  <v-card :min-width="size">
    <div v-if="isEditing">
      <v-select label="Size" :items="sizeItems" v-model="size"></v-select>
      <v-text-field
        label="refreshRate (in sec)"
        v-model="refreshRate"
      ></v-text-field>
      <v-date-picker v-model="picker" :max="getToday()"></v-date-picker>
    </div>

    <div v-else>
      <p>Amount of close asteroids today: {{ getLength }}</p>
      <v-carousel
        :interval="refreshRate * 1000"
        :cycle="true"
        :touchless="true"
        :show-arrows="false"
        :show-indicators="false"
        hide-delimiters
      >
        <v-carousel-item v-for="(asteroid, index) in asteroids" :key="index">
          <p>Asteroid name: {{ asteroid.name }}</p>
          <p>Asteroid id: {{ asteroid.neo_reference_id }}</p>
          <p>
            Asteroid estimated diameter:
            {{
              asteroid.estimated_diameter.kilometers.estimated_diameter_max
            }}
            km
          </p>
          <p>
            Asteroid close approach date:
            {{ asteroid.close_approach_data[0].close_approach_date_full }}
          </p>
          <p>
            Asteroid relative velocity:
            {{
              asteroid.close_approach_data[0].relative_velocity
                .kilometers_per_hour
            }}
            km/h
          </p>
          <p>
            Asteroid miss distance:
            {{ asteroid.close_approach_data[0].miss_distance.astronomical }} ua
          </p>
          <p>
            Asteroid orbiting body:
            {{ asteroid.close_approach_data[0].orbiting_body }}
          </p>
        </v-carousel-item>
      </v-carousel>
    </div>
  </v-card>
</template>

<script>
import { NASAGetAsteroidInfo } from "@/services/nasa/API";
export default {
  name: "CloseAsteroidData",
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
      refreshRate: 10,
      picker: new Date(),
      asteroids: [],
      size: 300,
      sizeItems: [
        { text: "Small", value: 300 },
        { text: "Medium", value: 400 },
        { text: "Large", value: 500 },
      ],
    };
  },
  computed: {
    getLength() {
      if (this.asteroids) {
        return this.asteroids.length;
      }
      return 0;
    },
  },
  methods: {
    getData() {
      NASAGetAsteroidInfo(this.picker).then((res) => {
        this.asteroids = res.near_earth_objects[this.picker];
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
        this.picker = options[0];
      } else {
        this.picker = this.getToday();
      }
    },
    updateWidget() {
      this.getData();
      const widget = {
        refreshRate: this.refreshRate,
        size: this.size,
        options: this.picker+ ";",
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
};
</script>