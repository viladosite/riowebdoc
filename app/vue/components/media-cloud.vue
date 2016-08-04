<style lang="scss">
  
</style>

<template>

  <div id="media_cloud" class="mdl-grid" style="padding: 0; overflow: hidden" @mousemove="mouseMove" @mouseout="mouseOut">
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
        naves_array: [],
        width: 0,
        height: 0,
        offset: 0,
        interval: 0,
        area: []
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

        size.width = parseInt(size.width + votos + labels)
        size.height = parseInt((size.width * 9)/16)
        return size;
      },
      changeCanvasSize: function () {
        var h = $$$('#markers').outerHeight() + $$$('header').outerHeight() + $$$('footer').outerHeight()
        var w = $$$(window).height()
        var width = $$$(window).width()
        this.width = width
        this.height = w-h
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
              if (right - left < bottom - top && right - left > 1 && toggle !== 'y' || toggle === 'x' && right - left > 1) {
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
                  console.log(right - left)
                  console.log(a.size.width)
                  console.log(k.width)
                  console.log(a.pos.x)
                  console.log(o.pos.x)
                  console.log('a1')
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
                  console.log(right - left)
                  console.log(a.size.width)
                  console.log(k.width)
                  console.log(a.pos.x)
                  console.log(o.pos.x)
                  console.log('a2')
                  self.checkPos(o, array, n, 'y')
                }
              } else if (right - left > bottom - top && bottom - top > 1 && toggle !== 'x' || toggle === 'y' && bottom - top > 1) {
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
          size: {
            width: this.media_cloud[n].width,
            height: this.media_cloud[n].height
          },
          pos: null
        }
        var area = null
        if (this.area.length === 0) {
          var temp_array = this.naves_array.filter(function() {return true})
          this.area = this.shuffle(temp_array)
          area = this.area.pop()
        } else {
          area = this.area.pop()
        }
        if (n%2 == 0) {
          console.log('par')
          var pos = {
            x: Math.random() * ( ((this.width/this.naves_array.length)*(area+1)) - ((this.width/this.naves_array.length)*area) ) + ((this.width/this.naves_array.length)*area),
            y: Math.random() * (this.height/2)
          }
          console.log(pos.y)
        } else {
          console.log('impar')
          var pos = {
            x: Math.random() * ( ((this.width/this.naves_array.length)*(area+1)) - ((this.width/this.naves_array.length)*area) ) + ((this.width/this.naves_array.length)*area),
            y: Math.random() * ((this.height - this.media_cloud[n].height) - this.height/2) + this.height/2
          }
          console.log(pos.y)
        }
        a.pos = pos
        a.id = this.media_cloud[n].id
        if (n===0) {
          console.log(n)
          this.media_cloud[n].x = a.pos.x
          this.media_cloud[n].y = a.pos.y
          this.copyArray(n)
          this.arrangeItens(n+1)
        } else if (n!==this.media_cloud.length - 1 && n!== 0) {
          console.log(n)
          this.checkPos(a, this.media_cloud, n, null)
          this.copyArray(n)
          this.arrangeItens(n+1)
        } else if (n===this.media_cloud.length - 1) {
          console.log(n)
          this.checkPos(a, this.media_cloud, n, null)
          this.copyArray(n)
        }
      },
      checkPos2: function(a, n, p, area) {
        var pos = {
          x: 0,
          y: 0
        }

        var ar = this.media_cloud.slice(0, n)
        if (p === 'par') {
          var part = [0, this.height/2]
        } else {
          var part = [this.height/2, this.height]
        }

        var matrix_area = [
                            [((this.width/this.naves_array.length)*area)-(this.width/this.naves_array), part[0] ]],
                            [(this.width/this.naves_array.length)*area, part[1] ]]
                          ]

        var in_area = _.filter(ar, function (a) { return a.matrix[0][0] > matrix_area[0][0] && a.matrix[0][0] < matrix_area[1][0] + a.size.width })

        if (in_area.length === 0) {
          pos.x = Math.random() * (matrix_area[1][0] - matrix_area[0][0]) + matrix_area[0][0]
          pos.y = Math.random() * (matrix_area[1][0] - matrix_area[0][1]) + matrix_area[0][0]
        }
      },
      arrangeItens2: function (n) {
        var a = {
          size: {
            width: this.media_cloud[n].width,
            height: this.media_cloud[n].height
          },
          pos: null
        }

        var area = null
        if (this.area.length === 0) {
          var temp_array = this.naves_array.filter(function() {return true})
          this.area = this.shuffle(temp_array)
          area = this.area.pop()
        } else {
          area = this.area.pop()
        }

        if (n%2 == 0) {
          console.log('par')
          a.pos = this.checkPos2(a, n, 'par', area)
        } else {
          console.log('impar')
          a.pos = this.checkPos2(a, n, 'impar', area)
        }

        console.log(n)
        this.media_cloud[n].x = a.pos.x
        this.media_cloud[n].y = a.pos.y
        this.copyArray(n)

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
          self.interval = -(range(event.clientX) - 1)
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
        this.naves_array.push(i+1)
        this.area.push(i+1)
      }
      this.media_cloud = _.sortBy(this.shuffle(this.media_cloud), 'width')
      this.media_cloud.reverse()
      this.shuffle(this.area)

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