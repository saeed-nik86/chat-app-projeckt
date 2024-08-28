<template>
  <div
    class="card"
    :style="[isColorGr == false && isColor == false ? { background: bg , color: txtColor} : { '': '' }]"
    :class="isColorGr == true ? 'cardColorGr' : isColor == true? 'cardColor' : ''"
  >
    <div class="card-image">
      <slot name="image" />
    </div>
    <div v-show="visHeader" class="card-header">
      <div class="card-title h5">
        <slot name="title" />
      </div>
      <div class="card-subtitle text-gray">
        <slot name="subtitle" />
      </div>
    </div>
    <div class="card-body flexcroll">
      <slot name="body" />
    </div>
    <!-- <div class="card-footer">
      <slot name="button"></slot>
    </div> -->
  </div>
</template>

<script>
import { string } from 'clipboard'

export default ({
  props: {
    visHeader: {
      type: Boolean,
      required: false,
      default: true
    },
    isColorGr: {
      type: Boolean,
      required: false,
      default: false
    },
    isColor: {
      type: Boolean,
      required: false,
      default: false
    },
    bg: {
      type: string,
      required: false,
      default: 'red'
    },
    txtColor: {
      type: string,
      required: false,
      default: 'black'
    }
  }
})
</script>

<style lang="scss">

  .card{
    width: 100%;
    border-radius: 6px 6px 6px 6px!important;
    padding: 15px 10px!important;
    // background: radial-gradient(circle, #d7d7d7 0%, #a4bbd7 100%) !important;
  }
  .cardColorGr {
     background: -moz-linear-gradient(
    209deg, var(--bg-card-gradiant-right) 0%, var(--bg-card-gradiant-left) 114%
    );
    background: -webkit-linear-gradient(
    209deg, var(--bg-card-gradiant-right) 0%, var(--bg-card-gradiant-left) 114%
    );
     color: white;
  }

.cardColorGr .card-body {
  p {
    color: white;
    margin: 0;
  }
}

.cardColor {
  background: var(--bg-card-color);
}

.cardColor .card-body {
  p {
    color: black;
    margin: 0;
  }
}

// .card-body {
//   overflow-y: auto !important;

// }

.card-image {
  img {
    width: 100%;
  }
}
</style>
