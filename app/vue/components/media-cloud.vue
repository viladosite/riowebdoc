<style lang="scss">
  
</style>

<template>

  <div id="media_cloud" class="mdl-grid" style="padding: 0; ">
    <div class="rwd_content mdl-cell mdl-cell--12-col" style="margin: 0; width: 100%; perspective: 800px;">

      <div v-for="media in media_cloud" transition="fade" style="position: absolute; float: left; transform-style: preserve-3d; transition: transform 1s; left: 0; top: 0;" class="demo-card-wide mdl-card mdl-shadow--2dp" :id="media.id">
        <div :id="media.id+'-front'" class="demo-card-wide mdl-card mdl-shadow--2dp" style="height: 200px; min-height: 200px; position: absolute; backface-visibility: hidden; transform-style: preserve-3d; transition: transform 1s;">
          <div class="mdl-card__title" :style="{background: 'url('+media.imgs[0]+') center / cover'}" style="height: 100%; color: white;">
            <h2 class="mdl-card__title-text">{{media.nome}}</h2>
          </div>
          <div class="mdl-card__menu">
            <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" @click="flip(media.id)">
              <i class="material-icons">share</i>
            </button>
          </div>
        </div>
        <div :id="media.id+'-back'" class="demo-card-wide mdl-card mdl-shadow--2dp" style="height: 200px; min-height: 200px; transform: rotateY( 180deg ); position: absolute; backface-visibility: hidden; transform-style: preserve-3d; transition: transform 1s;">
          <div class="mdl-card__title" :style="{background: 'url('+media.imgs[0]+') center / cover'}" style="height: 100%; color: white;">
            <h2 class="mdl-card__title-text">Back</h2>
          </div>
          <div class="mdl-card__menu">
            <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" @click="unFlip(media.id)">
              <i class="material-icons">share</i>
            </button>
          </div>
        </div>
      </div>
    </div>  
  </div>  

</template>

<script>
  var $$$ = require('jquery')
  var marked = require('marked')
  module.exports = {
    replace: true,
    props: ['naves', 'user'],
    data: function(){
      return {
        media_cloud: [],
        width: 0,
        height: 0,
        offset: 0
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
      },
      shuffle: function (array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;

          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }

        return array;
      },
      getSize: function (media) {
        var size = {
          width: 200,
          height: 0
        }
        var votos = size.width * (media.votes.length/100)
        var labels = size.width * (media.labels/10)

        size.width = size.width + votos + labels
        size.height = (size.width * 9)/16
        return size;
      },
      changeCanvasSize: function () {
        var h = $$$('#markers').outerHeight() + $$$('header').outerHeight() + $$$('footer').outerHeight()
        var w = $$$(window).height()
        var width = $$$(window).width()
        this.width = width*2
        this.height = w
        this.offset = width/2
        $$$('#media_cloud').height(w-h)
      },
      checkPos: function(a, array) {
        console.log(a)
        console.log(array)
      },
      arrangeItens: function () {
        var arr = []
        for (var i = 0; i < this.media_cloud.length; i++) {
          var a = {
            size: null,
            pos: null
          }
          a.size = this.media_cloud[i].size
          var pos = {
            x: Math.random() * ((this.width - this.media_cloud[i].size.width) - 0) + 0,
            y: Math.random() * ((this.height - this.media_cloud[i].size.height) - 0) + 0
          }
          a.pos = pos
          if (i===0) {
            this.media_cloud[i].pos = pos
            arr.push(a)
          } else {
            this.checkPos(a, arr)
            this.media_cloud[i].pos = pos
            arr.push(a)
          }
        }
      }
    },
    computed: {
      
    },
    created: function () {
      for (var i = 0; i < this.naves.length; i++) {
        for (var o = 0; o < this.naves[i].media.length; o++) {
          var m = this.naves[i].media[o]
          m.nav = this.naves[i].headers.nome
          m.size = this.getSize(m)
          this.media_cloud.push(m)
        }
      }
      this.media_cloud = this.shuffle(this.media_cloud)

    },
    attached: function () {
      componentHandler.upgradeDom()
      this.changeCanvasSize()
      this.arrangeItens()
    },
    components: {
      
    },
    filters: {
      marked: function(value) {
        return marked(value)
      }
    }
  }
</script>