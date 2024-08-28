<template>
  <div class="card">
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

export default ({
  props: {
    visHeader: {
      type: Boolean,
      required: false,
      default: true
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
  background: -moz-linear-gradient(
   209deg, #1071b5 0%, #3a506b 114%
  );
  background: -webkit-linear-gradient(
    209deg, #1071b5 0%, #3a506b 114%
  );

  color: white;}
.card-body {
  p {
    color: white;
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
