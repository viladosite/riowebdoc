<style lang="scss">
  .video-card {
    cursor: pointer;
    width: 21% !important;
    &:hover {
      img {
        opacity: .7;
      }
    }
    &:nth-child(3), &:nth-child(4), &:nth-child(5), &:nth-child(6) {
      border-bottom: 2px dotted rgba(214,104,67, .5);
    }
    &:nth-child(3), &:nth-child(4), &:nth-child(5), &:nth-child(7), &:nth-child(8), &:nth-child(9) {
      border-right: 2px dotted rgba(214,104,67, .5);
    }
    &.escolhido {
      img {
        opacity: 1;
      }
    }
    &.escolhido:before {
      content: "OK";
    }
    img {
      opacity: .4;
      transition: opacity .2s;
      width: 100%;
    }
  }



  .video-nav {
    width: 22% !important;
    color: #fff;
    margin-right: 5%;
    display: inline-block;
    cursor: pointer;
    margin-top: 2%;

// INICIO - Incluido na tentativa de colocar o check sobre os vídeos ao seleciona-los
    span {
      visibility: hidden;
      position: absolute;
      left: 40%;
      top: 35%;
      filter: alpha(opacity=50);
      -moz-opacity: 0.5;
      -khtml-opacity: 0.5;
      opacity: 0.5;
    }
    &:hover, &.escolhido {
      span {
        visibility: visible;
      }
    }
// FIM - Incluido na tentativa de colocar o check sobre os vídeos ao seleciona-los

    img {
      width: 100%;
      filter: gray;
      filter: grayscale(1);
      -webkit-filter: grayscale(1);
    }
    &:hover, &.escolhido {
      img {
        filter: none;
        -webkit-filter: grayscale(0);
      }
    }
  }


</style>

<template>
  <div class="mdl-grid">
    <div class="mdl-cell mdl-cell--12-col">   
      <h3>Passo 2 - {{webcard.nave_nome}}</h3>
      <p>Escolha <strong>{{videos}}</strong> vídeos que aparecerão em seu Webcard.</p>

      <div v-for="video in webcard.nave_videos" class="video-nav" @click="choseVideo(video)" :id="video+'-vid'" :class="{escolhido: escolhido[$index]}"> <img :src="'http://img.youtube.com/vi/'+video+'/1.jpg'"><span class="checkicon"><img src="img/check.png"/></span> </div>

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