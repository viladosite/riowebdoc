<style lang="scss">
  
</style>

<template>

  <div id="media_cloud" class="mdl-grid" style="padding: 0; overflow: hidden" @mouseout="mouseOut">
    <div class="rwd_content mdl-cell mdl-cell--12-col" style="margin: 0; width: 100%; perspective: 800px;">

      <in-media v-for="media in medias" transition="fade" :media="media" :offset="offset"></in-media>

    </div>  
  </div>  

</template>

<script>
  var $$$ = require('jquery')
  var marked = require('marked')
  var _ = require('underscore')
  module.exports = {
    replace: true,
    props: ['naves', 'user'],
    data: function(){
      return {
        media_cloud: [],
        medias: [],
        width: 0,
        height: 0,
        offset: 0,
        interval: 0
      }
    },
    methods: {
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
          width: 100,
          height: 0
        }
        var votos = size.width * (media.votes.length/50)
        var labels = size.width * media.labels

        size.width = size.width + votos + labels
        size.height = (size.width * 9)/16
        return size;
      },
      changeCanvasSize: function () {
        var h = $$$('#markers').outerHeight() + $$$('header').outerHeight() + $$$('footer').outerHeight()
        var w = $$$(window).height()
        var width = $$$(window).width()
        this.width = width*3
        this.height = h
        this.offset = - width/2
        $$$('#media_cloud').height(w-h)
      },
      copyArray: function (n) {
        this.medias = this.media_cloud.slice(0, n+1)
      },
      checkPos: function(a, array, n, t) {
        var ar = array.slice(0, n)
        var cof = true
        var toggle = t
        var intercessoes = []
        var self = this
        d3.map(ar).each(function(k, v, m) {
          var left = Math.max(a.pos.x, k.x)
          var right = Math.min((a.pos.x + a.size.width), (k.x + k.width))
          var top = Math.max(a.pos.y, k.y)
          var bottom = Math.min((a.pos.y + a.size.height), (k.y + k.height))
          a.area = a.size.width * a.size.height 
          k.area = k.width * k.height
          if (left < right && bottom > top) {
            console.log('intercendiu')
            var int_area = (right - left) * (bottom - top)
            intercessoes.push(int_area)
            // console.log(intercessoes)
            if (k.area * 0.3 < int_area || a.area * 0.3 < int_area || intercessoes.length > 1 ) {
              if (right - left < bottom - top && right - left > 1 || toggle === 'x') {
                if (a.pos.x > k.x && cof) {
                  cof = false
                  var o = {
                    pos: {
                      x: parseFloat(parseFloat(a.pos.x + (right - left)).toFixed(2)),
                      y: a.pos.y
                    },
                    size: {
                      width: a.size.width,
                      height: a.size.height
                    }
                  }
                  if (o.pos.x + o.size.width > self.width) {
                    console.log(o.pos.x)
                    console.log(k.width)
                    o.pos.x = o.pos.x - (k.width*2)
                    console.log('x maior que '+self.width)
                    console.log(o.pos.x)
                  } else {
                    console.log(right - left)
                    console.log(a.size.width)
                    console.log(k.width)
                    console.log(a.pos.x)
                    console.log(o.pos.x)
                    console.log('a1')
                  }
                  self.checkPos(o, array, n, 'y')
                } else if (a.pos.x < k.x && cof) {
                  cof = false
                  var o = {
                    pos: {
                      x: parseFloat(parseFloat(a.pos.x - (right - left)).toFixed(2)),
                      y: a.pos.y
                    },
                    size: {
                      width: a.size.width,
                      height: a.size.height
                    }
                  }
                  if (o.pos.x < 0) {
                    console.log(o.pos.x)
                    console.log(k.width)
                    o.pos.x = o.pos.x + (k.width*2)
                    console.log('x menor que 0')
                    console.log(o.pos.x)
                  } else {
                    console.log(right - left)
                    console.log(a.size.width)
                    console.log(k.width)
                    console.log(a.pos.x)
                    console.log(o.pos.x)
                    console.log('a2')
                  }
                  self.checkPos(o, array, n, 'y')
                }
              } else if (right - left > bottom - top && bottom - top > 1 || toggle === 'y') {
                if (a.pos.y > k.y && cof) {
                  cof = false
                  var o = {
                    pos: {
                      x: a.pos.x,
                      y: parseFloat(parseFloat(a.pos.y + (bottom - top)).toFixed(2))
                    },
                    size: {
                      width: a.size.width,
                      height: a.size.height
                    }
                  } 
                  if (o.pos.y + o.size.height > self.height) {
                    console.log(o.pos.y)
                    console.log(k.height)
                    o.pos.y = o.pos.y - k.height
                    console.log('y maior que '+self.height)
                    console.log(o.pos.y)
                  } else {
                    console.log(bottom - top)
                    console.log(a.size.height)
                    console.log(k.height)
                    console.log(a.pos.y)
                    console.log(o.pos.y)
                    console.log('a3')
                  }
                  self.checkPos(o, array, n, 'x')
                } else if (a.pos.y < k.y && cof) {
                  cof = false
                  var o = {
                    pos: {
                      x: a.pos.x,
                      y: parseFloat(parseFloat(a.pos.y - (bottom - top)).toFixed(2))
                    },
                    size: {
                      width: a.size.width,
                      height: a.size.height
                    }
                  }
                  if (o.pos.y < 0) {
                    console.log(o.pos.y)
                    console.log(k.height)
                    o.pos.y = o.pos.y + (k.height*2)
                    console.log('y menor que 0...')
                    console.log(o.pos.y)
                  } else {
                    console.log(bottom - top)
                    console.log(a.size.height)
                    console.log(k.height)
                    console.log(a.pos.y)
                    console.log(o.pos.y)
                    console.log('a4')
                  }
                  self.checkPos(o, array, n, 'x')
                }
              } else {
                a.pos.y = parseFloat(a.pos.y + bottom - top).toFixed(2)
                a.pos.x = parseFloat(a.pos.x + right - left).toFixed(2)
                self.media_cloud[n].x = a.pos.x
                self.media_cloud[n].y = a.pos.y
              }
            } else {
              self.media_cloud[n].x = a.pos.x
              self.media_cloud[n].y = a.pos.y
            }
          } else {
            if (cof === true) {
              console.log('nao intercendiu')
              // console.log(a.pos)
              self.media_cloud[n].x = a.pos.x
              self.media_cloud[n].y = a.pos.y
            }
          }
        })
      },
      arrangeItens: function (n) {
        var a = {
          size: null,
          pos: null
        }
        a.size = {
          width: this.media_cloud[n].width,
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
          this.copyArray(n)
          // this.arrangeItens(n+1)
        } else if (n!==this.media_cloud.length - 1 && n!== 0) {
          console.log(n)
          this.checkPos(a, this.media_cloud, n, null)
          this.copyArray(n)
          // this.arrangeItens(n+1)
        } else if (n===this.media_cloud.length - 1) {
          console.log(n)
          this.checkPos(a, this.media_cloud, n, null)
          this.copyArray(n)
        }
      },
      mouseMove: function (event) {
        var self = this
        var range = d3.scaleLinear()
                      .domain([0, self.width/2])
                      .range([0, 2])
        var interval = -(range(event.clientX) - 1)
        if (interval > -0.5 && interval < 0.5) {
          self.interval = 0
        } else {
          self.interval = -((range(event.clientX) - 1)*3)
        }
      },
      mouseOut: function (event) {
        this.interval = 0
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
      this.media_cloud = _.sortBy(this.shuffle(this.media_cloud), 'width')
      this.media_cloud.reverse()

    },
    attached: function () {
      var self = this
      componentHandler.upgradeDom()
      this.changeCanvasSize()
      this.arrangeItens(0)
      window.setInterval(function(){
        self.offset = self.offset + self.interval
      }, 1);
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