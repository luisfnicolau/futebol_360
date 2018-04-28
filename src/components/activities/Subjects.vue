<template>
  <v-layout row wrap>
    <v-flex xs12>
      <!--<v-card flat>-->
        <!--<v-card-actions>-->
          <!--<v-spacer></v-spacer>-->
          <!--<v-btn flat-->
                 <!--dark-->
                 <!--color="primary"-->
                 <!--@click.native.stop="dialog = !dialog">Criar Atividade-->
            <!--<v-icon right light>add_box</v-icon>-->
          <!--</v-btn>-->
        <!--</v-card-actions>-->
      <!--</v-card>-->
      <v-container fluid v-bind="{ [`grid-list-sm`]: true }">
        <v-layout row wrap>
          <v-flex
            md4
            sm6
            xs12
            class="pa-2"
            v-for="subject in subjects"
            :key="subject.nome">
            <v-card>
              <img src="../../assets/matematica.png"/>
              <v-card-title>{{ subject.nome }}</v-card-title>
              <v-subheader class="mt-3 mb-3">{{ subject.texto }}</v-subheader>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat color="primary"
                       @click.native="selectSubject(subject.id)">Escolher
                  <v-icon right light>arrow_forward</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>

    <v-divider></v-divider>

    <v-container fluid>
      <!--<v-layout row>-->
        <!--<v-flex class="mb-3">-->
          <!--<v-subheader> MINHAS ATIVIDADES </v-subheader>-->
        <!--</v-flex>-->
      <!--</v-layout>-->
      <v-layout row wrap>
        <v-flex sm12>
          <v-card class="primary pl-3 pr-3 mb-3" v-for="activity in activities"
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
    </v-container>
    <!-- Dialog BEGIN -->

    <v-dialog v-model="dialog">

      <v-card>
        <v-layout row>
          <v-flex xs10 offset-xs1 sm6 offset-sm1 mt-3>
            <h1 class="primary--text">Nova Atividade</h1>
          </v-flex>
        </v-layout>
        <form @submit.prevent="onCreateActivity">
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
                      <p>Data: {{dueDate}}</p>
                    </v-flex>
                    <v-flex md12 lg8>
                      <v-time-picker v-model="dueHour"
                                     format="24hr"></v-time-picker>
                      <p>Hora: {{dueHour}}</p>

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
              <v-layout row>
                <v-flex xs10 offset-xs1 sm6 offset-sm3>
                  <img height="150px" :src="imageUrl"/>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card class="ml-1 mr-1"
                      style="cursor: pointer"
                      avatar
                      v-bind:ripple="{ class: 'primary--text' }">
                <v-card-actions
                  @click="toggle(-1)">
                  <v-card-text ripple>
                    Todos
                  </v-card-text>
                  <v-icon
                    color="grey lighten-1"
                    v-if="!allSelected"
                  ></v-icon>
                  <v-icon
                    color="primary darken-2"
                    v-else
                  >check</v-icon>
                </v-card-actions>
              </v-card>

              <v-container fluid v-bind="{ [`grid-list-sm`]: true }">
                <v-layout row wrap>
                  <v-flex
                    xs12
                    sm4
                    v-for="(student, index) in students"
                    :key="student.id"
                  >
                    <v-card style="cursor: pointer"
                            avatar
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
                        >check</v-icon>
                      </v-card-actions>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>

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

    <!-- Dialog END -->


  </v-layout>
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
        imageUrl: '',
        selected: [],
        allSelected: false
      }
    },
    computed: {
      subjects () {
        return this.$store.getters.subjects
      },
      students () {
        return this.$store.getters.students
      },
      activities () {
        return this.$store.getters.activities
      },
      formIsValid () {
        return this.description !== ''
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
      selectSubject (id) {
        this.$store.dispatch('setSelectedSubject', id)
        this.$store.dispatch('getTopicsFromServer')
      },
      onCreateActivity () {
        const activityData = {
          id: (new Date()).getMilliseconds(),
          title: this.title,
          createDate: this.createDate,
          dueDate: this.subbmitableDateTime,
          description: this.description,
          imageUrl: this.imageUrl
        }
        this.$store.dispatch('createActivity', activityData)
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
      this.$store.dispatch('getSubjectsFromServer')
    }
  }
</script>
