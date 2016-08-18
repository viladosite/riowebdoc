<style lang="scss">
  
</style>

<template>
  <div class="mdl-grid">
    <div class="mdl-cell mdl-cell--12-col">   
      <h3>Passo 3</h3>
      <p>Escolha para quem quer enviar o cartão
      e coloque também seu email.<br>
      Se quiser enviar para outras pessoas use
      o link que irá receber.<br></p>
      <br><br>

      <!-- Floating Multiline Textfield -->
      <form action="#">
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input class="mdl-textfield__input" type="email" id="yourmail" v-model="seu_email">
          <label class="mdl-textfield__label" for="yourmail">Seu email:</label>
        </div>

        <br>

        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input class="mdl-textfield__input" type="email" id="friendmail" v-model="amigo_email">
          <label class="mdl-textfield__label" for="friendmail">Recipiente:</label>
        </div>

      </form>

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
        seu_email: this.webcard.email_criador,
        amigo_email: this.webcard.email_enviado
      }
    },
    watch: {
      seu_email: function(val, oldVal) {
        this.checkRegex(0)
      },
      amigo_email: function(val, oldVal) {
        this.checkRegex(1)
      }
    },
    methods: {
      checkRegex: function(e) {
        if (e===0) {
          t = this.seu_email
        } else if (e===1) {
          t = this.amigo_email
        }
        var busca = t.search(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i)
        if (busca > -1) {
          if (e===0) {
            this.webcard.email_criador = this.seu_email
          } else if (e===1) {
            this.webcard.email_enviado = this.amigo_email
          }
        } else {
          console.log('not ok')
        }
      }
    },
    computed: {

    },
    attached: function () {
      componentHandler.upgradeDom()
    },
    components: {

    },
    filters: {
      
    }
  }
</script>