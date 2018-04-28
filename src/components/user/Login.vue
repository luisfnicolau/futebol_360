<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm12>
        <v-card>
          <v-card-text>
            <v-container>
              <v-layout>
                <v-flex sm2 xs12>
                  <img src="../../assets/jovens-genios-logo-circulo.png"
                  height="60px"
                  class="ml-3"/>
                </v-flex>
              </v-layout>
              <form @submit.prevent="onSignIn">
                <v-layout row>
                  <v-flex xs12>
                    <v-card-title class="ml-0">
                      <span class="title">Entrar como <b>Professor</b></span>
                    </v-card-title>
                    <v-text-field
                      name="email"
                      label="Seu Email"
                      id="email"
                      v-model="email"
                      type="email"
                      required
                      class="ml-3">
                    </v-text-field>
                    <v-text-field
                      name="password"
                      label="Sua Senha"
                      id="password"
                      v-model="password"
                      type="password"
                      required
                      class="ml-3">
                    </v-text-field>
                    <p class="error--text ml-3">{{ errorMessage }}</p>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-btn v-if="!loading" class="primary ml-3" type="submit">Entrar</v-btn>
                    <v-btn v-if="loading" class="grey ml-3">Entrar</v-btn>
                    <div v-if="loading" class="right mt-2">
                      <v-progress-circular id="progress" indeterminate color="primary"></v-progress-circular>
                    </div>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        email: '',
        password: '',
        errorMessage: ''
      }
    },
    computed: {
      isEmailValid () {

      },
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      onSignIn () {
        this.$store.dispatch('signUserIn', {username: this.email, password: this.password, theNewProvider: 'professor-api'})
          .then(response => {
          }, error => {
            this.errorMessage = error
            console.error('Got nothing from server. Prompt user to check internet connection and try again')
          })
      }
    }
  }
</script>
