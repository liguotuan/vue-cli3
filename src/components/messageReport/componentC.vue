<template>
  <div @click="clickDiv">{{valueA}} -- {{valueB}} -- {{valueC}}</div>
</template>

<script>
import EventBus from "./eventBus";
export default {
  data() {
    return {
      valueC: "valueC",
      valueB: "",
      valueA: "",
    };
  },
  mounted() {
  },
  methods: {
    clickDiv() {
      EventBus.$emit("handlerC", this.valueC);
    },
  },
};
</script>
