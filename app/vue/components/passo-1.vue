<style lang="scss">
  .video-card {
    &.escolhido {
      background-color: green;
    }
  }
</style>

<template>
  <div class="mdl-grid">
    <div class="mdl-cell mdl-cell--12-col">   
      <h3>Passo 2 - {{webcard.nave_nome}}</h3>
      <p>Escolha {{videos}} vídeos que aparecerão em seu Webcard.</p>

      <div v-for="video in webcard.nave_videos" class="video-card" @click="choseVideo(video)" :id="video+'-vid'" :class="{escolhido: escolhido[$index]}"> video {{$index}}</div>

    </div>
  </div>
</template>

<script>
  var $$$ = require('jquery')
  var marked = require('marked')
  var _ = require('underscore')
  module.exports = {
    replace: true,
    props: ['webcard'],
    data: function(){
      return {
        videos: 3 - this.webcard.videos.length
      }
    },
    watch: {
      webcard: {
        handler: function (val, oldVal) { 
          this.videos = 3 - val.videos.length
        },
        deep: true
      }
    },
    methods: {
      choseVideo: function(video) {
        var tem = _.contains(this.webcard.videos, video)
        if (this.videos !== 0 && !tem) {
          this.webcard.videos.push(video)
          $$$('#'+video+'-vid').addClass('escolhido')
        } else {
          this.webcard.videos = _.reject(this.webcard.videos, function(id) {
            return id === video
          })
          $$$('#'+video+'-vid').removeClass('escolhido')
        }
      }
    },
    computed: {
      escolhido: function() {
        var list = []
        for (var i = 0; i < this.webcard.nave_videos.length; i++) {
          list.push(_.contains(this.webcard.videos, this.webcard.nave_videos[i]))
        }
        return list
      }
    },
    attached: function () {
      componentHandler.upgradeDom()
    },
    components: {
      
    },
    filters: {
      
    }
  }
</script>