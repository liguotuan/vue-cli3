<template>
  <div class="content">
    <input type="file" @change="changeflie" />
    <componentA></componentA>
    <componentB></componentB>
    <componentC></componentC>
    <img src="../assets/bg.png" alt="">
    <router-view></router-view>
  </div>
</template>

<script>
import componentA from "@components/messageReport/componentA";
import componentB from "@components/messageReport/componentB";
import componentC from "@components/messageReport/componentC";

export default {
  name: "showPdf",
  components: {
    componentA,
    componentB,
    componentC,
  },
  data() {
    return {
      showIframe: false,
    };
  },
  created() {
    console.log("VUE_APP_KEY", process.env);
    // this.$router.push({
    //   path: '/index/test'
    // })
  },
  methods: {
    changeflie() {
      this.showIframe = true;
    },
  },
};
</script>

<style scoped>
.iframe {
  position: absolute;
  left: 200px;
  top: 200px;
}
</style>
