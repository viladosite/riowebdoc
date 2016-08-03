<style lang="scss">
  
</style>

<template>

  <div id="media_cloud" class="mdl-grid" style="padding: 0; overflow: hidden">
    <div class="rwd_content mdl-cell mdl-cell--12-col" style="margin: 0; width: 100%; perspective: 800px;">

      <in-media v-for="media in medias" transition="fade" :media="media" :offset="offset"></in-media>

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
        medias: [],
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
        this.height = h
        this.offset = width/2
        $$$('#media_cloud').height(w-h)
      },
      copyArray: function () {
        this.medias = this.media_cloud
      },
      checkPos: function(a, array, n) {
        var ar = array.slice(0, n)
        var self = this
        console.log(ar)
        console.log(n)
        d3.map(ar).each(function(k, v, m) {
          var left = Math.max(a.pos.x, k.x)
          var right = Math.min((a.pos.x + a.size.width), (k.x + k.width))
          var top = Math.min(a.pos.y, k.y)
          var bottom = Math.max((a.pos.y + a.size.height), (k.y + k.height))
          a.area = a.size.width * a.size.height 
          k.area = k.width * k.height 
          if (left < right && bottom < top) {
            console.log('intercendiu')
            var int_area = (right - left) * (top - bottom)
            console.log(int_area)
            if (k.area * 0.3 < int_area) {
              if (right - left > top - bottom) {
                a.pos.x = a.pos.x + (Math.ramdom() * (right - left + 20))
                self.checkPos(a, array, n)
              } else if (right - left < top - bottom) {
                a.pos.y = a.pos.y + (Math.ramdom() * (top - bottom + 20))
                self.checkPos(a, array, n)
              } else {
                self.media_cloud[n].x = a.pos.x
                self.media_cloud[n].y = a.pos.y
              }
            } else {
              self.media_cloud[n].x = a.pos.x
              self.media_cloud[n].y = a.pos.y
            }
          } else {
            console.log('nao intercendiu')
            self.media_cloud[n].x = a.pos.x
            self.media_cloud[n].y = a.pos.y
          }
        })
      },
      arrangeItens: function (n) {
        var a = {
          size: null,
          pos: null
        }
        a.size = {
          widht: this.media_cloud[n].width,
          height: this.media_cloud[n].height
        }
        var pos = {
          x: Math.random() * (this.width - this.media_cloud[n].width),
          y: Math.random() * (this.height - this.media_cloud[n].height)
        }
        a.pos = pos
        a.id = this.media_cloud[n].id
        if (n===0) {
          console.log(n)
          this.media_cloud[n].x = a.pos.x
          this.media_cloud[n].y = a.pos.y
          this.arrangeItens(n+1)
        } else if (n!==this.media_cloud.length - 1 && n!== 0) {
          this.checkPos(a, this.media_cloud, n)
          console.log(n)
          this.arrangeItens(n+1)
        } else if (n===this.media_cloud.length - 1) {
          this.checkPos(a, this.media_cloud, n)
          this.copyArray()
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
          var size = this.getSize(m)
          m.width = size.width
          m.height = size.height
          m.x = 0
          m.y = 0
          this.media_cloud.push(m)
        }
      }
      this.media_cloud = this.shuffle(this.media_cloud)

    },
    attached: function () {
      componentHandler.upgradeDom()
      this.changeCanvasSize()
      this.arrangeItens(0)
    },
    components: {
      'in-media': require('./media.vue')
    },
    filters: {
      marked: function(value) {
        return marked(value)
      }
    }
  }
</script>