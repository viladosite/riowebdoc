<style lang="scss">
  
</style>

<template>
  <div class="mdl-grid">
    <div class="mdl-cell mdl-cell--12-col">   
      <h3>Passo 3</h3>
      <p>Escreva sua mensagem:</p>

      <!-- Floating Multiline Textfield -->
      <form action="#" class="rwd_p2">
        <div class="mdl-textfield mdl-js-textfield rwd_txtmsg">
          <textarea class="mdl-textfield__input  mdl-shadow--3dp" type="text" rows="10" id="rwd_msg" v-model="text" @keyup="sendToWebcard"></textarea>
          <label class="mdl-textfield__label" for="rwd_msg">digite aqui sua mensagem</label>
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
        text: this.webcard.menssagem
      }
    },
    methods: {
      sendToWebcard: function () {
        this.webcard.menssagem = this.text
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