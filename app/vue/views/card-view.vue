<style lang="scss">
  
</style>

<template>
  <div class=" mdl-layout mdl-js-layout mdl-layout--fixed-header">

    <!-- Inclui o header -->
    <?php include "includes/rwd_header.php"; ?>

    <!-- Inclui o drawer com o menu principal -->
    <?php include "includes/rwd_drawer.php"; ?>
   
    <main class="mdl-layout__content">
    
     <div id="content"> <?php include "includes/rwd_content.php"; ?> </div>
    
    </main>

   <!-- Inclui o footer -->
        <?php include "includes/rwd_footer.php"; ?> 
  </div>
</template>

<script>
  var $$$ = require('jquery')
  var marked = require('marked')
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

    },
    components: {
      
    },
    filters: {
      
    }
  }
</script>