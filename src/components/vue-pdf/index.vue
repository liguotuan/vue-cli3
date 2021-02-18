<template>
  <div class="pdf-content">
    <div class="pdf-title">{{pdfTitle}}</div>
    <pdf
      v-for="(item, index) in pageTotalNum"
      :key="index"
      ref="pdf"
      :src="pdfData"
      :page="index + 1"
      @progress="loadPdf"
      @loaded="loaded"
      @page-loaded="pageLoaded"
      @error="caseError"
    ></pdf>
    <div class="pdf-bottom"></div>
  </div>
</template>

<script>
import { jianli } from './jianli';
import pdf from "vue-pdf";
export default {
  name: "showPdf",
  components: {
    pdf,
  },
  props: {
    // pdf的url地址
    pdfUrl: {
      type: String,
      defaut: "",
    },
    // 底部按钮倒计时
    countDown: {
      type: Number,
      default: 30,
    },
    // 标题
    pdfTitle: {
      type: String,
      defaut: "",
    },
  },
  data() {
    return {
      pageTotalNum: 1,
      pdfData: '',
    };
  },
  created() {
    this.pdfData = jianli
  },
  mounted() {
    this.pdfLoadTask();
  },
  methods: {
    pdfLoadTask() {
      let loadingPdf = pdf.createLoadingTask(this.pdfData);
      loadingPdf.promise.then((pdf) => {
        this.pageTotalNum = pdf._pdfInfo.numPages;
      });
    },
    // 加载pdf触发,从0 -> 1
    loadPdf() {},
    // 文件加载完成时触发
    loaded() {
      this.$emit("loaded", true);
    },
    // pdf加载完触发
    pageLoaded() {
      this.$emit("pageLoaded", true);
    },
    // 错误触发弹框
    caseError(e) {
      this.$emit("caseError", e);
    },
  },
};
</script>

<style scoped>
.pdf-content{
  border: red solid 1px;
}
</style>
