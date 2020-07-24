<template>
    <div class="container">
        
    <ul class="collection">
        <li class="collection-item">Nom materiaux :  {{nom}} </li>
        <li class="collection-item">Fournisseur : {{fournisseur}}</li>
        <li class="collection-item">Matiere :  {{matiere}}</li>
        <li class="collection-item"><img :src="image" /></li>
      </ul>
      <h4>Stock</h4>
      <h5> {{quantite}} </h5>
        <router-link :to="{ name: 'commande', params: {id: id} } ">
          <button class="btn green">Commander</button>
        </router-link>
      <h4>Modifier le produit</h4>
      <form @submit.prevent="updateProduit">
        <div class="row">
            <div class="col s7">
                <div class="row">
                    <div class="input-field col s7">                        
                        <input type="text" id="autocomplete-input" class="autocomplete" :value="id" disabled >
                        <label for="" style="margin-top: -30px;">#ID</label>
                    </div>
                </div>
            </div>
            <div class="col s7">
                <div class="row">
                    <div class="input-field col s7">                        
                        <input type="text" id="autocomplete-input" class="autocomplete" v-model="nom" >
                    </div>
                </div>
            </div>
            <div class="col s7">
                <div class="row">
                    <div class="input-field col s7">
                        <input type="text" id="autocomplete-input" class="autocomplete" v-model="fournisseur" >
                      </div>
                </div>
            </div>
            <div class="col s7">
                <div class="row">
                    <div class="input-field col s7">                        
                        <input type="text" id="autocomplete-input" class="autocomplete" v-model="matiere">
                    </div>
                </div>
            </div>
            <div class="col s7">
                <div class="row">
                    <div class="input-field col s7">                        
                        <input type="text" id="autocomplete-input" class="autocomplete" v-model="image" >
                    </div>
                </div>
            </div>
            <div class="col s7">
                <div class="row">
                    <div class="input-field col s7">                        
                        <input type="text" id="autocomplete-input" class="autocomplete" value="0" disabled v-model="quantite" >
                        <label for="" style="margin-top: -30px;">Quantite</label>
                    </div>
                </div>
            </div>
        </div>
        <button class="btn black">Modifier</button>
      </form>
    </div>
</template>



<script>
    import db from './firebaseConfig'
    export default{
        name: 'produit',

        data(){
            return{
                fournisseurs: [],
                id: null,
                nom: null,
                quantite: null,
                fournisseur: null,
                image: null,
                matiere: null,
            }
        },

        beforeRouteEnter(to, from, next){
            db.collection('produit').where('id', '==', to.params.id).get().then(
                querySnapshot => {
                    querySnapshot.forEach(doc => {
                        next(v =>{
                            v.id = doc.data().id
                            v.nom = doc.data().nom
                            v.quantite = doc.data().quantite
                            v.fournisseur = doc.data().fournisseur
                            v.image = doc.data().image
                            v.matiere = doc.data().matiere
                        })
                    })
                }
            )
        },

        watch:{
            '$route': 'fetchData'
        },

        methods:{
            fetchData(){
                db.collection('produit').where('id', '==', this.$route.params.id).get().then(querySnapshot => {
                        querySnapshot.forEach(doc =>{
                            this.id = doc.data().id
                            this.nom = doc.data().nom
                            this.quantite = doc.data().quantite
                            this.fourniseur = doc.data().fournisseur
                            this.image = doc.data().image
                            this.matiere = doc.data().matiere
                        })
                    },
                )                    
                
            },

            updateProduit(){
                db.collection('produit').where('id', '==', this.$route.params.id).get().then(
                    querySnapshot =>{
                        querySnapshot.forEach(doc =>{
                            doc.ref.update({
                                id: this.id,
                                nom: this.nom,
                                fournisseur: this.fournisseur,
                                matiere: this.matiere,
                                image: this.image,
                                quantite: this.quantite
                            }).then(this.$router.push('/'))
                        })
                    }
                )
            }
        }
    }
</script>

<style scoped>

    img{
        width: 300px;
    }
</style>