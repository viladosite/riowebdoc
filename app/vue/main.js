(function(){
	var _ = require('underscore')
	var Vue = require('vue')
	var Router = require('director').Router
	var app = new Vue(require('./app.vue'))
	Vue.config.debug = true

	// ROUTES

	var routes = {
		'/home' : {
			on: function () {
				app.$data.className = 'is-home'
				ga('send', 'pageview', '/home')
				Vue.nextTick(function () {
					app.$data.view = 'home-view'
				})
			}
		},
		'/:id': {
			on: function (id) {
				// var ids = []
				// for (var i = 0; i < app.$data.database.length; i++) {
				// 	ids.push(app.$data.database[i].headers.id)
				// }
				// // console.log(ids)
				// var validation = _.indexOf(ids, id)

				// var self = this
				// var last_route = app.$data.params.route
				// var cur_route = app.$data.params.route = self.getRoute()

				// if (app.$data.view === 'video-view' && app.$data.params.video === id && validation !== -1) {
				// 	ga('send', 'event', 'EventoInfo', 'close', id + '::info-' + last_route)
					
				// 	// conditions
				// 	var last_is_info = last_route.length > 1 && last_route[1] == 'info';
				// 	var current_is_info = cur_route.length > 1 && cur_route[1] == 'info';

				// 	if(last_is_info && !current_is_info){
				// 		app.$refs.view.infoClose()
				// 	}

				// 	return // prevent transition on the same id

				// } else if(validation === -1){
				// 	console.log('not-found')
				// 	router.notfound()
				// }

				// // force transition

				// app.$data.view = ''

				// Vue.nextTick(function () {
				// 	// console.log('video-view')
				// 	ga('send', 'pageview', '/'+id)
				// 	app.$data.home = false
				// 	app.$data.db = app.$data.database[validation]
				// 	app.$data.view = 'video-view'
				// 	app.$data.params.video = id
				// 	app.$data.className = 'is-video'
				// })
				
			}
		}
	}
	var getData = function (desc) {
		return JSON.parse(desc)
	}
	var getHeaders = function (hip) {
		var head_card = _.findWhere(hip, { "name": "headers" })
		var headers = getData(head_card.desc)
		return headers
	}
	var getMedia = function (n, medias, headers, nn, naves) {
		var media = getData(medias[n].desc)
		media.id = medias[n].id
		media.nome = medias[n].name
		attachVotes(n, media, medias, headers, nn, naves)
	}
	var attachVotes = function (n, media, medias, headers, nn, naves) {
		Trello.get("/cards/"+media.id+"/actions", function(comment) {
			var votes = []
			for (var i = 0; i < comment.length; i++) {
				votes.push(comment[i].data.text)
			}
			media.votes = votes
			media.labels = medias[n].labels.length
			attachImages(n, media, medias, headers, nn, naves)
		})
	}
	var attachImages = function (n, media, medias, headers, nn, naves) {
		Trello.get("/cards/"+media.id+"/attachments", function(attach) {
			if (n===0) {
				var nave = {
					headers: headers,
					media: []
				}
			} else {
				var nave = headers
			}
			var imgs = []
			for (var i = 0; i < attach.length; i++) {
				imgs.push(attach[i].url)
			}
			media.imgs = imgs
			nave.media.push(media)
			if (n === medias.length - 1) {
				app.$data.naves.push(nave)
			} else if (n < medias.length-1) {
				getMedia(n+1, medias, nave, nn, naves)
			}

			if (n === medias.length - 1 && nn === naves.length - 1) {
				init()
			}
		})
	}
	var getHiper = function (board) {
		Trello.get("/boards/"+board+"/lists", function(hipervideos) {
			var naves = _.filter(hipervideos, function(obj) {
				return obj.name !== 'Webcards'
			})
			var webcards = _.filter(hipervideos, function(obj) {
				return obj.name === 'Webcards'
			})
			// console.log(naves)
			// console.log(webcards)
			getNaves(0, naves)
			getWebcards(webcards)
		})
	}
	var getNaves = function (n, naves) {
		Trello.get("/lists/"+naves[n].id+"/cards", function(hip) {
			var headers = getHeaders(hip)
			headers.nome = naves[n].name
			headers.id = naves[n].id
			var medias = _.filter(hip, function(obj) {
				return obj.name !== 'headers'
			})

			getMedia(0, medias, headers, n, naves)
			if (n < naves.length-1) {
				getNaves(n+1, naves)
			}
		})
	}
	var getWebcards = function (webcards) {
		Trello.get("/lists/"+webcards[0].id+"/cards", function(hip) {
			for (var i = 0; i < hip.length; i++) {
				app.$data.webcards.push(getData(hip[i].desc))
			}
		})
	}

	getHiper('WNJjzEpj')

	var router = new Router(routes)

	// init()
	// ROUTER INIT
	
	function init(){
		console.log("init")
		router 
			.configure({
				recurse: 'forward',
				notfound: function () {
					router.setRoute('/home')
				}
			})
			.init('/')
	}

})()
