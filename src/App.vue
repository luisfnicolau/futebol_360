<template>
  <v-app id="base">
    <!--<v-navigation-drawer-->
      <!--app-->
      <!--absolute-->
      <!--fixed-->
      <!--enable-resize-watcher-->
      <!--v-model="sideNav">-->
      <!--<v-layout row>-->
        <!--<v-flex xs12 class="mt-2 offset-xs2">-->
          <!--<img src="./assets/jovens-genios-logo-circulo.png"-->
                 <!--height="196px"-->
                 <!--v-on:click="navigateTo('/')"-->
                 <!--style="cursor: pointer"/>-->
        <!--</v-flex>-->
      <!--</v-layout>-->
      <!--<v-divider></v-divider>-->
      <!--<v-layout class="mt-3 ml-3 mr-3 hidden-sm-and-up">-->
        <!--<v-flex xs12>-->
          <!--<v-select-->
            <!--v-bind:items="turmas"-->
            <!--v-model="turma"-->
            <!--label="Turma"-->
          <!--&gt;</v-select>-->
        <!--</v-flex>-->
      <!--</v-layout>-->
      <!--<v-list>-->
        <!--<v-list-tile v-for="item in menuItems"-->
        <!--:key="item.title"-->
        <!--:to="item.link">-->
          <!--<v-list-tile-action>-->
            <!--<v-icon>{{ item.icon }}</v-icon>-->
          <!--</v-list-tile-action>-->
          <!--<v-list-tile-content>{{ item.title }}</v-list-tile-content>-->
        <!--</v-list-tile>-->

        <!--<v-divider></v-divider>-->
        <!--<v-list-tile-->
          <!--to="/profile"-->
          <!--@click.native="navigateTo('/profile')">-->
          <!--<v-list-tile-action>-->
            <!--<v-icon>account_circle</v-icon>-->
          <!--</v-list-tile-action>-->
          <!--<v-list-tile-content>{{ this.$store.getters.user.nome }}</v-list-tile-content>-->
        <!--</v-list-tile>-->
        <!--<v-divider></v-divider>-->

        <!--<v-list-tile-->
          <!--to="/login"-->
          <!--@click.native="onLogout">-->
          <!--<v-list-tile-action>-->
            <!--<v-icon>exit_to_app</v-icon>-->
          <!--</v-list-tile-action>-->
          <!--<v-list-tile-content>Sair</v-list-tile-content>-->
        <!--</v-list-tile>-->
      <!--</v-list>-->
    <!--</v-navigation-drawer>-->
    <!--<v-toolbar fixed app v-if="this.$store.getters.showToolbar" dark class="primary">-->
      <!--<v-toolbar-side-icon @click.stop="sideNav = !sideNav"></v-toolbar-side-icon>-->
      <!--<v-toolbar-title>-->
        <!--<router-link to="/" tag="span" style="cursor: pointer">Jovens Gênios</router-link>-->
      <!--</v-toolbar-title>-->
      <!--<v-layout class="ml-3" row wrap v-if="loading">-->
        <!--<v-flex xs12>-->
          <!--<v-progress-circular id="progress" indeterminate color="accent"></v-progress-circular>-->
        <!--</v-flex>-->
      <!--</v-layout>-->
      <!--<v-spacer></v-spacer>-->
    <!--</v-toolbar>-->
    <v-content>
    <main>
      <router-view class="mt-0"></router-view>
    </main>
    </v-content>
    <v-footer color="primary" app>
      <span class="white--text">Futebol 360 &copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        sideNav: false,
        menuItems: [
          { icon: 'assignment', title: 'Tarefas da Turma', link: '/tasks' },
          { icon: 'assessment', title: 'Relatórios', link: '/reports' },
          { icon: 'mode_edit', title: 'Atividades', link: '/subjects' },
          { icon: 'date_range', title: 'Calendario', link: '/calendar' }
          // { icon: 'lightbulb_outline', title: 'Blog ou News', link: '/blog' }
        ]
      }
    },
    computed: {
    },
    methods: {
    }
  }
</script>
