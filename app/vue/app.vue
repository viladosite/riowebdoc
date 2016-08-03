<style lang="scss">

</style>

<template>

	<div>
		<main class="" :is="view" transition="fade" :class="[className]" :card="card" :naves="naves" :user.sync="user" v-ref:view ></main>
	</div>
	
</template>

<script>
	var _ = require('underscore')
	var md5 = require('blueimp-md5')
	var $$$ = require('jquery')
  var perfectScrollbar = require('perfect-scrollbar')

	module.exports = {
		el: '#app',
		data: {
			className: '',
			webcards: [],
			naves: [],
			view: '',
			card: null
		},
		watch : {
			
		},
		computed: {
      
		},
		methods: {
      
		},
		created: function() {

		},
		attached: function() {
			
		},
		components: {
			'home-view': require('./views/home-view.vue'),
			'card-view': require('./views/card-view.vue')
		}
	}

</script>