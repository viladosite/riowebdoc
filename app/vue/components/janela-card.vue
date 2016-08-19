<style lang="scss">
  
</style>

<template>
  <div id="menumodal">
    <button class="steps" @click.prevent="nextStep" v-if="passo < 3 && passo !== 4" :disabled="!ok"> <i class="modaliconsr material-icons">arrow_forward</i> </button>

    <button class="steps" @click.prevent="sendWebcard" v-if="passo === 3" :disabled="!ok"> <i class="modaliconsr material-icons">mail</i> </button>

    <button class="steps" @click.prevent="prevStep" v-if="passo > 0 && passo !== 4"> <i class="modaliconsr material-icons">arrow_back</i> </button>
  </div>
  <br>
  <div :is="'passo-' + passo" :webcard.sync="webcard" :naves="naves" :ok.sync="ok"></div>
</template>

<script>
  var $$$ = require('jquery')
  var marked = require('marked')
  module.exports = {
    replace: true,
    props: ['webcard', 'janela', 'naves'],
    data: function(){
      return {
        passo: 0,
        ok: false
      }
    },
    watch: {
      webcard: {
        handler: function (val, oldVal) { 
          this.checkPasso()
        },
        deep: true
      }
    },
    methods: {
      nextStep: function() {
        this.passo = this.passo + 1
        this.checkPasso()
      },
      prevStep: function() {
        this.passo = this.passo - 1
        this.ok = true
      },
      sendWebcard: function() {
        this.$dispatch('send-card')
      },
      checkPasso: function() {
        if (this.passo === 0 && this.webcard.nave_videos !== null) {
          this.ok = true
        } else if (this.passo === 1 && this.webcard.videos.length === 3) {
          this.ok = true
        } else if (this.passo === 2 && this.webcard.menssagem !== '') {
          this.ok = true
        } else if (this.passo === 3 && this.webcard.email_criador !== '' && this.webcard.email_enviado !== '') {
          this.ok = true
        } else {
          this.ok = false
        }
      }
    },
    computed: {

    },
    attached: function () {
      componentHandler.upgradeDom()
      this.$on('card-sent', function() {
        this.passo = 4
      })
      this.checkPasso()
    },
    components: {
      'passo-0': require('../components/passo-0.vue'),
      'passo-1': require('../components/passo-1.vue'),
      'passo-2': require('../components/passo-2.vue'),
      'passo-3': require('../components/passo-3.vue'),
      'passo-4': require('../components/passo-4.vue')
    },
    filters: {
      
    }
  }
</script>