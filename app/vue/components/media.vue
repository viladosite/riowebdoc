<style lang="scss">
  
</style>

<template>

  <div style="position: absolute; transform-style: preserve-3d; transition: transform 1s;" :style="[{left: offset + media.x+'px'},{top: media.y+'px'}]" class="" :id="media.id">
    <div :id="media.id+'-front'" class="demo-card-wide mdl-card mdl-shadow--2dp" style="position: absolute; backface-visibility: hidden; transform-style: preserve-3d; transition: transform 1s;"  :style="[{height: media.height+'px'},{'min-height': media.height+'px'},{width: media.width+'px'}]">
      <div class="mdl-card__title" :style="{background: 'url('+media.imgs[0]+') center / cover'}" style="height: 100%; color: white;">
      </div>
      <div class="mdl-card__menu">
        <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" @click="flip(media.id)">
          <i class="material-icons">share</i>
        </button>
      </div>
    </div>
    <div :id="media.id+'-back'" class="demo-card-wide mdl-card mdl-shadow--2dp" style="transform: rotateY( 180deg ); position: absolute; backface-visibility: hidden; transform-style: preserve-3d; transition: transform 1s;" :style="[{height: media.height+'px'},{'min-height': media.height+'px'},{width: media.width+'px'}]">
      <div class="mdl-card__title" :style="{background: 'url('+media.imgs[1]+') center / cover'}" style="height: 100%; color: white;">
      </div>
      <div class="mdl-card__menu">
        <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" @click="unFlip(media.id)">
          <i class="material-icons">share</i>
        </button>
      </div>
    </div>
  </div>  

</template>

<script>
  var $$$ = require('jquery')
  var marked = require('marked')
  module.exports = {
    replace: true,
    props: ['offset', 'media'],
    data: function(){
      return {

      }
    },
    methods: {
      flip: function(id) {
        $$$('#'+id+'-front').css('transform', 'rotateY(180deg)')
        $$$('#'+id+'-back').css('transform', 'rotateY(0deg)')
      },
      unFlip: function(id) {
        $$$('#'+id+'-back').css('transform', 'rotateY(180deg)')
        $$$('#'+id+'-front').css('transform', 'rotateY(0deg)')
      }
    },
    computed: {
      
    },
    created: function () {
      
    },
    attached: function () {
      componentHandler.upgradeDom()
    },
    components: {
      'media': require('./media.vue')
    },
    filters: {
      marked: function(value) {
        return marked(value)
      }
    }
  }
</script>