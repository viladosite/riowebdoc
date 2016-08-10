<style lang="scss">
	.fade-transition {
		transition: opacity .6s ease;
		opacity: 1;
	}
	.fade-enter, .fade-leave {
		opacity: 0;
		position: absolute;
		width: 100%;
	}
</style>

<template>
	<div class=" mdl-layout mdl-js-layout mdl-layout--fixed-header">

    <header class=" mdl-layout__header mdl-layout__header--transparent">
			<div class="mdl-layout__header-row">
				<span class="mdl-layout-title"> Riowebdoc </span>

				<!-- Class destinada a dar um espaçamento grande -->
				<div class="mdl-layout-spacer"></div>

				<!-- Construção dos ícones indicativos no menu -->
				<nav class="mdl-navigation">

			    <a class="mdl-navigation__link" href="#janela1" rel="modal">
						<div id= "icon1" class="material-icons" >contact_mail</div>
					</a>
		      	<div class="mdl-tooltip mdl-tooltip--large" for="icon1">
						Envie um Webcard
				</div>

				</nav>
			</div>
		</header>
    

    <div class="mdl-layout__drawer">
	   	<span class="mdl-layout-title">Riowebdoc</span>

			<div id="menu" name="menu">
	      <nav class="mdl-navigation">

					<a class="mdl-navigation__link" href="#">
	          <i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">home</i>
	          Início
	        </a>

		    	<div class="rwd_watched">
		    		<a class="mdl-navigation__link" href="#">
		          <i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">ondemand_video</i>
		          Assistidos
		        </a>
	          <div class="rwd_wdvideos">
	            Os vídeos entram aqui!!
	          </div>        
		    	</div>
		     

		    	<div class="rwd_liked">        
		    		<a class="mdl-navigation__link" href="#">
		          <i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">thumb_up</i>
		          Gostei
		        </a>
		        <div class="rwd_lkvideos">
		          Os vídeos entram aqui!!
		        </div>   
		    	</div>
	            
	    	</nav>
	    </div>
	  </div>
    
   
    <main class="mdl-layout__content">
    
    	<div id="content">
    		<div class="mdl-grid" id="markers">
		  		<div class="rwd_local mdl-cell mdl-cell--12-col">

		  			<span v-for="nave in naves">
		  				<a class="mdl-button mdl-js-button mdl-button--icon mdl-button--primary" :id="nave.id">
			    			<i class="material-icons mdl-badge"> room </i>
			    		</a>
			    			

							<div class="mdl-tooltip" :for="nave.id"> {{nave.nome}} </div>
		  			</span>

		  		</div>
		  	</div>

		  	<media-cloud :naves="naves" user.sync="user"></media-cloud>

    	</div>

    	<!--
    	<footer class="mdl-mini-footer">
			<div class="mdl-mini-footer__left-section">
				<div class="mdl-logo"> 
					<a href="http://github.com/viladosite/riowebdoc" target="_blank"> Fork us at 
						<img src="images/github512.png" alt="Github Logo" height="24" width="24"/> 
					</a>
				</div>

        <ul class="mdl-mini-footer--link-list">
        	<li><a href="#">patrocinador</a></li>
        </ul>
				
			</div>

			

			<div class="mdl-mini-footer__right-section">
				<ul class="mdl-mini-footer--link-list">
  			
					<li>Desenvolvido por: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a href="http://www.jardimdigital.com.br" target="_blank"><img src="images/logo_jd.png" alt="Jardim Digital Logo" height="41" width="83"/></a>
				&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
            <a href="http://www.viladosite.com.br" target="_blank"><img src="images/logo_vila.png" alt="Vila do Site Logo" height="32" width="88"/></a>
          </li>
				</ul>
			</div>
		</footer>
		-->

		<footer class="mdl-mega-footer">


  			<div class="mdl-mega-footer--middle-section">
  				
  				<div class="mdl-mega-footer--top-section">
  				<div class="mdl-mega-footer--drop-down-section">
  					<input type="checkbox" class="mdl-mega-footer--heading-checkbox" checked>
  					<h1 class="mdl-mega-footer--heading">Realização:</h1>
  					<ul class="mdl-mega-footer--link-list">
  						<li><a href="http://github.com/viladosite/riowebdoc" target="_blank"> Fork us at 
						<img src="images/github512.png" alt="Github Logo" height="24" width="24"/> 
					</a></li>
  					</ul>
  				</div>

  				<div class="mdl-mega-footer--drop-down-section">
  					<input type="checkbox" class="mdl-mega-footer--heading-checkbox" checked>
  					<h1 class="mdl-mega-footer--heading">Parceria</h1>
  					<ul class="mdl-mega-footer--link-list">
  						<li><a href="http://www.jardimdigital.com.br" target="_blank"><img src="images/logo_jd.png" alt="Jardim Digital Logo" height="41" width="83"/></a></li>
  						
  					</ul>
  				</div>

  				<div class="mdl-mega-footer--drop-down-section">
  					<input type="checkbox" class="mdl-mega-footer--heading-checkbox" checked>
  					<h1 class="mdl-mega-footer--heading">Apoio</h1>
  					<ul class="mdl-mega-footer--link-list">
  						<li><a href="http://www.jardimdigital.com.br" target="_blank"><img src="images/logo_jd.png" alt="Jardim Digital Logo" height="41" width="83"/></a>
  						&nbsp;
  						 <a href="http://www.viladosite.com.br" target="_blank"><img src="images/logo_vila.png" alt="Vila do Site Logo" height="32" width="88"/></a>

  						</li>

  					</ul>

  				</div>

  				<div class="mdl-mega-footer--drop-down-section">
  					<input type="checkbox" class="mdl-mega-footer--heading-checkbox" checked>
  					<h1 class="mdl-mega-footer--heading">Produção</h1>
  					<ul class="mdl-mega-footer--link-list">
  						<li><a href="http://www.jardimdigital.com.br" target="_blank"><img src="images/logo_jd.png" alt="Jardim Digital Logo" height="41" width="83"/></a></li>
  					</ul>
  				</div>

  				<div class="mdl-mega-footer--drop-down-section">
  					<input type="checkbox" class="mdl-mega-footer--heading-checkbox" checked>
  					<h1 class="mdl-mega-footer--heading">Gestão das Naves do Conhecimento</h1>
  					<ul class="mdl-mega-footer--link-list">
  						<li><a href="http://www.jardimdigital.com.br" target="_blank"><img src="images/logo_jd.png" alt="Jardim Digital Logo" height="41" width="83"/></a>
  						&nbsp;
  						 <a href="http://www.viladosite.com.br" target="_blank"><img src="images/logo_vila.png" alt="Vila do Site Logo" height="32" width="88"/></a>

  						</li>

  					</ul>

  				</div>

  			</div>

  			</div>


  		</footer>	

    
    </main>

    

	  <div class="window" id="janela1">
	    <a href="#" class="fechar"> <img src="images/icon_close.png" width="35px" height="35px" /> </a>
	    <div id="janela2" name="janela2">
	      <div id="janela2" name="janela2">
		        <div id="menumodal">
		          <a href="includes/modalp2.php" class="steps"> <img src="images/icon_next.png" width="30px" height="30px" /> </a>
		        </div>
			    <h4>Passo 1</h4>
			    <p>Escreva sua mensagem.</p>
				</div>
	    </div>
	  </div>

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