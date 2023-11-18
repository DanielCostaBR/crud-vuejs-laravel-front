<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" class="md-and-up-hide" />

        <q-toolbar-title>
          App
        </q-toolbar-title>

        <div class="xs-hide sm-hide">
          <q-btn flat dense no-caps label="Home" @click="goToSection('heroSection')" class="q-mx-sm" />
          <q-btn flat dense no-caps label="Features" @click="goToSection('features')" class="q-mx-sm" />
          <q-btn flat dense no-caps label="About" @click="goToSection('about')" class="q-mx-sm" />
          <q-btn dense label="Login" to="/login" v-if="!isAuthenticated" flat class="q-px-sm q-ml-md" />
          <q-btn flat dense label="Dashboard" v-if="isAuthenticated" to="/admin" />
          <q-btn flat dense label="Logout" v-if="isAuthenticated" @click="logout" />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered>
      <q-list>
        <q-item-label header>
          Menus
        </q-item-label>
        <q-item clickable>
          <q-item-section>
            <q-item-label>Home</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable @click="navigate('features')">
          <q-item-section>
            <q-item-label>Features</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable @click="navigate('about')">
          <q-item-section>
            <q-item-label>About</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable v-if="!isAuthenticated" to="/login">
          <q-item-section>
            <q-item-label>Login</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable v-if="isAuthenticated" to="/admin">
          <q-item-section>
            <q-item-label>About</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable v-if="isAuthenticated" @submit="logout">
          <q-item-section>
            <q-item-label>About</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
      <q-toolbar class="flex flex-center text-white" style="border-top: 2px solid #0cbcbc; background-color: #263238">
        <div class="q-pa-md q-gutter-sm">
          <q-btn round type="a" href="" class="bg-primary text-white" icon="fab fa-instagram" target="_blank" />
          <q-btn round type="a" href="" class="bg-primary text-white" icon="fab fa-github" target="_blank" />
          <q-btn round type="a" href="#" class="bg-primary text-white" icon="fab fa-twitter" />
          <q-btn round type="a" href="#" class="bg-primary text-white" icon="email" />
          <q-btn round type="a" href="#" class="bg-primary text-white" icon="fas fa-heart" />
        </div>
      </q-toolbar>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { Notify } from 'quasar'
import { computed, ref } from 'vue'
import { goToSection } from "src/support/helpers/scroll";
import { useAuthStore } from "stores/all";

const $store = useAuthStore()

const leftDrawerOpen = ref(false)

const isAuthenticated = computed(() => $store.isAuthenticated)

const navigate = (section) => {
  leftDrawerOpen.value = false
  setTimeout(() => {
    goToSection(section)
  }, 250)
}
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
    notify('Usúario deslogado');
  } catch (error) {
    $commonStore.REMOVE_REQUEST()
    handleErros(error)
  }
}
</script>
