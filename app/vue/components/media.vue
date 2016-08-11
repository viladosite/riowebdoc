<style lang="scss">
  $time: .4s;

  .media_card {
    position: absolute; 
    transform-style: preserve-3d; 
    transition: transform .3s, left $time, top $time; 
    z-index: 1; 
    perspective: 800px;
    cursor: pointer;
    &:hover {
      z-index: 2;
    }
    &.hover {
      z-index: 2;
      .mdl-card__title {
        height: 97%;
        width: 98%;
      }
      .front {
        padding: 4px;
      }
    }
    .front {
      position: absolute; 
      backface-visibility: hidden; 
      transform-style: preserve-3d; 
      padding: 2%;
    }
    .mdl-card {
      border-radius: 1px;
      transition: box-shadow $time, height $time*.8, width $time*.5, transform 1s, padding $time*.8;
    }
    .mdl-card__title {
      height: 93%;
      width: 96%; 
      color: white;
      position: absolute;
      transition: opacity .6s, height $time, width $time;
      opacity: 1;
    }
    .mdl-card__menu {
      z-index: 3;
    }
    .back {
      transform: rotateY( 180deg ); 
      position: absolute; 
      backface-visibility: hidden; 
      transform-style: preserve-3d; 
    }
    .material-icons {
      color: white;
    }
    .mdl-button {
      &:hover {
        background: transparent;
      }
    }
  }
</style>

<template>

  <div :style="[{height: media.height+'px'},{'min-height': media.height+'px'},{width: media.width+'px'},{left: x_offset + offset + media.x+'px'},{top: y_offset +  media.y+'px'}]" class="media_card" :id="media.id" @mouseover="mouseOver" @mouseout="mouseOut">
    <div :id="media.id+'-front'" class="demo-card-wide mdl-card mdl-shadow--{{sw}}dp front" style=""  :style="[{height: h_offset + media.height+'px'},{'min-height': h_offset + media.height+'px'},{width: w_offset + media.width+'px'}]">
      <div v-for="img in media.imgs" class="mdl-card__title" :style="[{background: 'url('+img+') center / cover'}, {'z-index': media.imgs.length - $index}]" :id="$index+'-img-'+media.id">
      </div>
      <div style="z-index: 3; position: absolute; width: 100%; padding-left: 42%; padding-top: 22%;" v-if="on" transition="fade">
        <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" style="overflow: visible;">
          <i class="material-icons" style="font-size: 60px;">play_circle_outline</i>
        </button>
      </div>
      <div class="mdl-card__menu" v-if="on" transition="fade">
        <a :href="media.mapa" target="_blank" class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
          <i class="material-icons">room</i>
        </a>
        <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" @click="flip(media.id)">
          <i class="material-icons">chevron_right</i>
        </button>
      </div>
    </div>
    <div :id="media.id+'-back'" class="demo-card-wide mdl-card mdl-shadow--{{sw}}dp back" :style="[{height: h_offset + media.height+'px'},{'min-height': h_offset + media.height+'px'},{width: w_offset + media.width+'px'}]">
      <div class="mdl-card__title" style="color: black;">
        {{video_desc}}
      </div>
      <div class="mdl-card__menu" v-if="on" transition="fade">
        <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" @click="unFlip(media.id)">
          <i class="material-icons">chevron_left</i>
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
    props: ['offset', 'media', 'height'],
    data: function(){
      return {
        x_offset: 0,
        y_offset: 0,
        w_offset: 0,
        h_offset: 0,
        sw: 2,
        video_desc: '',
        video_title: '',
        video_iframe: '',
        interval: 0,
        img_now: 0,
        button: false,
        hover: false,
        on: false
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
      changeImg: function() {
        if (this.img_now === this.media.imgs.length - 1) {
          for (var i = 0; i < this.img_now; i++) {
            $$$('#'+i+'-img-'+this.media.id).css('opacity', 1)
          }
          this.img_now = 0
        } else {
          $$$('#'+this.img_now+'-img-'+this.media.id).css('opacity', 0)
          this.img_now = this.img_now + 1
        }
      },
      mouseOver: function() {
        var self = this
        this.hover = true
        if (!self.on) {
          self.w_offset = this.media.width * .05
          self.h_offset = this.media.height * .05
          self.x_offset = -self.w_offset/2
          self.y_offset = -self.h_offset/2
          setTimeout(function() {
            if (self.hover) {
              $$$('#'+self.media.id).addClass('hover')
              self.w_offset = 400 - self.media.width
              self.h_offset = 225 - self.media.height
              self.x_offset = -(self.w_offset/2)
              if (self.media.matrix[0][1] - (self.h_offset/2) < 0) {
                self.y_offset = 0
              } else if (self.media.matrix[1][1] + (self.h_offset/2) > self.height) {
                self.y_offset = - ((self.media.matrix[1][1] + (self.h_offset)) - self.height)
              } else {
                self.y_offset = -(self.h_offset/2) 
              }
              self.sw = 8
              self.on = true
            }
          }, 1000)
        }
      },
      mouseOut: function(event) {
        var self = this
        this.hover = false
        if (self.on) {
          if (this.media.matrix[0][0]+this.offset+this.x_offset >= event.x || this.media.matrix[1][0]+this.offset-this.x_offset <= event.x || this.media.matrix[0][1]+this.y_offset <= event.y || this.media.matrix[1][1]+this.y_offset+this.media.height >= event.y) {
            setTimeout(function() {
              if (!self.hover) {
                $$$('#'+self.media.id).removeClass('hover')
                self.w_offset = 0
                self.h_offset = 0
                self.x_offset = 0
                self.y_offset = 0
                self.sw = self.media.shadow
                self.on = false
              }
            }, 500)
          }
        } else if (!self.on) {
          $$$('#'+self.media.id).removeClass('hover')
          this.hover = false
          self.w_offset = 0
          self.h_offset = 0
          self.x_offset = 0
          self.y_offset = 0
          self.sw = self.media.shadow
        }
        
      }
    },
    computed: {
      
    },
    created: function () {
      this.interval = parseInt((Math.random() * 10000)+3000)
      this.sw = this.media.shadow
      var self = this

      var playlistUrl = 'https://www.googleapis.com/youtube/v3/videos?part=snippet&id=' + this.media.video + '&key=AIzaSyCwNv14d5bNQ4MwaodqT6z45-6A5y4kzus'
      var videoURL= 'http://www.youtube.com/embed/'
      $$$.getJSON(playlistUrl, function(data) {
        // console.log(data)
        $$$.each(data.items, function(i, item) {
          // console.log(item)
          self.video_title = item.snippet.title
          self.video_iframe = videoURL + self.media.video
          self.video_desc = item.snippet.description
        });
      })
    },
    attached: function () {
      var self = this
      componentHandler.upgradeDom()

      window.setInterval(function(){
        self.changeImg()
      }, self.interval);
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