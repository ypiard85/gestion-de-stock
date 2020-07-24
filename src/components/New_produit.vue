<template>
    <div class="container">
        <h4>Ajouter un nouveau produit</h4>
        <form @submit.prevent="newProduit" >
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
                        <label for="">Nom</label>
                    </div>
                </div>
            </div>
            <div class="col s7">
                <div class="row">
                    <div class="input-field col s7">
                        <select style="background-color: black; color: black;" class="browser-default white" selected v-model="fournisseur" >
                          <option value="" >--CHOISISEZ UN FOURNISSEUR--</option>
                          <option v-for="fournisseur in fournisseurs" :key="fournisseur.id" :value="fournisseur.name"> {{fournisseur.name}} </option>                         
                        </select>
                        <label style="margin-top: -40px;">Fournisseur</label>
                        <div class="nav-content container" >
                            <router-link to="/ajout-fournisseur" class="btn-floating btn-small halfway-fab waves-effect green">
                              <i class="fa fa-plus" ></i>
                            </router-link>
                          </div>
                      </div>
                </div>
            </div>
            <div class="col s7">
                <div class="row">
                    <div class="input-field col s7">                        
                        <input type="text" id="autocomplete-input" class="autocomplete" v-model="matiere">
                        <label for="">Matiere</label>
                    </div>
                </div>
            </div>
            <div class="col s7">
                <div class="row">
                    <div class="input-field col s7">                        
                        <input type="text" id="autocomplete-input" class="autocomplete" v-model="image" >
                        <label for="">Image LINK</label>
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
        <p>{{message }}</p>
        <button type="submit" class="btn">Ajouter</button>
    </form>
        </div>
</template>

<script>
    import db from './firebaseConfig'

    export default{
        data(){
            return{
                fournisseurs: [],
                id: null,
                nom: null,
                fournisseur: null,
                matiere: null,
                quantite: 0,
                image: null,
                message: null
            }
        },
        created(){
            db.collection('fournisseur').get().then(
            querySnapshot => {
                querySnapshot.forEach(doc => {
                    const data = {
                        'id': doc.id,
                        'name': doc.data().name,
                    }
                    this.fournisseurs.push(data)
                        })
                    }
                ),
                
                this.id = Math.floor(Math.random() * (10000 - 1000) + 1000  )
            },

            methods:{
                newProduit(){
                    if(this.id != null && this.nom != null && this.fournisseur != null && this.image != null ){
                        db.collection('produit').add({                    
                    id: this.id,
                    nom: this.nom,
                    fournisseur: this.fournisseur,
                    quantite: this.quantite,
                    image: this.image,
                    matiere: this.matiere
                }).then(this.$router.push('/'))
                }else{
                    this.message = 'Veuillez renseigner tous les champs'
                }
            },
            
        }

    }
</script>

<style scoped>
    form{
        margin-top: 5rem;
    }
</style>