<style lang="scss">
	
</style>

<template>
	<div class=" mdl-layout mdl-js-layout mdl-layout--fixed-header">

    <!-- Inclui o header -->
    

    <!-- Inclui o drawer com o menu principal -->
    
   
    <main class="mdl-layout__content">
    
     <div id="content"> </div>
    
    </main>

   <!-- Inclui o footer -->

	</div>
</template>

<script>
	var $$$ = require('jquery')
	var marked = require('marked')
	module.exports = {
		replace: true,
		props: ['naves'],
		data: function(){
			return {
				media_cloud: [],
				user: {
					votos: [],
					assistidos: []
				}
			}
		},
		methods: {
      getCookie: function(cname) {
		    var name = cname + "=";
		    var ca = document.cookie.split(';')
		    for(var i=0; i<ca.length; i++) {
	        var c = ca[i]
	        while (c.charAt(0)==' ') c = c.substring(1)
	        if (c.indexOf(name) == 0) return c.substring(name.length,c.length)
		    }
		    return ""
			},
      cookieVotos: function(n) {
      	switch(this.getCookie('voto-'+n)) {
					case '':
						document.cookie = "voto-"+n+"=false"
						break
					case 'true':
						this.user.votos.push(n)
						break
					case 'false':
						break
				}
      },
      cookieAssistidos: function(n) {
      	switch(this.getCookie('ass-'+n)) {
					case '':
						document.cookie = "ass-"+n+"=false"
						break
					case 'true':
						this.user.assistidos.push(n)
						break
					case 'false':
						break
				}
      }
		},
		computed: {
    	
		},
		created: function () {
			for (var i = 0; i < this.naves.length; i++) {
				for (var o = 0; o < this.naves[i].media.length; o++) {
					this.cookieVotos(this.naves[i].media[o].id)
					this.cookieAssistidos(this.naves[i].media[o].id)
					var m = this.naves[i].media[o]
					m.nav = this.naves[i].headers.nome
					this.media_cloud.push(m)
				}
			}

		},
		attached: function () {

		},
		components: {
			
		},
		filters: {
      marked: function(value) {
      	return marked(value)
      }
    }
	}
</script>