<style lang="scss">
  .pscroll {
    width: 100%;
    position: relative;
    height: 89%;
    overflow: hidden;
  }
</style>

<template>
  <div style="height: 100%;">
    <div style="height: 100%;" class="rwd_janela_conteudo">
      <div style="height: 100%;">
        <h3>O Projeto</h3>
        <div class="pscroll">
          <p>Bem-vindo!</p>

          <p>O mosaico de postais audiovisuais do Rio que apresentamos aqui é criação coletiva do
            grupo de alunos do curso Meu Rio Vale Um Webdoc.</p> 

          <p>Você está navegando pelo primeiro “webdoc”, ou “webdocumentário” realizado pelas Naves do Conhecimento, uma iniciativa da Secretaria de Ciência e Tecnologia do município do Rio de Janeiro junto com a Cria Produções e com o apoio dos parceiros UniRio e Bug404.</p>

          <p>O projeto Meu Rio Vale Um Webdoc é uma experiência inovadora no cruzamento entre o audiovisual, a fotografia e as narrativas interativas que o ambiente digital nos permite explorar.</p> 

          <p>Embarcados nas oito Naves do Conhecimento que conduzem a iniciativa, aplicamos diferentes técnicas criativas para interagir com espaços tão concretos quanto ruas e praças, gerando postais com perspectivas absolutamente originais de um Rio de Janeiro que é nosso e de cada um.</p>

          <p>Reunimos os fragmentos de exercícios, produções individuais e coletivas, numa plataforma onde cada Nave do Conhecimento é uma estação, um elo nessa teia multimídia. Convidamos você a navegar por nossos postais digitais, e a interagir com eles, criando e enviando suas versões de webdoc cards!</p>

          <p><b>Vamos nessa?<b></p> 

          <h3>O que é um webdoc?</h3>

          <p>Conhecido também como webdocumentário ou documentário interativo, é um gênero de audiovisual que permite ao espectador navegar por diferentes conteúdos e interagir com eles criando seu próprio percurso. A partir de uma plataforma web, é possível explorar as possibilidades oferecidas e “filtrar” trechos do documentário, ou decidir em que ordem assistir, ou ainda determinar qual o nível de aprofundamento que você quer ter com o conteúdo. Uma combinação das perspectivas criadas pelos autores e das escolhas do espectador faz com que o ato de assistir ao webdoc não seja passivo, mas sim uma experiência singular e dinâmica.</p> 

          <p>Na cena internacional existem alguns festivais se dedicando ao tema, como o I-docs Symposium, na Inglaterra, e o Docs Barcelona. Produções cada vez mais elaboradas colocam os webdocs em destaque no cenário das mídias do terceiro milênio.</p>

          <h3>O curso Meu Rio Vale um Webdoc</h3>

          <p>O curso acontece nas Naves e Praças do Conhecimento, espaços criados pela Secretaria Municipal de Ciência e Tecnologia do Rio de Janeiro, a partir de 21 de julho. As oficinas são compostas de 10 aulas, totalizando 30 horas-aula. As seis Naves e duas Praças do Conhecimento estão localizadas em Vila Aliança, Irajá, Madureira, Complexo do Alemão (Nova Brasília), Triagem, Padre Miguel, Penha e Santa Cruz.</p>

          <p>As aulas abordam desde a história da imagem fotográfica até técnicas contemporâneas como a fotografia 360 graus; as animações digitais no estilo time lapse e outras. São usadas câmeras de celular e também equipamentos profissionais. O objetivo é oferecer a oportunidade de aprendizado e experimentação criativa para jovens a partir de 16 anos e adultos iniciados em técnicas fotográficas, audiovisuais e/ou em outras linguagens visuais.</p>
        </div>
        

      </div>
    </div>
    <div class="rwd_janela_img">
      <img src="../img/icon_projeto.png" class="rwd_janela_icon">
    </div>
  </div>
</template>

<script>
  var $$$ = require('jquery')
  var marked = require('marked')
  var perfectScrollbar = require('perfect-scrollbar/jquery')($$$)

  module.exports = {
    replace: true,
    props: [],
    data: function(){
      return {
        
      }
    },
    methods: {

    },
    computed: {

    },
    attached: function () {
      $$$('.pscroll').perfectScrollbar({
        suppressScrollX: true
      });

      componentHandler.upgradeDom()
    },
    components: {

    },
    filters: {
      
    }
  }
</script>