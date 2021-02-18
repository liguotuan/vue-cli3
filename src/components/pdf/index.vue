<template>
  <div class="pdf" :style="{'width': pdfWidth + 'px', 'height': pdfHeight + 'px'}">
    <div class="pdf-title" v-if="pdfTitle">{{pdfTitle}}</div>
    <div class="pdf-content">
      <canvas :id="'canvasPdf'+page" v-for="page in count" :key="page"></canvas>
    </div>
    <div v-if="isNeedButton">
      <div v-if="!isCountDown" class="bottomBtn" :style="buttonActive" @click="submit(true)">确定</div>
      <div
        @click="submit(false)"
        v-if="isCountDown"
        class="bottomBtn"
        :style="countDown == 0 ? buttonActive : buttonDisabled"
      >确定{{` ${countDown}`}}</div>
    </div>
  </div>
</template>

<script>
import PDFJS from "pdfjs-dist";
import { baseData } from "./base64Data";
// import { jianli } from "../vue-pdf/jianli";
export default {
  props: {
    // PDF内容宽
    pdfWidth: {
      type: Number,
      default: 0,
    },
    // PDF内容高
    pdfHeight: {
      type: Number,
      default: 0,
    },
    // 是否需要按钮
    isNeedButton: {
      type: Boolean,
      default: false,
    },
    // 是否按钮需要倒计时
    isCountDown: {
      type: Boolean,
      default: false,
    },
    // 倒计时
    countDown: {
      type: Number,
      default: 30,
    },
    pdfUrl: {
      type: String,
      defaut: "",
    },
    pdfTitle: {
      type: String,
      defaut: "",
    },
  },
  data() {
    return {
      pdfDoc: "",
      count: 0,
      buttonActive: {
        background: "#ea2c1d",
        color: "white",
      },
      buttonDisabled: {
        background: "#D3D3D3",
        color: "#696969",
      },
    };
  },
  watch: {
    countDown(val) {
      if (val == 0) {
        clearInterval(this.setIntervalID);
        this.countDown = "";
      }
    },
  },
  methods: {
    init() {
      const _this = this;
      let pdfBase64Data = atob(baseData);
      PDFJS.getDocument({ data: pdfBase64Data }).then((res) => {
        this.setIntervalID = setInterval(() => {
          _this.countDown--;
        }, 1000);
        _this.pdfDoc = res;
        _this.count = res.numPages;
        _this.$nextTick(() => {
          _this.renderPage(1);
        });
      });
    },
    // 渲染pdf
    renderPage(num) {
      const _this = this;
      _this.pdfDoc.getPage(num).then((page) => {
        let canvas = document.getElementById("canvasPdf" + num);
        let ctx = canvas.getContext("2d");
        let dpr = window.devicePixelRatio || 1;
        let bsr =
          ctx.webkitBackingStorePixelRatio ||
          ctx.mozBackingStorePixelRatio ||
          ctx.msBackingStorePixelRatio ||
          ctx.oBackingStorePixelRatio ||
          ctx.backingStorePixelRatio ||
          1;
        let ratio = dpr / bsr;
        console.log("screen.availWidth", screen.availWidth);
        let scale = _this.pdfWidth / page.getViewport(1).width;
        console.log("scale", scale);
        let viewport = page.getViewport(scale);
        canvas.width = viewport.width * ratio;
        canvas.height = viewport.height * ratio;
        canvas.style.width = viewport.width + "px";
        canvas.style.height = viewport.height + "px";
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        let renderContext = {
          canvasContext: ctx,
          viewport: viewport,
        };
        page.render(renderContext);

        _this.pageHeight = viewport.height;
        if (_this.count > num) {
          setTimeout(() => {
            _this.renderPage(num + 1);
          }, 500);
        } else {
          this.$nextTick(() => {});
          console.log(document.getElementsByTagName("canvas"));
          this.$forceUpdate();
        }
      });
    },
    submit(flag) {
      if (flag) {
        this.$emit("on-click", true);
      } else {
        if (this.countDown > 0) {
          return;
        } else {
          this.$emit("on-click", true);
        }
      }
    },
  },
  created() {
    this.init();
  },
};
</script>

<style scoped>
.pdf {
  overflow-y: scroll;
}
.pdf-title {
  margin: 10px 0;
  text-align: center;
}
.pdf-content {
  display: flex;
  flex-direction: column;
}
.bottomBtn {
  width: 80%;
  height: 45px;
  margin: 15px 0;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  line-height: 45px;
}
</style>