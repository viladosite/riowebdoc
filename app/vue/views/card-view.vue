<style lang="scss">
  #content {
    &.card {
      padding: 15px;
      position: relative;
      background-color: white;
      box-sizing: border-box;
    }
  }
  #protect {
    position: absolute;
    z-index: 5;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    .menssagem {
      position: absolute;
      right: 0;
      width: 40%;
      height: 100%;
      top: 0;
      h2 {
        margin-top: 50px;
        color: white;
        text-align: center;
      }
    }
  }
</style>

<template>
  <div class=" mdl-layout mdl-js-layout mdl-layout--fixed-header" >

   
    <main class="mdl-layout__content" >
    
    <div id="content" class="card" :style="{height: height+'px'}"> 
      <div id="protect">
        <div class="menssagem">
          <h2>{{card.menssagem}}</h2>
        </div>
      </div>
      <div id="player"></div> 
    </div>
    
    </main>

  </div>
</template>

<script>
  var $$$ = require('jquery')
  var marked = require('marked')
  module.exports = {
    replace: true,
    props: ['card'],
    data: function(){
      return {
        height: 0,
        iframe: null,
        index: 0,
        done: true
      }
    },
    methods: {
      playThis: function() {
        this.iframe = new YT.Player('player', {
          height: '100%',
          width: '100%',
          videoId: this.card.videos[this.index],
          playerVars: {
            controls: 0,
            showinfo: 0,
            modestbranding: 1
          },
          events: {
            'onReady': this.playVideo,
            'onStateChange': this.videoFim
          }
        })
      },
      playVideo: function(event) {
        event.target.playVideo()
      },
      loadVideo: function(event) {
        this.done = false
        if (this.index === 2) {
          this.index = 0
        } else {
          this.index = this.index + 1
        }
        this.iframe.loadVideoById({
          videoId: this.card.videos[this.index],
          startSeconds: 0,
          endSeconds: 10
        })
      },
      videoFim: function(event) {
        var self = this
        if (event.data == YT.PlayerState.PLAYING && this.done) {
          setTimeout(self.loadVideo, 10000);
        } else if (event.data == YT.PlayerState.ENDED) {
          this.loadVideo()
        }
      },
    },
    computed: {

    },
    attached: function () {
      this.height = $$$(window).height()
      this.playThis()
    },
    components: {
      
    },
    filters: {
      
    }
  }
</script>