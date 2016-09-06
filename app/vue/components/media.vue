<style lang="scss">
  $time: .2s;

  .media_card {
    position: absolute; 
    transform-style: preserve-3d; 
    transition: transform .3s, left .2s, top .2s, opacity .4s; 
    z-index: 1; 
    perspective: 800px;
    cursor: pointer;
    &:hover {
      z-index: 3 !important;
    }
    &.in-trans {
      transition: none;
    }
    &.hover {
      z-index: 2;
      transition: transform .3s, left $time linear, top $time linear;
      .mdl-card {
        transition: box-shadow $time linear, height $time linear, min-height $time linear, width $time linear, transform .5s, padding $time linear;
      }
      .mdl-card__title {
        height: 95%;
        width: 97%;
        transition: opacity .6s, height $time linear, min-height $time linear, width $time linear;
      }
      .front {
        padding: 6px;
      }
    }
    &.playing {
      z-index: 6 !important;
      transition: transform .3s, left $time*2, top $time*2;
      perspective: 500px;
      cursor: default;
      .mdl-card__title {
        height: 98%;
        width: 98.8%;
        transition: opacity .6s, height $time*2, min-height $time*2 linear, width $time*2;
        &.player {
          z-index: 5;
          padding: 30px;
          background: white;
        }
      }

      .left-postal{
      	width: 60%!important;
      	height: 75%!important;
      	border-right: 3px solid;
      	margin-left: 5%;
        margin-top: 5%;
        padding: 2%;
      	font-size: 85%!important;
      	position: relative;
        float: left;
        background-color: red;
      }

      .right-postal{
          width: 21%;
          height: 75%;
          text-align: center;
          margin-top: 5%;
          padding: 2%;
          position: relative;
          float: left;
          background-color: yellow;
      }

      .mdl-card__menu {
        z-index: 6;
        right: 10px;
        top: 4px;
      }
      .front {
        .material-icons {
          color: black;
        }
      }
      .mdl-card {
        transition: box-shadow $time*2, height $time*2, min-height $time*2 linear, width $time*2, transform 1s, padding $time*2;
      }
    }
    &.filtered {
      opacity: 0 !important;
      z-index: -1;
    }
    .front {
      position: absolute; 
      backface-visibility: hidden; 
      transform-style: preserve-3d; 
      padding: 2%;
      .material-icons {
        color: white;
      }
    }
    .mdl-card {
      border-radius: 1px;
      transition: box-shadow .2s, height .2s, width .2s, transform 1s, padding .2s;
    }
    .mdl-card__title {
      height: 93%;
      width: 96%; 
      color: white;
      position: absolute;
      transition: opacity .6s, height .2s, width .2s;
      opacity: 1;
      padding: 0;
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
    .mdl-button {
      &:hover, &:focus {
        background: transparent;
      }
    }
    .assistido {
      height: 100%;
      width: 100%;
      background: rgba(0,0,0,.5);
      position: absolute;
      z-index: 5;
    }
    .votado {
      .material-icons {
        color: red !important;
      }
    }
  }
</style>

<template>

  <div :style="[{height: media.height+'px'},{'min-height': media.height+'px'},{width: media.width+'px'},{left: filter_offset + w_loop + x_offset + offset + media.x+'px'},{top: y_offset +  media.y+'px'}]" class="media_card" :id="media.id" @mouseover="mouseOver" @mouseout="mouseOut">
    <div v-if="assistido && !hover && !on" class="assistido" transition="fade"></div>
    <div :id="media.id+'-front'" class="demo-card-wide mdl-card mdl-shadow--{{sw}}dp front" style=""  :style="[{height: h_offset + media.height+'px'},{'min-height': h_offset + media.height+'px'},{width: w_offset + media.width+'px'}]">
      <div :id="media.id+'-player'" class="mdl-card__title player"></div>
      <img v-for="img in media.imgs" class="mdl-card__title" :src="img" :style="[{'z-index': media.imgs.length - $index}]" :id="$index+'-img-'+media.id">
      </img>
      <div style="z-index: 3; position: absolute; width: 100%; padding-left: 42%; padding-top: 22%;" v-if="on" transition="fade">
        <a v-if="playing === null" :href="'/#/home/'+media.id" class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" style="overflow: visible;" transition="fade">
          <i class="material-icons" style="font-size: 60px;">play_circle_outline</i>
        </a>
      </div>
      <div class="mdl-card__menu" v-if="on" transition="fade">
        <span v-if="playing !== null">{{votos}}</span>
        <button v-if="playing !== null" :id="media.id+'-voto'" :class="{votado: votado}" class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" @click="votar">
          <i class="material-icons">thumb_up</i>
        </button>
        <a :id="media.id+'-front-map'" :href="media.mapa" target="_blank" class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
          <i class="material-icons">room</i>
        </a>
        <button :id="media.id+'-desc'" class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" @click="flip(media.id)">
          <i class="material-icons">description</i>
        </button>
        <a v-if="playing !== null" href="/#/home" :id="media.id+'-close'" class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
          <i class="material-icons">clear</i>
        </a>
      </div>
    </div>
    <div :id="media.id+'-back'" class="demo-card-wide mdl-card mdl-shadow--{{sw}}dp back" :style="[{height: h_offset + media.height+'px'},{'min-height': h_offset + media.height+'px'},{width: w_offset + media.width+'px'}]">
      <div class="mdl-supporting-text" style="color: black; height: 100%; background-color: blue;">
      	
      		<div class="left-postal" style="color: black;">
        			{{video_desc}}
        	</div>

        	<div class="right-postal" style="color: black;">
        			texto aleatorio pra div da direita
        	</div>
       	
      </div>
      <div class="mdl-card__menu" v-if="on" transition="fade">
        <a :id="media.id+'-back-map'" :href="media.mapa" target="_blank" class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
          <i class="material-icons">room</i>
        </a>
        <button :id="media.id+'-photo'" class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" @click="unFlip(media.id)">
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="#000000" d="m 18.334101,19.618585 -12.3872826,0 0,-15.4980258 12.3868306,0 0,15.4978458 4.33e-4,0 0,1.8e-4 z m 2.550122,-16.9687922 0,-0.1558962 C 20.654487,2.4020434 19.961215,1.7086388 19.86959,1.4787215 l -0.155715,0 c -0.161583,0.4028738 -0.554708,0.687946 -1.015536,0.687946 -0.460377,0 -0.853953,-0.2850722 -1.015084,-0.687946 l -1.248884,0 c -0.16068,0.4028738 -0.554709,0.687946 -1.015085,0.687946 -0.460827,0 -0.854404,-0.2850722 -1.015085,-0.687946 l -1.248883,0 c -0.16068,0.4028738 -0.554257,0.687946 -1.015084,0.687946 -0.460377,0 -0.853953,-0.2850722 -1.015085,-0.687946 l -1.2488831,0 c -0.161132,0.4028738 -0.554709,0.687946 -1.0150851,0.687946 -0.4603762,0 -0.8539529,-0.2850722 -1.0150845,-0.687946 l -1.2488837,0 c -0.1611316,0.4028738 -0.5547081,0.687946 -1.0150851,0.687946 -0.4603755,0 -0.8539526,-0.2850722 -1.0150845,-0.687946 l -0.1557152,0 C 4.3192541,1.7086388 3.6259796,2.4020469 3.3962433,2.4938966 l 0,0.1558962 C 3.7988467,2.8109247 4.0841,3.2044554 4.0841,3.6649679 c 0,0.4605113 -0.2852533,0.854223 -0.6878567,1.015175 l 0,1.2487925 C 3.7988467,6.0900673 4.0841,6.4837791 4.0841,6.9441105 c 0,0.4605113 -0.2852533,0.8540432 -0.6878567,1.014994 l 0,1.2486127 C 3.7988467,9.3688942 4.0841,9.7624262 4.0841,10.222937 c 0,0.460692 -0.2852533,0.854179 -0.6878567,1.015355 l 0,1.248433 c 0.4026034,0.16095 0.6878567,0.554663 0.6878567,1.015536 0,0.46015 -0.2852533,0.853682 -0.6878567,1.015175 l 0,1.248612 C 3.7988467,15.927044 4.0841,16.320711 4.0841,16.781223 c 0,0.460512 -0.2852533,0.854043 -0.6878567,1.015355 l 0,1.248613 C 3.7988467,19.206007 4.0841,19.599719 4.0841,20.06023 c 0,0.460513 -0.2852533,0.854043 -0.6878567,1.014995 l 0,0.170159 c 0.2292859,0.09203 0.9230097,0.785438 1.0150845,1.015175 l 0.1557152,0 c 0.1611319,-0.402694 0.554709,-0.687631 1.0150845,-0.687631 0.4608282,0 0.8544049,0.284937 1.0155365,0.687631 l 1.2484323,0 c 0.1611316,-0.402694 0.5547083,-0.687631 1.0155359,-0.687631 0.4603767,0 0.8539527,0.284937 1.0150847,0.687631 l 1.2484321,0 c 0.161132,-0.402694 0.554708,-0.687631 1.015536,-0.687631 0.460376,0 0.853953,0.284937 1.015085,0.687631 l 1.248431,0 c 0.160681,-0.402694 0.554709,-0.687631 1.015536,-0.687631 0.459925,0 0.853503,0.284937 1.014634,0.687631 l 1.249335,0 c 0.16068,-0.402694 0.554256,-0.687631 1.015085,-0.687631 0.460376,0 0.853501,0.284937 1.015084,0.687631 l 0.155715,0 c 0.09162,-0.229557 0.784897,-0.922965 1.015085,-1.015175 l 0,-0.170159 C 20.48162,20.91459 20.196819,20.520562 20.196819,20.06005 c 0,-0.460511 0.284801,-0.854043 0.687856,-1.014994 l 0,-1.248612 c -0.403055,-0.160998 -0.687856,-0.554845 -0.687856,-1.015402 0,-0.460692 0.284801,-0.853998 0.687856,-1.015355 l 0,-1.248612 C 20.48162,14.356304 20.196819,13.962231 20.196819,13.5019 c 0,-0.460693 0.284801,-0.854225 0.687856,-1.015355 l 0,-1.249155 c -0.403055,-0.160952 -0.687856,-0.554664 -0.687856,-1.015175 0,-0.4605108 0.284801,-0.8542238 0.687856,-1.0151748 l 0,-1.2487934 C 20.48162,7.797116 20.196819,7.4035842 20.196819,6.9428918 c 0,-0.4603314 0.284801,-0.8538621 0.687856,-1.0150392 l 0,-1.2487937 C 20.48162,4.518108 20.196819,4.1243963 20.196819,3.663885 20.196385,3.2040944 20.48162,2.8109247 20.884223,2.6497928" /> 
          </svg>
        </button>
        <a v-if="playing !== null" href="/#/home" :id="media.id+'-close'" class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
          <i class="material-icons">clear</i>
        </a>
      </div>
    </div>
  </div>  

</template>

<script>
  var $$$ = require('jquery')
  var marked = require('marked')
  module.exports = {
    replace: true,
    props: ['offset', 'media', 'height', 'width', 'playing'],
    data: function(){
      return {
        filter: '',
        x_offset: 0,
        y_offset: 0,
        w_offset: 0,
        h_offset: 0,
        w_loop: 0,
        filter_offset: 0,
        sw: 2,
        video_desc: '',
        video_title: '',
        iframe: null,
        interval: 0,
        img_now: 0,
        button: false,
        hover: false,
        on: false,
        assistido: false,
        votado: false,
        votos: 0
      }
    },
    watch: {
      offset: function(val, oldVal) {
        var self = this
        if (this.playing === null) {
          if (this.w_loop + this.offset + this.x_offset + this.media.x > this.width) {
            $$$('#'+this.media.id).addClass('in-trans')
            $$$('#'+this.media.id).css('opacity', 0)
            this.w_loop = - (this.w_loop + this.width + 250)
            setTimeout(function() {
              $$$('#'+self.media.id).css('opacity', 1)
              $$$('#'+self.media.id).removeClass('in-trans')
            }, 500)
          } else if (this.w_loop + this.offset + this.x_offset + this.media.x + this.media.width < -250) {
            $$$('#'+this.media.id).addClass('in-trans')
            $$$('#'+this.media.id).css('opacity', 0)
            this.w_loop = this.w_loop + this.width + 250
            setTimeout(function() {
              $$$('#'+self.media.id).css('opacity', 1)
              $$$('#'+self.media.id).removeClass('in-trans')
            }, 400)
          }
        }
      },
      on: function(val, oldVal) {
        if (oldVal === true) {
          this.unFlip(this.media.id)
        } else {
          componentHandler.upgradeDom()
        }
      },
      playing: function(val, oldVal) {
        if (val === this.media.id) {
          var width = $$$(window).width()
          var loc = this.media.x + this.offset + this.x_offset + this.w_loop + this.filter_offset
          var mw = ((this.height*.9)*16)/9
          $$$('#'+this.media.id).addClass('playing')
          this.h_offset = (this.height*.9) - this.media.height
          this.w_offset = mw - this.media.width
          this.offset = this.offset + ( ( ( width - mw ) /2) - loc )
          this.y_offset = (this.height*.05) - this.media.y
        } else if (oldVal === this.media.id) {
          $$$('#'+this.media.id).removeClass('playing')
          $$$('#'+this.media.id).removeClass('hover')
          this.h_offset = 0
          this.w_offset = 0
          this.y_offset = 0
          this.x_offset = 0
          this.hover = false
          this.on = false
          this.sw = this.media.shadow
          this.iframe.destroy()
        }
      },
      filter: function(val, oldVal) {
        if (val === this.media.nav && oldVal !== this.media.nav) {
          $$$('#'+this.media.id).removeClass('filtered')
          var width = $$$(window).width()
          var loc = this.media.x + this.offset + this.x_offset + this.w_loop
          var mw = ((this.height*.9)*16)/9
          var range = d3.scaleLinear()
                        .domain([0, this.width])
                        .range([100, width-400])

          var x_filter = range(this.media.x)
          this.filter_offset = x_filter - loc
        } else if (val === '') {
          $$$('#'+this.media.id).removeClass('filtered')
          this.filter_offset = 0
        } else {
          $$$('#'+this.media.id).addClass('filtered')
          this.filter_offset = 0
        }
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
        if (this.playing === null) {
          this.hover = true
          if (!self.on) {
            // self.w_offset = this.media.width * .05
            // self.h_offset = this.media.height * .05
            // self.x_offset = -self.w_offset/2
            // self.y_offset = -self.h_offset/2
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
        }
      },
      mouseOut: function(event) {
        var self = this
        if (this.playing === null) {
          this.hover = false
          if (self.on) {
            if (this.media.matrix[0][0]+this.offset+this.x_offset >= event.x || this.media.matrix[1][0]+this.offset-this.x_offset <= event.x || this.media.matrix[0][1]+this.y_offset <= event.y || this.media.matrix[1][1]+this.y_offset+this.media.height >= event.y) {
              setTimeout(function() {
                if (!self.hover) {
                  self.w_offset = 0
                  self.h_offset = 0
                  self.x_offset = 0
                  self.y_offset = 0
                  self.sw = self.media.shadow
                  self.on = false
                  $$$('#'+self.media.id).removeClass('hover')
                }
              }, 1500)
            }
          } else if (!self.on) {
            this.hover = false
            self.w_offset = 0
            self.h_offset = 0
            self.x_offset = 0
            self.y_offset = 0
            self.sw = self.media.shadow
            $$$('#'+self.media.id).removeClass('hover')
          }
        }
      },
      playThis: function() {
        this.playing = this.media.id
        this.iframe = new YT.Player(this.media.id+'-player', {
          height: '100%',
          width: '100%',
          videoId: this.media.video,
          events: {
            'onReady': this.playVideo,
            'onStateChange': this.videoFim
          }
        })
        document.cookie = "ass-"+this.media.id+"=true"
        this.$dispatch('assistido', this.media.id)
        this.assistido = true
      },
      closeMedia: function() {
        this.playing = null
      },
      playVideo: function(event) {
        event.target.playVideo()
      },
      videoFim: function(event) {
        var self = this
        if (event.data == YT.PlayerState.ENDED) {
          self.playing = null
        }
      },
      votar: function(event) {
        if (this.votado) {
          this.$dispatch('des-votado', this.media.id)
          document.cookie = "voto-"+this.media.id+"=false"
          this.votado = false
          this.votos = this.votos - 1
        } else {
          this.$dispatch('votado', this.media.id)
          document.cookie = "voto-"+this.media.id+"=true"
          this.votado = true
          this.votos = this.votos + 1
        }
      }
    },
    created: function () {
      this.interval = parseInt((Math.random() * 10000)+3000)
      this.sw = this.media.shadow
      this.votos = this.media.votes.length
      if(this.media.assistido) {
        this.assistido = true
      }
      if(this.media.votado) {
        this.votado = true
      }
      var self = this

      var playlistUrl = 'https://www.googleapis.com/youtube/v3/videos?part=snippet&id=' + this.media.video + '&key=AIzaSyCwNv14d5bNQ4MwaodqT6z45-6A5y4kzus'
      var videoURL= 'http://www.youtube.com/embed/'
      $$$.getJSON(playlistUrl, function(data) {
        // console.log(data)
        $$$.each(data.items, function(i, item) {
          // console.log(item)
          self.video_title = item.snippet.title
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

      this.$on('filter', function(nome) {
        if (this.filter === nome) {
          this.filter = ''
        } else {
          this.filter = nome
        }
      })
      
      if (this._uid === this.$parent.media_cloud.length + 2) {
        this.$dispatch('home-ready')
      }
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