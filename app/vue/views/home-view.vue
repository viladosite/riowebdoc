<style lang="scss">
	.fade-transition {
		transition: opacity .6s ease .4s;
		opacity: 1;
	}
	.fade-enter, .fade-leave {
		opacity: 0;
	}
	.fade-leave {
		transition: opacity .1s linear
	}
</style>

<template>
	<div class=" mdl-layout mdl-js-layout mdl-layout--fixed-header">

    <header class="rwd_header mdl-layout__header ">
			<div class="mdl-layout__header-row">

				<!-- Class destinada a dar um espaçamento grande -->
				<div class="mdl-layout-spacer"></div>

				<!-- Construção dos ícones indicativos no menu -->
				<nav class="mdl-navigation">

			    
				<a class="mdl-navigation__link" href="">PROJETO</a>
				<a class="mdl-navigation__link" href="">REALIZAÇÃO</a>
				<a class="mdl-navigation__link" href="">EQUIPE</a>
				<a class="mdl-navigation__link" href="">CONTATO</a>
				<a class="mdl-navigation__link" href="">BLOG</a>
				
				<a class="mdl-navigation__link" href="#" @click.prevent="createWebcard" rel="modal">
					<div id= "icon1" class="material-icons" >contact_mail</div>
				</a>

		    <div class="mdl-tooltip mdl-tooltip--large" for="icon1">
					Envie um Webcard
				</div>

				</nav>
			</div>
		</header>
    
   
    <main class="mdl-layout__content">
    
    	<div id="content">
    		
    		<div id="logo" class="logo">
    			<img src="images/logo.png" class="logoimg">
    		</div>


    		<div id="markers" class="markers">
		  		<div class="rwd_local">
		  			<span v-for="nave in naves">

		  				<button class="mdl-button mdl-js-button mdl-button--icon mdl-button--primary" :id="nave.headers.id" @click="filterNave(nave.headers.nome)">
			    			<i class="material-icons mdl-badge"> room </i>
			    		</button>
							<div class="mdl-tooltip" :for="nave.headers.id"> {{nave.headers.nome}} </div>
							
		  			</span>
		  			<div style="clear: both"></div>
		  		</div>
		  	</div>

		  	<div id="selo" class="selo">
		  		<a class="mdl-navigation__link" href="#janela1" rel="modal">
						
						<img src="images/selo.png" class="seloimg" id= "icon1">
				</a>	
    		</div>

		  	<media-cloud :naves="naves" user.sync="user" :filter.sync="filter"></media-cloud>

    	</div>
    
    
			<div id="rodape" class="rodape">

				<div id="rwdrodape" class="rwdrodape">
						
						<div id="git" class="sessaofooter"> 
							<a href="http://github.com/viladosite/riowebdoc" target="_blank"> Fork us at 
								<img src="images/github512.png" alt="Github Logo" height="24" width="24"/> 
							</a>
						</div>

						<div id="sessao1" class="sessaofooter">
							
							<div class="footertitle">Realização:</div>
							
							<div class="footerlogos">
							<a href="http://www.jardimdigital.com.br" target="_blank">
							<img src="images/rio_pref.png" alt="prefeitura Logo" class="footer_img1"/></a>

							&nbsp;&nbsp;&nbsp;&nbsp;
							
							</div>

						</div>

						<div id="sessao2" class="sessaofooter">
							
							<div class="footertitle">Parceria:</div>
							
							<div class="footerlogos">
							<a href="http://www.jardimdigital.com.br" target="_blank">
							<img src="images/grupo_ccr.png" alt="grupo ccr Logo" class="footer_img1"/></a>

							&nbsp; &nbsp; &nbsp; &nbsp;
							
							</div>

						</div>

						<div id="sessao3" class="sessaofooter">
							
							<div class="footertitle">Apoio:</div>
							
							<div class="footerlogos">
							<a href="http://www.jardimdigital.com.br" target="_blank">
							<img src="images/rio_onibus.png" alt="rio onibus Logo" class="footer_img1"/></a>

							&nbsp;&nbsp;&nbsp;&nbsp;
							<a href="http://www.viladosite.com.br" target="_blank">
							<img src="images/riofilme.png" alt="Vila do Site Logo" class="footer_img2"/></a>
							</div>

						</div>
				        
				        <div id="sessao4" class="sessaofooter">

							<div class="footertitle">Produção:</div>
							
							<div class="footerlogos">
							<a href="http://www.jardimdigital.com.br" target="_blank">
							<img src="images/mpc_logo.png" alt="Jardim Digital Logo" class="footer_img1"/></a>

							&nbsp;&nbsp;&nbsp;&nbsp;
							
							</div>

						</div>
						
						<div id="sessao5" class="sessaofooter">

							<div class="footertitle">Gestão das Naves do Conhecimento:</div>
							
							<div class="footerlogos">
							<a href="http://www.jardimdigital.com.br" target="_blank">
							<img src="images/cecip_logo.png" alt="Jardim Digital Logo" class="footer_img1"/></a>

							&nbsp;&nbsp;&nbsp;&nbsp;
							<a href="http://www.viladosite.com.br" target="_blank">
							<img src="images/redeh_logo.png" alt="Vila do Site Logo" class="footer_img2"/>
							</a>
							</div>

						</div>

						<div class="clearboth"></div>

				</div>

			</div>



</main>
    

	  <div class="window" id="janela1">
	    <a href="#" class="fechar"> <img src="images/icon_close.png" width="35px" height="35px" /> </a>
	    
	  </div>
	  <div id="mascara"></div> 

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
				webcard: {
					videoA: null,
					videoB: null,
					videoC: null,
					email_criador: null,
					email_enviado: null,
					menssagem: null
				},
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
      },
      filterNave: function(nome) {
      	this.$broadcast('filter', nome)
      }
		},
		computed: {
    	
		},
		created: function () {
			for (var i = 0; i < this.naves.length; i++) {
        for (var o = 0; o < this.naves[i].media.length; o++) {
          this.cookieVotos(this.naves[i].media[o].id)
          this.cookieAssistidos(this.naves[i].media[o].id)
        }
      }
		},
		attached: function () {
			componentHandler.upgradeDom()
		},
		components: {
			'media-cloud': require('../components/media-cloud.vue')
		},
		filters: {
      marked: function(value) {
      	return marked(value)
      }
    }
	}
</script>