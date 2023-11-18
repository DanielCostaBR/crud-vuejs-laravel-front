<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <router-link to="/" style="text-decoration: none; cursor: pointer" class="text-white">
            App
          </router-link>
        </q-toolbar-title>

        <div>
          <q-btn flat dense label="Login" to="/login" v-if="!isAuthenticated" />
          <q-btn flat dense label="Logout" v-if="isAuthenticated" @click="logout" id="logout-button" />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered show-if-above>
      <q-list>
        <q-item-label header>
          Menus
        </q-item-label>

        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { Notify } from 'quasar'
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { useAuthStore } from "stores/all";
import { useRouter } from "vue-router";
const $store = useAuthStore()
const $router = useRouter()

const essentialLinks = [
  {
    title: 'Home',
    icon: 'home',
  }
]

const isAuthenticated = $store.isAuthenticated
const leftDrawerOpen = ref(false)
const notify = (message) => {
  Notify.create({
    message: message,
    color: 'warning',
    textColor: 'white'
  })
}

const toggleLeftDrawer = () => leftDrawerOpen.value = !leftDrawerOpen.value
const logout = async () => {
  try {
    $store.SIGN_OUT()
    $router.push('/')
    notify('Usúario deslogado');
  } catch (error) {
    handleErros(error)
  }
}
</script>
