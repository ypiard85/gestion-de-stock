import Vue from 'vue'
import VueRouter from 'vue-router'
import Stockage from '@/components/Stockage'
import Produit from '@/components/Produit'
import Addfournisseur from '@/components/Addfournisseur'
import Newproduit from '@/components/New_produit'
import Commande from '@/components/Commande'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'stockage',
    component: Stockage
  },
  {
    path: '/newproduit',
    name: 'new-produit',
    component: Newproduit
  },
  {
    path: '/commande/:id',
    name: 'commande',
    component: Commande
  },
  {
    path: '/ajout-fournisseur',
    name: 'ajout-fournisseur',
    component: Addfournisseur
  },
  {
    path: '/:id',
    name: 'produit',
    component: Produit
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
