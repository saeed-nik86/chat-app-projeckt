<template>
  <div class="app-container">
    <MainChat/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PanThumb from '@/components/PanThumb'
import GithubCorner from '@/components/GithubCorner'
import CountTo from 'vue-count-to'
// import PanelGroup from '@/views/dashboard/admin/components/PanelGroup'

import card from '@/components/CardBox'
import Calendar from '@/components/Calendar'
import { gitcontrol } from '@/api/programwork'
import MainChat from "@/views/chat/MainChat.vue"

export default {
  name: 'Indexdash',
  components: { PanThumb, GithubCorner, Calendar, card, CountTo, MainChat },
  data() {
    return {
      PageId: 7,
      control: [],
     
    }
  },
  created() {
    this.createget()

  },
  computed: {
    ...mapGetters(['name', 'avatar', 'roles']),
  },
  methods: {
  
 
    // //////دسترسی کنترلرها/////
    createget() {
      gitcontrol(this.PageId).then((response) => {
        this.control = response.data
      })
    },

    access(dd) {
      if (this.control.length != 0) {
        return this.control.names.includes(dd)
      }
    }

  }
}
</script>
<style scoped>
.navItem {
  border-radius: 5px 5px 5px 5px !important;
  width: 40px !important;
  padding-top: 58px !important;
  /* "to left" / "to right" - affects initial color */
  background: linear-gradient(to top, #92a5bc 50%, #92a5bc 50%) bottom !important;
  background-size: 200% !important;
  transition: .5s ease-out !important;
  left: 0px;
  top: -26px;
  padding-bottom: 0px;
  position: relative;
}

.navItem:hover {
  background-position: top !important;
}

.okItem {
  background-color: #13ce66 !important;
  border: 3px solid #10c771 !important;
  border-radius: 50px !important;
  margin-right: -5px;
}
</style>
<style lang="scss" scoped>
// .emptyGif {
//   display: block;
//   width: 45%;
//   margin: 0 auto;
// }
.fit {
  height: fit-content;
}

.cal {
  float: left;
  width: 100%;
  font-size: 12px;
}

.dashboard-editor-container {
  background-color: #e3e3e3;
  min-height: 100vh;
  padding: 5px 10px 0px 8px;

  .pan-info-roles {
    font-size: 12px;
    font-weight: 700;
    color: #333;
    display: block;
  }

  .info-container {
    position: relative;
    // margin-left: 190px;
    height: 150px;
    line-height: 200px;

    .display_name {
      font-size: 25px;
      line-height: 48px;
      color: #212121;
      position: absolute;
      top: 25px;
    }
  }
}

@media (max-width: 1000px) {
  .sc {
    overflow-x: scroll !important;
  }

  .cardb {
    overflow-x: auto !important;
  }

  .cardr {
    min-width: 190% !important;
  }
}

.cardr {
  border-radius: 5px 0px 0px 5px !important;
  /* "to left" / "to right" - affects initial color */
  background-size: 200% !important;
  transition: 0.5s ease-out !important;
  cursor: pointer !important;
}

.cardr:hover {
  background-position: right !important;
}

.br {
  border-right: 2px #a22121 solid;
}

.cardkol {
  min-height: 25vh !important;
  max-height: 60vh !important;
}

.card-body {
  height: 10vh !important;
}

.card-panel {
  display: flex !important;
  background-color: white !important;
}

.card-panel-icon-wrapper {
  font-size: 4rem !important;
}

.ispan {
  position: absolute;
  left: 10px;
  top: 25px;
  display: block;
}

.ispan2 {
  position: absolute;
  left: 10px;
  top: 25px;
  display: block;
}

#app .mobile .dashboard-editor-container {
  padding: 13px 10px 0px !important;
  justify-content: center;
}

.iClose:hover,
.navIcon:hover {
  cursor: pointer;
  -webkit-transform: scale(1.3);
  -ms-transform: scale(1.3);
  transform: scale(1.3);
}

.iClose {
  font-size: 1.1rem;
  color: #dc3d3d;
  margin-left: 5px
}

.navIcon {
  font-size: 1.3rem;
  color: #385374;
  margin-left: 5px
}

.btnSett {
  position: absolute;
  top: 3px;
  z-index: 1;
  left: 0.9rem;
  width: 29px;
  height: 29px;
  padding: 0px;
  margin: 0px;
}

.btnRef {
  position: absolute;
  top: 28px;
  z-index: 1;
  left: 0.9rem;
  width: 29px;
  height: 29px;
  padding: 0px;
  margin: 0px;
}

.btnUnSpin {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-align: center;
  align-items: center;
}

.isett {
  color: var(--icon-setting-color);
  /* color: #385374; */
  font-size: 22px;
  float: left;
  z-index: 1;
}

.btn-icon {
  background-color: transparent;
  border: none;
  margin-right: 5px;
}

.bg-ok {
  background-color: var(--bg-dashboard-tbl-ok);
  border-radius: 20px;
  padding: 0px 15px;
  width: fit-content;
  margin: auto !important;
}

.bg-nok {
  background-color: var(--bg-dashboard-tbl-nok);
  border-radius: 20px;
  padding: 0px 15px;
  animation: pulse-yellow 2s infinite;
  width: fit-content;
  margin: auto !important;
}

@keyframes pulse-yellow {
  0% {
    transform: scale(0.85);
    box-shadow: 0 0 0 0 rgba(185, 5, 5, 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(185, 5, 5, 0);
  }

  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(185, 5, 5, 0);
  }
}

// div#id6 {order: 1;}
// div#id5 {order: 2;}
// div#id2 {order: 3;}</style>
