<style lang="scss">
  
</style>

<template>

  <div id="media_cloud" class="mdl-grid" style="padding: 0; overflow: hidden" @wheel="onWheel" @mouseout="mouseOut">
    <div class="rwd_content mdl-cell mdl-cell--12-col" style="margin: 0; width: 100%; perspective: 800px;">

      <in-media v-for="media in medias" transition="fade" :media="media" :offset="offset" :height="height"></in-media>
<!--       <div v-for="areas in naves" :style="[{width: width / naves.length + 'px'}, {'background-color': 'rgb('+($index+10)*10 +','+($index+10)*10 +','+($index+10)*10+')'}, {left: (((width / naves.length) * $index) + offset) +'px'}]" style="position: absolute; height: 100%; z-index: 0;">{{$index}}</div>
      <div v-for="f in found" :style="[{width: f.matrix[1][0] - f.matrix[0][0] + 'px'}, {height: f.matrix[1][1] - f.matrix[0][1] + 'px'}, {top: f.matrix[0][1] + 'px'}, {left: (f.matrix[0][0] + offset) + 'px'}, {'background-color': f.color}]" style="z-index: 2; position: absolute;">{{$index}}</div> -->

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
        area: [],
        found: []
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
        var width = $$$(window).width()
        var size = {
          width: (width/6)/3,
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
        this.width = 300 * this.naves.length
        this.height = w-h
        this.offset = - width/2
        $$$('#media_cloud').height(w-h)
      },
      copyArray: function (n) {
        this.medias = this.media_cloud.slice(0, n+1)
      },
      scanArea: function (matrix_area, a, ar) {
        var espacos = []
        // console.log(matrix_area)
        var in_area = _.filter(ar, function (o) { 
          return o.matrix[0][0] > matrix_area[0][0] 
              && o.matrix[0][0] < matrix_area[1][0] + a.size.width 
              || o.matrix[1][0] > matrix_area[0][0] 
              && o.matrix[1][0] < matrix_area[1][0] })
        // console.log(in_area)
        if (in_area.length === 0) {
          espacos.push([[matrix_area[0][0], matrix_area[0][1]],
                        [matrix_area[1][0], matrix_area[1][1] - a.size.height]])
          // console.log(espacos)
          // this.found.push({color: 'rgba(' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',.5)' , matrix: [[matrix_area[0][0], matrix_area[0][1]],[matrix_area[1][0], matrix_area[1][1] - a.size.height]]})
        } else {
          var this_area = _.filter(in_area, function (o) { 
            return o.matrix[0][1] > matrix_area[0][1] 
                && o.matrix[0][1] < matrix_area[1][1]
                || o.matrix[1][1] > matrix_area[0][1] 
                && o.matrix[1][1] < matrix_area[1][1] })
          if (this_area.length === 0) {
            espacos.push([[matrix_area[0][0], matrix_area[0][1]],
                          [matrix_area[1][0], matrix_area[1][1] - a.size.height]])
            // console.log(espacos)
            // this.found.push({color: 'rgba(' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',.5)' , matrix: [[matrix_area[0][0], matrix_area[0][1]],[matrix_area[1][0], matrix_area[1][1] - a.size.height]]})
          } else {
            var min_y = _.min(this_area, function(min_y) {
              return min_y.matrix[0][1]
            })
            if (min_y.matrix[0][1] - matrix_area[0][1] > a.size.height) {
              // console.log('tem espaço em cima')
              espacos.push([matrix_area[0],
                           [matrix_area[1][0],min_y.matrix[0][1]-a.size.height]])
              // console.log(espacos)
              // this.found.push({color: 'rgba(' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',.5)' , matrix: [matrix_area[0],[matrix_area[1][0],min_y.matrix[0][1]-a.size.height]]})
            } 

            if (min_y.matrix[0][0] - matrix_area[0][0] > a.size.width) {
              // console.log('checando area a esquerda')
              var check_area_y = _.filter(this_area, function (o) { 
                return o.matrix[0][1] > matrix_area[0][1] 
                    && o.matrix[0][1] < min_y.matrix[1][1]
                    || o.matrix[1][1] > matrix_area[0][1] 
                    && o.matrix[1][1] < min_y.matrix[1][1]
              })
              var check_area = _.filter(check_area_y, function (o) { 
                return o.matrix[0][0] > matrix_area[0][0] 
                    && o.matrix[0][0] < min_y.matrix[0][0]
                    || o.matrix[1][0] > matrix_area[0][0] 
                    && o.matrix[1][0] < min_y.matrix[0][0]
              })
              if (check_area.length === 0) {
                // console.log('area a esquerda sem objetos')
                var bot_area_y = _.filter(this_area, function (o) { 
                  return o.matrix[0][1] > min_y.matrix[1][1] 
                  && o.matrix[0][1] < min_y.matrix[1][1] + a.size.height})
                var bot_area = _.filter(bot_area_y, function (o) { 
                  return o.matrix[0][0] > matrix_area[0][0] 
                      && o.matrix[0][0] < min_y.matrix[0][0]
                      || o.matrix[1][0] > matrix_area[0][0] 
                      && o.matrix[1][0] < min_y.matrix[0][0]
                      || o.matrix[0][0] < matrix_area[0][0] 
                      && o.matrix[1][0] > min_y.matrix[0][0]
                })
                if (bot_area.length === 0) {
                  // console.log('tem espaço na esquerda e sem impedimentos em baixo')
                  if (min_y.matrix[1][1] + a.size.height > matrix_area[1][1]) {
                    espacos.push([[matrix_area[0][0],matrix_area[0][1]],
                                  [min_y.matrix[0][0]-a.size.width,matrix_area[1][1] - a.size.height]])
                    // console.log(espacos)
                    // this.found.push({color: 'rgba(' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',.5)' , matrix: [[matrix_area[0][0],matrix_area[0][1]],[min_y.matrix[0][0]-a.size.width,matrix_area[1][1] - a.size.height]]})
                  } else {
                    espacos.push([[matrix_area[0][0],matrix_area[0][1]],
                                [min_y.matrix[0][0]-a.size.width,min_y.matrix[1][1]]])
                    // console.log(espacos)
                    // this.found.push({color: 'rgba(' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',.5)' , matrix: [[matrix_area[0][0],matrix_area[0][1]],[min_y.matrix[0][0]-a.size.width,min_y.matrix[1][1]]]})
                  }
                  
                } else {
                  var ss = _.min(bot_area, function(b) {
                    return b.matrix[0][1]
                  })
                  espacos.push([[matrix_area[0][0],matrix_area[0][1]],
                                [min_y.matrix[0][0]-a.size.width,ss.matrix[0][1]-a.size.height]])
                  // console.log(espacos)
                  // this.found.push({color: 'rgba(' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',.5)' , matrix: [[matrix_area[0][0],matrix_area[0][1]],[min_y.matrix[0][0]-a.size.width,ss.matrix[0][1]-a.size.height]]})
                }
              } else {
                // console.log('tem espaco entre os objetos ou acima?')
                var ob_esq = _.max(check_area, function(esq) {
                  return esq.matrix[1][0]
                })
                if (min_y.matrix[0][0] - ob_esq.matrix[1][0] > a.size.width) {
                  // console.log('tem entre!')
                  var bot_area_y = _.filter(this_area, function (o) { 
                    return o.matrix[0][1] > ob_esq.matrix[1][1] 
                    && o.matrix[0][1] < ob_esq.matrix[1][1] + a.size.height })
                  var bot_area = _.filter(bot_area_y, function (o) { 
                    return o.matrix[0][0] > ob_esq.matrix[1][0] 
                        && o.matrix[0][0] < min_y.matrix[0][0]
                        || o.matrix[1][0] > ob_esq.matrix[1][0] 
                        && o.matrix[1][0] < min_y.matrix[0][0] })
                  if (bot_area.length === 0) {
                    if (min_y.matrix[1][1] + a.size.height > matrix_area[1][1]) {
                      var down = matrix_area[1][1] - a.size.height
                    } else {
                      var down = min_y.matrix[1][1] - a.size.height
                    }
                    espacos.push([[ob_esq.matrix[1][0],matrix_area[0][1]],
                                  [min_y.matrix[0][0]-a.size.width,down]])
                    // console.log(espacos)
                    // this.found.push({color: 'rgba(' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',.5)' , matrix: [[ob_esq.matrix[1][0],matrix_area[0][1]],[min_y.matrix[0][0]-a.size.width,down]]})
                  } else {
                    var ss = _.min(bot_area, function(b) {
                      return b.matrix[0][1]
                    })
                    espacos.push([[ob_esq.matrix[1][0],matrix_area[0][1]],
                                  [min_y.matrix[0][0]-a.size.width,ss.matrix[0][1]-a.size.height]])
                    // console.log(espacos)
                    // this.found.push({color: 'rgba(' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',.5)' , matrix: [[ob_esq.matrix[1][0],matrix_area[0][1]],[min_y.matrix[0][0]-a.size.width,ss.matrix[0][1]-a.size.height]]})
                  }
                } else {
                  // console.log('não cabe entre os objetos')
                }

                var ob_esq_up = _.max(check_area, function(esq) {
                  return esq.matrix[1][0]
                })
                if (ob_esq_up.matrix[0][1] - matrix_area[0][1] > a.size.height) {
                  // console.log('tem acima!')
                  espacos.push([[matrix_area[0][0],matrix_area[0][1]],
                                [min_y.matrix[0][0]-a.size.width,ob_esq_up.matrix[0][1]-a.size.height]])
                  // console.log(espacos)
                  // this.found.push({color: 'rgba(' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',.5)' , matrix: [[matrix_area[0][0],matrix_area[0][1]],[min_y.matrix[0][0]-a.size.width,ob_esq_up.matrix[0][1]-a.size.height]]})
                } else {
                  // console.log('não cabe em acima')
                }
              }
            } 

            if (matrix_area[1][0] - min_y.matrix[1][0] > 0) {
              // console.log('checando area a direita')
              var check_area_y = _.filter(this_area, function (o) { 
                return o.matrix[0][1] > min_y.matrix[0][1] 
                    && o.matrix[0][1] < min_y.matrix[1][1] + a.size.height
                    || o.matrix[1][1] > min_y.matrix[0][1] 
                    && o.matrix[1][1] < min_y.matrix[1][1] + a.size.height
              })
              var check_area = _.filter(check_area_y, function (o) { 
                return o.matrix[0][0] > min_y.matrix[1][0] 
                    && o.matrix[0][0] < matrix_area[1][0] + a.size.width
              })
              if (check_area.length === 0) {
                // console.log('area a direita sem objetos')
                var bot_area_y = _.filter(this_area, function (o) { 
                  return o.matrix[0][1] > min_y.matrix[1][1] 
                      && o.matrix[0][1] < min_y.matrix[1][1] + a.size.height})
                var bot_area = _.filter(bot_area_y, function (o) { 
                  return o.matrix[0][0] > min_y.matrix[1][0] 
                      && o.matrix[0][0] < matrix_area[1][0] + a.size.width
                      || o.matrix[1][0] > min_y.matrix[1][0] 
                      && o.matrix[1][0] < matrix_area[1][0] + a.size.width
                      || o.matrix[0][0] < min_y.matrix[1][0] 
                      && o.matrix[1][0] > matrix_area[1][0] + a.size.width
                })
                if (bot_area.length === 0) {
                  // console.log('tem espaço na direita e sem impedimentos em baixo')
                  if (min_y.matrix[1][1] + a.size.height > matrix_area[1][1]) {
                    espacos.push([[min_y.matrix[1][0],matrix_area[0][1]],
                                  [matrix_area[1][0],matrix_area[1][1] - a.size.height]])
                    // console.log(espacos)
                    // this.found.push({color: 'rgba(' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',.5)' , matrix: [[min_y.matrix[1][0],matrix_area[0][1]],[matrix_area[1][0],matrix_area[1][1] - a.size.height]]})
                  } else {
                    espacos.push([[min_y.matrix[1][0],matrix_area[0][1]],
                                [matrix_area[1][0],min_y.matrix[1][1]]])
                    // console.log(espacos)
                    // this.found.push({color: 'rgba(' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',.5)' , matrix: [[min_y.matrix[1][0],matrix_area[0][1]],[matrix_area[1][0],min_y.matrix[1][1]]]})
                  }
                } else {
                  var ss = _.min(bot_area, function(b) {
                    return b.matrix[0][1]
                  })
                  espacos.push([[min_y.matrix[1][0],matrix_area[0][1]],
                                [matrix_area[1][0],ss.matrix[0][1]-a.size.height]])
                  // console.log(espacos)
                  // this.found.push({color: 'rgba(' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',.5)' , matrix: [[min_y.matrix[1][0],matrix_area[0][1]],[matrix_area[1][0],ss.matrix[0][1]-a.size.height]]})
                }
              } else {
                // console.log('tem espaco entre os objetos?')
                var ob_dir = _.min(check_area, function(esq) {
                  return esq.matrix[0][0]
                })
                if (ob_dir.matrix[0][0] - min_y.matrix[1][0] > a.size.width) {
                  // console.log('tem entre!')
                  var bot_area_y = _.filter(this_area, function (o) { 
                    return o.matrix[0][1] > ob_dir.matrix[1][1] 
                    && o.matrix[0][1] < ob_dir.matrix[1][1] + a.size.height })
                  var bot_area = _.filter(bot_area_y, function (o) { 
                    return o.matrix[0][0] > min_y.matrix[1][0] 
                        && o.matrix[0][0] < ob_dir.matrix[0][0]
                        || o.matrix[1][0] > min_y.matrix[1][0] 
                        && o.matrix[1][0] < ob_dir.matrix[0][0] })
                  if (bot_area.length === 0) {
                    if (min_y.matrix[1][1] + a.size.height > matrix_area[1][1]) {
                      var down = matrix_area[1][1] - a.size.height
                    } else {
                      var down = min_y.matrix[1][1] - a.size.height
                    }
                    espacos.push([[min_y.matrix[1][0],matrix_area[0][1]],
                                  [ob_dir.matrix[0][0]-a.size.width,down]])
                    // console.log(espacos)
                    // this.found.push({color: 'rgba(' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',.5)' , matrix: [[min_y.matrix[1][0],matrix_area[0][1]],[ob_dir.matrix[0][0]-a.size.width,down]]})
                  } else {
                    var ss = _.min(bot_area, function(b) {
                      return b.matrix[0][1]
                    })
                    espacos.push([[min_y.matrix[1][0],matrix_area[0][1]],
                                  [ob_dir.matrix[0][0]-a.size.width,ss.matrix[0][1]-a.size.height]])
                    // console.log(espacos)
                    // this.found.push({color: 'rgba(' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',.5)' , matrix: [[min_y.matrix[1][0],matrix_area[0][1]],[ob_dir.matrix[0][0]-a.size.width,ss.matrix[0][1]-a.size.height]]})
                  }
                } else {
                  // console.log('não cabe entre os objetos')
                }

                var ob_dir_up = _.min(check_area, function(esq) {
                  return esq.matrix[0][1]
                })
                if (ob_dir_up.matrix[0][1] - matrix_area[0][1] > a.size.height) {
                  // console.log('tem acima!')
                  espacos.push([[min_y.matrix[1][0],matrix_area[0][1]],
                                [matrix_area[1][0],ob_dir_up.matrix[0][1]-a.size.height]])
                  // console.log(espacos)
                  // this.found.push({color: 'rgba(' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',.5)' , matrix: [[min_y.matrix[1][0],matrix_area[0][1]],[matrix_area[1][0],ob_dir_up.matrix[0][1]-a.size.height]]})
                } else {
                  // console.log('não cabe em acima')
                }
              }
            } 

            if (matrix_area[1][1] - min_y.matrix[1][1] > a.size.height) {
              // console.log('scanear abaixo')
              var area_baixo = _.filter(this_area, function (o) { 
                return o.matrix[0][1] > min_y.matrix[1][1] 
                    && o.matrix[0][1] < matrix_area[1][1] + a.size.height
              })

              if (area_baixo === 0) {
                espacos.push([[matrix_area[0][0],min_y.matrix[1][1]],
                              [matrix_area[1][0],matrix_area[1][1] - a.size.height]])
                // console.log(espacos)
                // this.found.push({color: 'rgba(' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',.5)' , matrix: [[matrix_area[0][0],min_y.matrix[1][1]],[matrix_area[1][0],matrix_area[1][1] - a.size.height]]})
              } else {
                // console.log('executar novo scan')
                // console.log(espacos)
                var botArea = [[matrix_area[0][0],min_y.matrix[1][1]],
                                [matrix_area[1][0],matrix_area[1][1]]]
                var botEspacos = this.scanArea(botArea, a, ar)
                // console.log(botEspacos)
                espacos = espacos.concat(botEspacos)
                // console.log(espacos)
              }

            }
          }

        }

        return espacos

      },
      checkPos: function(a, n, p, area) {
        var pos = {
          x: 0,
          y: 0
        }

        var ar = this.media_cloud.slice(0, n)
        // console.log(ar)

        var matrix_area = [
                            [((this.width/this.naves_array.length)*area)-(this.width/this.naves_array.length), 0 ],
                            [(this.width/this.naves_array.length)*area, this.height ] 
                          ]
        var espacos = this.scanArea(matrix_area, a, ar)

        if (espacos.length === 0) {
          // console.log('nenhum espaço achados')
        } else {
          // console.log('espaços achados')
          // console.log(espacos)
          // console.log('randomizar espaços')
          if (espacos.length === 1) {
            var esp_rand = 0
          } else {
            var esp_rand = parseInt(Math.random() * espacos.length)
          }
          // console.log(esp_rand)
          pos.x = Math.random() * (espacos[esp_rand][1][0] - espacos[esp_rand][0][0]) + espacos[esp_rand][0][0]
          pos.y = Math.random() * (espacos[esp_rand][1][1] - espacos[esp_rand][0][1]) + espacos[esp_rand][0][1]
          return pos
        }
 
      },
      arrangeItens: function (n, x) {
        var a = {
          size: {
            width: this.media_cloud[n].width,
            height: this.media_cloud[n].height
          },
          pos: null
        }
        this.found=[]

        var area = null
        if (this.area.length === 0) {
          var temp_array = this.naves_array.filter(function() {return true})
          this.area = this.shuffle(temp_array)
          area = this.area.pop()
        } else {
          area = this.area.pop()
        }

        if (n%2 == 0) {
          // console.log('par')
          a.pos = this.checkPos(a, n, 'par', area)
        } else {
          // console.log('impar')
          a.pos = this.checkPos(a, n, 'impar', area)
        }

        if (a.pos == undefined && x < this.naves_array.length) {
          this.arrangeItens(n, x+1)
        } else if (a.pos == undefined && x === this.naves_array.length) {
          // console.log('sem mais espaços')
        } else if (n !== this.media_cloud.length - 1) {
          this.media_cloud[n].x = a.pos.x
          this.media_cloud[n].y = a.pos.y
          this.media_cloud[n].matrix = [[a.pos.x, a.pos.y], [a.pos.x+a.size.width, a.pos.y+a.size.height]]
          this.copyArray(n)
          this.arrangeItens(n+1, 1)
        } else {
          this.media_cloud[n].x = a.pos.x
          this.media_cloud[n].y = a.pos.y
          this.media_cloud[n].matrix = [[a.pos.x, a.pos.y], [a.pos.x+a.size.width, a.pos.y+a.size.height]]
          this.copyArray(n)
        } 
      },
      mouseMove: function (event) {
        var self = this
        var range = d3.scaleLinear()
                      .domain([0, self.width/2])
                      .range([0, 2])
        var interval = -(range(event.clientX) - 1)
        if (interval > -0.2 && interval < 0.2) {
          self.interval = 0
        } else {
          self.interval = -(range(event.clientX) - 1)
        }
      },
      mouseOut: function (event) {
        this.interval = 0
      },
      onWheel: function (event) {
        var offset = 50
        if (event.wheelDelta > 0) {
          this.offset = this.offset + offset
        } else {
          this.offset = this.offset - offset
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
          if (size.width < (($$$(window).width()/6)/3)*1.5   ) {
            m.shadow = 4
          } else {
            m.shadow = 2
          }
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
      this.arrangeItens(0, 1)
      // window.setInterval(function(){
      //   self.offset = self.offset + (self.interval*0.1)
      // }, 1);
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