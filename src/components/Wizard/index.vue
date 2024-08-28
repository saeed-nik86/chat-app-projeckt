<template>

  <div class="wizard">
    <div class="wizard-inner">
      <slot name="line" />
      <ul class="nav nav-tabs" role="tablist">
        <slot name="navItem" />
      </ul>
    </div>

    <form role="form">
      <div class="tab-content">
        <slot name="tabItem" />
      </div>
    </form>
  </div>

</template>

<style lang="sass">
@import "@/styles/wizard"

</style>
<style scoped>

.tab-content{
    background-color: aliceblue;
}
.wizard{
    min-width: 80vh;
}
</style>

