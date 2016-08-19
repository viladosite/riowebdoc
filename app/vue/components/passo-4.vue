<style lang="scss">
  
</style>

<template>
  <div class="mdl-grid">
    <div class="mdl-cell mdl-cell--12-col">   
      <h3>Seu webcard foi enviado!</h3>
      <p>Cheque seu email para ver o link do webcard.<br>
      Se quiser enviar para outras pessoas use
      o link que está em seu email.<br></p>
      <br><br>

    </div>
  </div> 
</template>

<script>
  var $$$ = require('jquery')
  var marked = require('marked')
  module.exports = {
    replace: true,
    props: ['webcard'],
    data: function(){
      return {

      }
    },
    methods: {

    },
    computed: {

    },
    attached: function () {
      componentHandler.upgradeDom()
      var self = this
      setTimeout(function() {
        self.$dispatch('fechar-janela')
      }, 5000)
    },
    components: {

    },
    filters: {
      
    }
  }
</script>