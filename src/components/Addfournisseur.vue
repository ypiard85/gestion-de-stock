<template>
    <div class="container">
        <h4>Atouter un nouveau fournisseur</h4>
        <form @submit.prevent="addFour" >
            <div class="col s2">
                <div class="row">
                    <div class="input-field col s2">                        
                        <input type="text" id="autocomplete-input" class="autocomplete" v-model="fournisseur" >
                        <label for="">Nom du fournisseur</label>
                    </div>
                </div>
            </div>
            <p> {{message}} </p>
            <button type="submit" class="btn">Ajouter</button>
        </form>
        <div v-if="loading" class="progress">
            <div class="indeterminate green"></div>
        </div>
    </div>
</template>


<script>
    import db from './firebaseConfig'
    export default{
        name: 'add-fournisseur',

        data(){
            return{
                fournisseur: null,
                message: null,
                loading: false
            }
        },

        methods:{
            addFour(){
                if(this.fournisseur != null){
                        this.loading = true
                    setTimeout(() => {
                            db.collection('fournisseur').add({
                        name: this.fournisseur
                    }).then(this.$router.push('/'))
                    }, 2000);                    
                }else{
                    this.message = 'Erreur [champ vide]'
                }
            }
        }
    }
</script>