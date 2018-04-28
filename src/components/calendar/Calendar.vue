<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs6 v-for="i in 2" :key="i">
        <v-date-picker v-if="i===1" v-model="calendar" landscape></v-date-picker>
        <v-container fluid grid-list-xs class="hidden-sm-and-down">
          <v-layout row wrap>
            <v-flex
              v-if="i===2"
              xs4
              class="ma-2"
              v-for="event in events"
              :key="event.id"
            >
              <v-card flat tile v-if="calendar === event.data.split(' ')[0]">
                <v-card-title>
                  <h1 class="ml-2">{{ getDay }}</h1>
                  <h4 class="ml-2"> {{event.titulo }}</h4>
                </v-card-title>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>

      <v-container fluid grid-list-xs class="hidden-md-and-up">
        <v-layout row wrap>
          <v-flex
            xs4
            class="ma-2"
            v-for="event in events"
            :key="event.id"
          >
            <v-card flat tile v-if="calendar === event.data.split(' ')[0]">
              <v-card-title>
                <h1 class="ml-2">{{ getDay }}</h1>
                <h4 class="ml-2"> {{event.titulo }}</h4>
              </v-card-title>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>


    </v-layout>
    <v-subheader class="mb-3">
      CALENDÁRIO
      <v-spacer></v-spacer>
      <v-btn dark
             color="primary"
             @click.native.stop="dialog = !dialog">
        Novo Evento
      </v-btn>
    </v-subheader>
    <v-layout row wrap>
      <v-flex sm12>
        <v-card-text v-if="events.length <= 0">
          Nenhum evento agendado
        </v-card-text>
        <v-card class="primary pl-3 pr-3 mb-3" v-for="event in events"
                :key="event.id">
          <v-card class="neutral">
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{ event.titulo }}</h3>
                <div class="mb-2">{{ event.descricao }}</div>
                <div>Quando: {{ event.data | dateFilter}}</div>
                <div>Local: {{ event.local }}</div>
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
            <h1 class="primary--text">Novo Evento</h1>
          </v-flex>
        </v-layout>
        <form @submit.prevent="onCreateEvent">
          <v-layout row>
            <v-flex xs12>
              <v-layout row>
                <v-flex xs10 offset-xs1 sm10 offset-sm1>
                  <v-text-field
                    name="titulo"
                    label="Título"
                    id="titulo"
                    v-model="titulo"
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
                    v-model="descricao"
                    required></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout row>
                <v-flex xs10 offset-xs1 sm10 offset-sm1>
                  <v-text-field
                    name="local"
                    label="Local "
                    id="local"
                    v-model="local"
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout row>
                <v-flex xs10 offset-xs1 sm10 offset-sm1>
                  <v-checkbox
                    name="turma"
                    label="Enviar para Turma ? "
                    id="turma"
                    v-model="classChoosed"
                  ></v-checkbox>
                </v-flex>
              </v-layout>

              <v-layout row>
                <v-flex xs10 offset-xs1 sm10 offset-sm1>
                  <v-subheader class="title">Alunos:</v-subheader>
                </v-flex>
              </v-layout>

              <v-layout row>
                <v-flex xs10 offset-xs1 sm10 offset-sm1 mb-5>
              <v-container fluid
                           v-bind="{ [`grid-list-sm`]: true }">
                <v-layout row wrap>
                  <v-flex
                    xs12
                    sm4
                    v-for="(student, index) in students"
                    :key="student.id"
                  >
                    <v-card style="cursor: pointer"
                            avatar
                            v-if="!classChoosed"
                            v-bind:ripple="{ class: 'primary--text' }">
                      <v-card-actions
                        @click="toggle(index)"
                        :key="student.id">
                        <v-card-text ripple>
                          {{ student.nome }}
                        </v-card-text>
                        <v-icon
                          color="grey lighten-1"
                          v-if="selected.indexOf(index) < 0"
                        ></v-icon>
                        <v-icon
                          color="primary darken-2"
                          v-else
                        >check
                        </v-icon>
                      </v-card-actions>
                    </v-card>
                    <v-card avatar
                            v-else
                            class="grey">
                      <v-card-actions>
                        <v-card-text class="white--text">
                          {{ student.nome }}
                        </v-card-text>
                        <v-icon
                          color="grey lighten-1"
                          v-if="selected.indexOf(index) < 0"
                        ></v-icon>
                        <v-icon
                          color="primary darken-2"
                          v-else
                        >check
                        </v-icon>
                      </v-card-actions>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
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

              <!--<v-layout row>-->
              <!--<v-flex xs10 offset-xs1 sm6 offset-sm3>-->
              <!--<v-text-field-->
              <!--name="imageUrl"-->
              <!--label="Url"-->
              <!--id="imageUrl"-->
              <!--v-model="imageUrl"-->
              <!--&gt;</v-text-field>-->
              <!--</v-flex>-->
              <!--</v-layout>-->

              <!--<v-layout row>-->
              <!--<v-flex xs10 offset-xs1 sm6 offset-sm3>-->
              <!--<img height="150px" :src="imageUrl"/>-->
              <!--</v-flex>-->
              <!--</v-layout>-->
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
    name: 'calendar',
    data () {
      return {
        calendar: '',
        dialog: false,
        titulo: '',
        dueDate: '',
        dueHour: '',
        local: '',
        descricao: '',
        classChoosed: false,
        selected: []
      }
    },
    computed: {
      events () {
        return this.$store.getters.events
      },
      students () {
        return this.$store.getters.students
      },
      getDay () {
        return this.calendar.substr(8, 2) + '/' + this.calendar.substr(5, 2)
      },
      formIsValid () {
        return this.descricao !== ''
      },
      subbmitableDateTime () {
        var date = ''
        if (this.dueDate !== '') {
          date = this.dueDate + ' ' + this.dueHour + ':00'
        }
        console.log(date)
        return date
      }
    },
    methods: {
      onCreateEvent () {
        var estudantes = []
        for (var i = 0; i < this.selected.length; i++) {
          estudantes[i] = this.students[this.selected[i]].id
        }
        console.log(estudantes)
        const eventData = {
          // id: (new Date()).getMilliseconds(),
          titulo: this.titulo,
          // createDate: this.createDate,
          data: this.subbmitableDateTime,
          descricao: this.descricao,
          local: this.local,
          // alunos: ['1', '2'],
          turma: '',
          estudantes: []
        }
        if (this.classChoosed) {
          eventData.turma = this.$store.getters.selectedClass.id
        }
        if (estudantes.length > 0) {
          eventData.estudantes = estudantes
        }
        this.$store.dispatch('createEvent', eventData)
      },
      toggle (index) {
        if (index === -1) {
          this.allSelected = !this.allSelected
          return
        }
        const i = this.selected.indexOf(index)
        if (i > -1) {
          this.selected.splice(i, 1)
        } else {
          this.selected.push(index)
        }
      }
    },
    beforeMount () {
      this.$store.dispatch('getEventsFromServer')
    }
  }
</script>

<style scoped>

</style>
