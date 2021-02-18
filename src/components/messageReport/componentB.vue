<template>
  <div @click="clickDiv">{{ valueA }} -- {{ valueB }} -- {{ valueC }}</div>
</template>

<script>
import EventBus from "./eventBus";
export default {
  data() {
    return {
      valueC: "",
      valueB: "valueB",
      valueA: "",
    };
  },
  methods: {
    clickDiv() {
      EventBus.$emit("handlerB", this.valueB);
    },
  },
  mounted() {
    EventBus.$on("handlerA", (res) => {
      this.valueA = res;
    });
    EventBus.$on("handlerC", (res) => {
      this.valueC = res;
    });
  },
};
</script>

<style>
</style>