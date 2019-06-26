<template>
  <div>
    <div v-show="isLoading || loading" ref="spinnerRef" class="absolute"  :style="computedStyle" >
        <div class="white-overlay">
            <div class="spinner-wrapper text-center">
              <div class="spinner" :style="styleSpinnerSize"></div>
              <div class="p-1" :style="styleSpinnerTextSize">{{ customTitle || 'Loading...'}}</div>
            </div>
        </div>
    </div>
    <slot></slot>
  </div>
</template>
<script>
import { eventBus } from '../../../main'
export default {
    props:{
      size: {
        type: Number,
        default: 50,
      },
      customTitle: {
        type: String,
        default: null,
      },
      isLoading: {
        type: Boolean,
        default: false,
      }
    },
    data(){
        return {
            loading: false,
            width: null,
            height: null,
            window: window,
            htmlElement: null,
        }
    },
    computed: {
      styleSpinnerSize(){
        return {
          'width' : `${this.defaultSpinnerSize}px`,
          'height': `${this.defaultSpinnerSize}px`,
        }
      },
      styleSpinnerTextSize() {
        return {
          'font-size' : `${this.defaultTextSize}px`,
        }
      },
      defaultTextSize() {
        return ( (this.defaultSpinnerSize / 3)  >= 16 ) ? 16 : this.defaultSpinnerSize/3;
      },
      defaultSpinnerSize() {
        return (this.size >= 50 ) ? 50 : this.size;
      },
      computedStyle() {
        return {
          'width' : this.width,
          'height': this.height,
        }
      }
    },
    methods:{
      changeLoadingState(loading) {
        this.$nextTick( () => {
          this.width  = this.htmlElement.width;
          this.height = this.htmlElement.height;
        });
        this.loading = loading;
      },
    },
    watch: {
      'htmlElement.width': {
        handler(nv,ov) {
          this.width = nv;
        }, deep: true
      },
      'htmlElement.height': {
        handler(nv,ov) {
          this.height = nv;
        }, deep: true
      },
      isLoading(nv) {
        this.width  = this.htmlElement.width;
        this.height = this.htmlElement.height;
      },
      loading(nv) {
        this.width  = this.htmlElement.width;
        this.height = this.htmlElement.height;
      },
    },
    mounted(){
      this.htmlElement = this.window.getComputedStyle(this.$refs.spinnerRef.parentElement)
      eventBus.$on('showJMSectionSpinner', this.changeLoadingState);
    },
    destroyed(){
      eventBus.$off('showJMSectionSpinner', this.changeLoadingState);
    }
}
</script>

<style lang="scss" scoped>
$d_size: inherit;

@mixin centerer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.absolute {
  z-index: 9999;
  position: absolute;
  width: $d_size;
  height: $d_size;  
}

.white-overlay {
  background-color: rgba(255, 255, 255, 0.9);
  margin:0;
  width: $d_size;
  height: $d_size;  
}

.spinner-wrapper {
  display: inline-block;
  @include centerer;
} 

.spinner {
   transition: all 0.3s linear;
   animation: vue-spinner-spin .8s linear infinite;
   margin: 0 auto;
   border-radius: 100%;
   border: 3px solid #eee;
   border-top: 3px solid #2196f3;
}

@keyframes vue-spinner-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>