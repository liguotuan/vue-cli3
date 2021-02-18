<template>
  <div>{{valueA}} -- {{valueB}} -- {{valueC}}</div>
</template>

<script>
import EventBus from "./eventBus";
export default {
  data() {
    return {
      valueA: "valueA",
      valueB: "",
      valueC: "",
    };
  },
  mounted() {
    EventBus.$on("handlerC", (res) => {
      this.valueC = res;
      EventBus.$off('handlerB');
    });
    EventBus.$on("handlerB", (res) => {
      this.valueB = res;
    });
  },
};
</script>
