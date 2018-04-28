<template>
  <v-container fluid>
    <v-layout row>
      <v-flex class="mb-3">
        <v-subheader> ATIVIDADES</v-subheader>
      </v-flex>
      <v-flex xs5 sm2 mr-3>
        <v-btn dark
               color="primary"
               @click.native.stop="dialog = !dialog">
          Nova Tarefa
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex sm12>
        <v-card class="primary pl-3 pr-3 mb-3" v-for="activity in tasks"
                :key="activity.id">
          <v-card class="neutral">
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{ activity.title }}</h3>
                <div class="mb-2">{{ activity.description }}</div>
                <div>Criado: {{ activity.createDate | dateFilter }}</div>
                <div v-if=" activity.dueDate !== '' ">Prazo: {{ activity.dueDate | dateFilter }}</div>
              </div>
            </v-card-title>
          </v-card>
        </v-card>
      </v-flex>
    </v-layout>

    <v-dialog v-model="dialog">

      <v-card>
        <v-layout row>
          <v-flex xs10 offset-xs1 sm6 offset-sm1 mt-3>
            <h1 class="primary--text">Nova Atividade</h1>
          </v-flex>
        </v-layout>
        <form @submit.prevent="onCreateTask">
          <v-layout row>
            <v-flex xs12>
              <v-layout row>
                <v-flex xs10 offset-xs1 sm10 offset-sm1>
                  <v-text-field
                    name="titulo"
                    label="Título"
                    id="titulo"
                    v-model="title"
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout row>
                <v-flex xs10 offset-xs1 sm10 offset-sm1>
                  <v-text-field
                    name="descricao"
                    label="Descrição"
                    id="descricao"
                    multi-line
                    v-model="description"
                    required></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout>
                <v-flex xs10 offset-xs1 offset-sm1>
                  <h3 class="headline mb-3 grey--text">Data & Hora da entrega</h3>
                </v-flex>
              </v-layout>

              <v-layout>
                <v-flex xs10 offset-xs1 offset-sm1>
                  <v-layout row wrap>
                    <v-flex md12 lg4 class="mb-3">
                      <v-date-picker v-model="dueDate"></v-date-picker>
                      <p>data: {{dueDate}}</p>
                    </v-flex>
                    <v-flex md12 lg8>
                      <v-time-picker v-model="dueHour"
                                     format="24hr"></v-time-picker>
                      <p>hora: {{dueHour}}</p>

                    </v-flex>
                  </v-layout>

                </v-flex>
              </v-layout>

              <v-layout row>
                <v-flex xs10 offset-xs1 sm6 offset-sm3>
                  <v-text-field
                    name="imageUrl"
                    label="Url"
                    id="imageUrl"
                    v-model="imageUrl"
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs10 offset-xs1 sm6 offset-sm3>
                  <img height="150px" :src="imageUrl"/>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat
                   color="primary"
                   @click.native="dialog = false"
                   :disabled="!formIsValid"
                   type="submit">Criar
            </v-btn>
            <v-btn flat color="primary" @click.native="dialog = false">Cancelar</v-btn>
          </v-card-actions>
        </form>

      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        dialog: false,
        id: (new Date()).getMilliseconds(),
        title: '',
        createDate: '',
        dueDate: '',
        dueHour: '',
        description: '',
        imageUrl: ''
      }
    },
    computed: {
      formIsValid () {
        return this.description !== ''
      },
      tasks () {
        return this.$store.getters.tasks
      },
      subbmitableDateTime () {
        // const date = new Date(this.dueDate)
        // if (typeof this.dueHour === 'string') {
        //   const hour = this.dueHour.match(/^(\d+)/)[1]
        //   const minutes = this.dueHour.match(/:(\d+)/)[1]
        //   date.setHours(hour)
        //   date.setMinutes(minutes)
        // } else {
        //   date.setHours(this.dueHour.getHours())
        //   date.setMinutes(this.dueHour.getMinutes())
        // }
        // console.log(date)
        var date = ''
        if (this.dueDate !== '') {
          date = this.dueDate + '@' + this.dueHour
        }
        console.log(date)
        return date
      }
    },
    methods: {
      onCreateTask () {
        const activityData = {
          id: (new Date()).getMilliseconds(),
          title: this.title,
          createDate: this.createDate,
          dueDate: this.subbmitableDateTime,
          description: this.description,
          imageUrl: this.imageUrl
        }
        this.$store.dispatch('createTask', activityData)
      },
      saveDate () {

      }
    }
  }
</script>
