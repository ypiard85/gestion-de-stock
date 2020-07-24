<template>
    <div class="container">
        <h4>Commandez</h4>
        <table class="striped responsive">
            <thead>
              <tr style="font-weight: 500; ">
                  <th>#ID</th>
                  <th>Nom</th>
                  <th>Fournisseur</th>
                  <th>Image</th>
                  <th>Matiere</th>
                  <th>Quantitée </th>
                  
              </tr>
            </thead>
            <tbody >
              <tr>
                <td style="font-weight: bold;" >{{id}}</td>
                <td>{{nom}}</td>
                <td>{{fournisseur}}</td>
                <td><img :src="image" /></td>
                <td>{{matiere}}</td>
                <td> {{quantite}}</td>               
            </tr>
            </tbody>
          </table>
          <h5>Combien de pièces avez vous besoin en stock ?</h5>
          <form action="" @submit.prevent="commandeNumber">
            <div class="col s2">
                <div class="row">
                    <div class="input-field col s2">                        
                        <input type="number" id="autocomplete-input" class="autocomplete" v-model="quantite" >
                        <label for="">Quantite voulus</label>
                    </div>
                </div>
            </div>
            <div v-if="loading" class="progress">
                <div class="indeterminate green"></div>
            </div>
            <button type="submit" class="btn">Commander</button>
          </form>
    </div>
</template>



<script>
    import db from './firebaseConfig'
    export default{
        name: 'commander',

        data(){
            return{
                id: null,
                nom: null,
                quantite: null,
                fournisseur: null,
                image: null,
                matiere: null,
                loading: false
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
                    })                    
            },

            commandeNumber(){
                if(confirm('Valider la commande ?'))
                this.loading = true
                setTimeout(() => {                    
                    db.collection('produit').where('id', '==', this.$route.params.id).get().then(queryUpdate =>{
                    queryUpdate.forEach(doc =>{
                        doc.ref.update({
                                id: this.id,
                                nom: this.nom,
                                fournisseur: this.fournisseur,
                                matiere: this.matiere,
                                image: this.image,
                                quantite: this.quantite
                        }).then(this.$router.push('/'))
                    })
                })
                }, 5000);
                
                    
            },
        }
            
        
    }

</script>

<style scoped>
    img{
        width: 100px;
    }
</style>