<template>
  <v-container fluid style="min-height: 0;" grid-list-md>

    <v-card>
      <v-card-title class="headline">Editar informações</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-progress-circular indeterminate color="primary" v-if="loading"></v-progress-circular>

        <v-form v-if="!loading">
          <v-text-field
            label="Nome"
            v-model="nome"
            name="nome"
            required
          ></v-text-field>
          <v-text-field
            label="Email"
            v-model="email"
            name="email"
            hint="Para mudar o email, envie um email para: contato@jovensgenios.com"
            persistent-hint
            disabled
            required
          ></v-text-field>
          <!--<v-text-field-->
          <!--label="Idade"-->
          <!--v-model="idade"-->
          <!--name="idade"-->
          <!--required-->
          <!--&gt;</v-text-field>-->
          <!--<v-text-field-->
          <!--label="Formacao"-->
          <!--persistent-hint-->
          <!--v-model="formacao"-->
          <!--name="formacao"-->
          <!--required-->
          <!--&gt;</v-text-field>-->
          <v-text-field
            label="Senha"
            v-model="password"
            :append-icon="hidePassword ? 'visibility' : 'visibility_off'"
            :append-icon-cb="() => (hidePassword = !hidePassword)"
            type="password"
            :type="hidePassword ? 'password' : 'text'"
            name="senha"
            required
          ></v-text-field>
          <v-text-field
            label="Nova Senha"
            v-model="new_password"
            :append-icon="hidePassword ? 'visibility' : 'visibility_off'"
            :append-icon-cb="() => (hidePassword = !hidePassword)"
            type="password"
            :type="hidePassword ? 'password' : 'text'"
            name="nova_senha"
            required
            v-if="showChangePasswordFields"
          ></v-text-field>
          <v-text-field
            label="Confirmar senha"
            v-model="password_confirm"
            :append-icon="hidePassword ? 'visibility' : 'visibility_off'"
            :append-icon-cb="() => (hidePassword = !hidePassword)"
            type="password"
            :type="hidePassword ? 'password' : 'text'"
            name="confirmacao_da_senha"
            required
            v-if="showChangePasswordFields"
          ></v-text-field>

          <v-divider></v-divider>
          <v-layout row wrap>
            <v-flex sm6 xs12>
          <v-btn block large dark color="primary" @click="showChangePasswordFields = !showChangePasswordFields">
            {{ showChangePasswordFields ? 'Cancelar' : 'Alterar Senha'}}
          </v-btn>
            </v-flex>

            <v-flex sm6 xs12>
            <v-btn block large dark color="primary" @click="submit">
            Salvar
          </v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-card-text>
    </v-card>
    <v-alert color="success"
             icon="check_circle"
             value="true"
             transition="scale-transition"
             v-model="alertSuccess"
             dismissible v-if="alertSuccess">
      Informações alteradas com sucesso!
    </v-alert>

    <v-alert color="error"
             icon="check_circle"
             value="true"
             transition="scale-transition"
             v-model="alertError"
             dismissible v-if="alertError">
      {{ error }}
    </v-alert>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        nome: this.$store.getters.user.nome,
        email: this.$store.getters.user.email,
        // idade: this.$store.getters.user.idade,
        // formacao: this.$store.getters.user.formacao,
        password: null,
        new_password: null,
        password_confirm: null,
        hidePassword: true,
        alertSuccess: false,
        alertError: false,
        error: '',
        showChangePasswordFields: false
      }
    },
    computed: {
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {

      submit () {
        if (this.validateFields()) {
          this.updateUserOnServer()
        } else {
          this.alertError = true
        }
      },

      validateFields () {
        if (this.nome.length < 4) {
          this.error = 'Seu nome deve conter pelo menos 4 caracteres'
          return false
        }
        if (this.password.length < 4) {
          console.log('senha curta')
          this.error = 'A senha deve conter pelo menos 4 caracteres'
          return false
        }
        if (this.showChangePasswordFields) {
          if (this.new_password.length < 4) {
            this.error = 'A nova senha deve conter pelo menos 4 caracteres'
            return false
          }
          if (this.new_password !== this.password_confirm) {
            this.error = 'As senhas não são iguais'
            return false
          }
        }
        return true
      },

      updateUserOnServer () {
        const dadosDoUsuario = {
          nome: this.nome,
          email: this.email,
          // idade: this.idade,
          // formacao: this.formacao,
          password: this.password,
          new_password: this.new_password
        }

        this.$store.dispatch('updateUserOnServer', dadosDoUsuario)
          .then(response => {
            this.alertSuccess = true
          }, error => {
            this.error = error
            this.alertError = true
          })
      }
    }
  }
</script>
