<template>
    <nav class="nav-extended blue">
        <div class="nav-wrapper container">
          <router-link to="/" class="brand-logo left">Sol stockage</router-link>
        </div>
        <div class="nav-content container" style="margin-top: 20px" >
          <router-link to="/newproduit" class="btn-floating btn-large halfway-fab waves-effect  orange">
            <i class="fa fa-file" ></i>
          </router-link>
        </div>
      </nav>
</template>


<script>
    export default{
        name:'nav-bar'
    }
</script>