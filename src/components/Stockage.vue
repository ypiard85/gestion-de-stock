<template>
    <div class="container">
        <h4>Produits en stock</h4>
        <table class="striped responsive">
            <thead>
              <tr style="font-weight: 500; ">
                  <th>#ID</th>
                  <th>Nom</th>
                  <th>Fournisseur</th>
                  <th>Image</th>
                  <th>Matiere</th>
                  <th>Quantitée </th>
                  <th>Modifier</th>
              </tr>
            </thead>
            <tbody >
              <tr v-for="produit in produits" :key="produit.id" >
                <td style="font-weight: bold;" >{{produit.id}}</td>
                <td>{{produit.nom}}</td>
                <td>{{produit.fournisseur}}</td>
                <td><img :src="produit.image" /></td>
                <td>{{produit.matiere}}</td>
                <td v-if="produit.quantite > 0" > {{produit.quantite}} <i v-if="produit.quantite < 10" class="fa fa-exclamation-circle"><button class="btn gray" style="margin-left: 20px;"><router-link :to="{ name: 'commande', params: {id: produit.id} } ">Commander</router-link></button></i> </td>
                <td v-else><router-link :to="{ name: 'commande', params: {id: produit.id} } "><button class="btn red">Rupture de stock</button></router-link> </td>
                <td><router-link :to="{ name: 'produit', params: {id: produit.id} } "> <i class="fa fa-eye"></i> </router-link> </td>
            </tr>
            </tbody>
          </table>
    </div>
</template>



<script>

import db from './firebaseConfig'

    export default{
        name: 'liste-client',

        data(){
            return{
                produits: []
            }

        },

        created(){
            db.collection('produit').orderBy('quantite').get().then(
                querySnapshot => {
                    querySnapshot.forEach(doc => {
                        const data = {
                            'id': doc.data().id,
                            'nom': doc.data().nom,
                            'fournisseur': doc.data().fournisseur,
                            'matiere': doc.data().matiere,
                            'quantite': doc.data().quantite,
                            'image': doc.data().image
                        }
                        this.produits.push(data)

                    })
                }
            )
        }
    }


</script>

<style lang="scss" scoped >
    img{
        width: 100px;
        height: 50px;
    }
</style>