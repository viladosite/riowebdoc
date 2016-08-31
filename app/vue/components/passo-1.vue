<style lang="scss">
  .video-card {
    border: 3px solid white;
    &.escolhido {
      border: 3px solid red !important;
    }
  }
</style>

<template>
  <div class="mdl-grid">
    <div class="mdl-cell mdl-cell--12-col">   
      <h3>Passo 2 - {{webcard.nave_nome}}</h3>
      <p>Escolha <strong>{{videos}}</strong> vídeos que aparecerão em seu Webcard.</p>

      <div v-for="video in webcard.nave_videos" class="video-card" @click="choseVideo(video)" :id="video+'-vid'" :class="{escolhido: escolhido[$index]}" :style="{background: 'url(http://img.youtube.com/vi/'+video+'/1.jpg)'}"> video {{$index}}</div>

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
        videos: 3 - this.webcard.videos.length,
        imgs: []
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