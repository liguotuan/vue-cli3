<template>
  <div>
    <div ref="wrapper" class="scroll-wrapper">
      <ul style="border: red solid 1px">
        <li v-for="(item, index) in list" :key="index" class="content"></li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import betterScorll from "better-scroll";
export default {
  data() {
    return {
      update: false,
      scorll: "",
      list: [
        { label: 1, value: 1 },
        { label: 1, value: 1 },
        { label: 1, value: 1 },
        { label: 1, value: 1 },
        { label: 1, value: 1 },
        { label: 1, value: 1 },
        { label: 1, value: 1 },
        { label: 1, value: 1 },
        { label: 1, value: 1 },
        { label: 1, value: 1 },
        { label: 1, value: 1 },
        { label: 1, value: 1 },
        { label: 1, value: 1 },
        { label: 1, value: 1 },
        { label: 1, value: 1 },
        { label: 1, value: 1 },
        { label: 1, value: 1 },
        { label: 1, value: 1 },
        { label: 1, value: 1 },
        { label: 1, value: 1 },
        { label: 1, value: 1 },
        { label: 1, value: 1 },
        { label: 1, value: 1 },
        { label: 1, value: 1 },
        { label: 1, value: 1 },
        { label: 1, value: 1 },
        { label: 1, value: 1 },
        { label: 1, value: 1 },
        { label: 1, value: 1 },
        { label: 1, value: 1 },
        { label: 1, value: 1 },
      ],
    };
  },
  created() {},
  methods: {},
  updated() {},
  mounted() {
    const that = this;
    that.$nextTick(() => {
      let options = {
        scrollY: true,
        click: true,
        probeType: 1,
        scrollbar: {
          fade: true
        }
      };
      that.scorll = new betterScorll(that.$refs.wrapper, options);
      console.log("that.scorll", that.scorll);
      that.scorll.on("scroll", (res) => {
        console.log("-------scroll-------------", res);
      });
      that.scorll.on("scrollStart", () => {
        that.update = true;
        that.scorll.finishPullDown();
      });
    });
  },
};
</script>

<style scoped>
.scroll-wrapper {
  width: 100%;
  position: relative;
  height: 100vh;
}
.content {
  height: 120px;
  position: relative;
  z-index: 1;
  border: red solid 1px;
}
</style>