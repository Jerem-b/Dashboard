<template>
  <div class="d-flex flex-wrap">
    <ServiceCard
      v-for="service in services"
      :key="service._id"
      :service="service"
      class="ma-1"
      style="flex: auto"
    />
  </div>
</template>

<script>
import ServiceCard from "@/components/ServiceCard.vue";

export default {
  name: "Home",
  components: {
    ServiceCard,
  },
  computed: {
    services() {
      return this.$store.state.user?.services;
    }
  },
};
</script>
