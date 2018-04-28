<template>
  <v-container fluid>
    <v-layout row>
      <v-flex class="mb-3">
        <v-subheader> TAREFAS DA TURMA </v-subheader>
      </v-flex>
      <v-flex xs5 sm2 mr-3>
        <v-btn flat
        dark
        color="primary"
        @click.native.stop="dialog = !dialog">Nova Tarefa
        <v-icon right light>add_box</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex sm12>
        <v-card-text v-if="tasks.length <= 0">
          Nenhuma tarefa para esta turma
        </v-card-text>
        <v-card class="primary pl-3 pr-3 mb-3" v-for="task in tasks"
                :key="task.id">
          <v-card class="neutral">
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{ task.titulo }}</h3>
                <div class="mb-2">{{ task.descricao }}</div>
                <!--<div>Criado: {{ task.created_at | dateFilter }}</div>-->
                <div v-if=" task.due_date !== '' ">Prazo: {{ task.due_date | dateFilter }}</div>
              </div>
            </v-card-title>
          </v-card>
        </v-card>
      </v-flex>
    </v-layout>

    <v-divider></v-divider>

    <v-layout row>
      <v-flex class="mb-3">
        <v-subheader> TAREFAS DE ALUNOS </v-subheader>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex sm12>
        <v-card-text v-if="tasksForStudents.length <= 0">
          Nenhuma tarefa para alunos desta turma
        </v-card-text>
        <v-card class="primary pl-3 pr-3 mb-3" v-for="task in tasksForStudents"
                :key="task.id">
          <v-card class="neutral">
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{ task.titulo }}</h3>
                <div class="mb-2">{{ task.descricao }}</div>
                <!--<div>Criado: {{ task.created_at | dateFilter }}</div>-->
                <div class="mb-2">Aluno: {{ getStudentById(task.pivot.estudantes_id).nome }}</div>
                <div v-if=" task.due_date !== '' ">Prazo: {{ task.due_date | dateFilter }}</div>
              </div>
            </v-card-title>
          </v-card>
        </v-card>
      </v-flex>
    </v-layout>



    <!--<v-dialog v-model="dialog">-->

      <!--<v-card>-->
        <!--<v-layout row>-->
          <!--<v-flex xs10 offset-xs1 sm6 offset-sm1 mt-3>-->
            <!--<h1 class="primary&#45;&#45;text">Nova Atividade</h1>-->
          <!--</v-flex>-->
        <!--</v-layout>-->
        <!--<form @submit.prevent="onCreateTask">-->
          <!--<v-layout row>-->
            <!--<v-flex xs12>-->
              <!--<v-layout row>-->
                <!--<v-flex xs10 offset-xs1 sm10 offset-sm1>-->
                  <!--<v-text-field-->
                    <!--name="titulo"-->
                    <!--label="Título"-->
                    <!--id="titulo"-->
                    <!--v-model="titulo"-->
                  <!--&gt;</v-text-field>-->
                <!--</v-flex>-->
              <!--</v-layout>-->

              <!--<v-layout row>-->
                <!--<v-flex xs10 offset-xs1 sm10 offset-sm1>-->
                  <!--<v-text-field-->
                    <!--name="descricao"-->
                    <!--label="Descrição"-->
                    <!--id="descricao"-->
                    <!--multi-line-->
                    <!--v-model="descricao"-->
                    <!--required></v-text-field>-->
                <!--</v-flex>-->
              <!--</v-layout>-->

              <!--<v-layout>-->
                <!--<v-flex xs10 offset-xs1 offset-sm1>-->
                  <!--<h3 class="headline mb-3 grey&#45;&#45;text">Data & Hora da entrega</h3>-->
                <!--</v-flex>-->
              <!--</v-layout>-->

              <!--<v-layout>-->
                <!--<v-flex xs10 offset-xs1 offset-sm1>-->
                  <!--<v-layout row wrap>-->
                    <!--<v-flex md12 lg4 class="mb-3">-->
                      <!--<v-date-picker v-model="dueDate"></v-date-picker>-->
                      <!--<p>Data: {{dueDate | dateFilter}}</p>-->
                      <!--&lt;!&ndash;<v-layout row>&ndash;&gt;-->
                        <!--&lt;!&ndash;<v-flex xs10 sm10>&ndash;&gt;-->
                          <!--&lt;!&ndash;<v-text-field&ndash;&gt;-->
                            <!--&lt;!&ndash;name="data"&ndash;&gt;-->
                            <!--&lt;!&ndash;label="Data"&ndash;&gt;-->
                            <!--&lt;!&ndash;id="data"&ndash;&gt;-->
                            <!--&lt;!&ndash;v-model="dueDate"&ndash;&gt;-->
                            <!--&lt;!&ndash;&gt;</v-text-field>&ndash;&gt;-->
                        <!--&lt;!&ndash;</v-flex>&ndash;&gt;-->
                      <!--&lt;!&ndash;</v-layout>&ndash;&gt;-->


                    <!--</v-flex>-->
                    <!--<v-flex md12 lg8>-->
                      <!--<v-time-picker v-model="dueHour"-->
                                     <!--format="24hr"></v-time-picker>-->
                      <!--<p>Hora: {{dueHour}}</p>-->



                      <!--&lt;!&ndash;<v-layout row>&ndash;&gt;-->
                        <!--&lt;!&ndash;<v-flex xs10 sm10 >&ndash;&gt;-->
                          <!--&lt;!&ndash;<v-text-field&ndash;&gt;-->
                            <!--&lt;!&ndash;name="hora"&ndash;&gt;-->
                            <!--&lt;!&ndash;label="Hora"&ndash;&gt;-->
                            <!--&lt;!&ndash;id="hora"&ndash;&gt;-->
                            <!--&lt;!&ndash;v-model="dueHour"&ndash;&gt;-->
                            <!--&lt;!&ndash;&gt;</v-text-field>&ndash;&gt;-->
                        <!--&lt;!&ndash;</v-flex>&ndash;&gt;-->
                      <!--&lt;!&ndash;</v-layout>&ndash;&gt;-->



                    <!--</v-flex>-->
                  <!--</v-layout>-->

                <!--</v-flex>-->
              <!--</v-layout>-->

              <!--&lt;!&ndash;<v-layout row>&ndash;&gt;-->
                <!--&lt;!&ndash;<v-flex xs10 offset-xs1 sm6 offset-sm3>&ndash;&gt;-->
                  <!--&lt;!&ndash;<v-text-field&ndash;&gt;-->
                    <!--&lt;!&ndash;name="imageUrl"&ndash;&gt;-->
                    <!--&lt;!&ndash;label="Url"&ndash;&gt;-->
                    <!--&lt;!&ndash;id="imageUrl"&ndash;&gt;-->
                    <!--&lt;!&ndash;v-model="imageUrl"&ndash;&gt;-->
                  <!--&lt;!&ndash;&gt;</v-text-field>&ndash;&gt;-->
                <!--&lt;!&ndash;</v-flex>&ndash;&gt;-->
              <!--&lt;!&ndash;</v-layout>&ndash;&gt;-->
              <!--<v-layout row>-->
                <!--<v-flex xs10 offset-xs1 sm6 offset-sm3>-->
                  <!--<img height="150px" :src="imageUrl"/>-->
                <!--</v-flex>-->
              <!--</v-layout>-->
            <!--</v-flex>-->
          <!--</v-layout>-->
          <!--<v-card-actions>-->
            <!--<v-spacer></v-spacer>-->
            <!--<v-btn flat-->
                   <!--color="primary"-->
                   <!--@click.native="dialog = false"-->
                   <!--:disabled="!formIsValid"-->
                   <!--type="submit">Criar-->
            <!--</v-btn>-->
            <!--<v-btn flat color="primary" @click.native="dialog = false">Cancelar</v-btn>-->
          <!--</v-card-actions>-->
        <!--</form>-->

      <!--</v-card>-->
    <!--</v-dialog>-->




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
                        :key="student.nome">
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


  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        dialog: false,
        title: '',
        dueDate: '',
        dueHour: '',
        description: '',
        imageUrl: '',
        selected: [],
        allSelected: false
      }
    },
    computed: {
      formIsValid () {
        return this.description !== ''
      },
      tasks () {
        return this.$store.getters.tasksForClass
      },
      tasksForStudents () {
        return this.$store.getters.tasksForStudents
      },
      students () {
        return this.$store.getters.students
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
      onCreateTask () {
        var taskData
        if (this.selected.length <= 0 || this.allSelected) {
          taskData = {
            // id: (new Date()).getMilliseconds(),
            titulo: this.title,
            // createDate: this.createDate,
            due_date: this.subbmitableDateTime,
            descricao: this.description,
            imageUrl: this.imageUrl
          }
        } else {
          let studentsSelectedsIds = []
          for (let index in this.selected) {
            studentsSelectedsIds.push(this.$store.getters.students[this.selected[index]].id)
          }
          taskData = {
            // id: (new Date()).getMilliseconds(),
            titulo: this.title,
            // createDate: this.createDate,
            due_date: this.subbmitableDateTime,
            descricao: this.description,
            imageUrl: this.imageUrl,
            students_ids: studentsSelectedsIds
          }
        }
        this.$store.dispatch('createTask', taskData)
      },
      selectSubject (id) {
        this.$store.dispatch('setSelectedSubject', id)
        this.$store.dispatch('getTopicsFromServer')
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
      },
      getStudentById (id) {
        let students = this.$store.getters.students
        for (let index in students) {
          if (students[index].id === id) {
            return students[index]
          }
        }
      }
    },
    beforeMount () {
      this.$store.dispatch('getTasksFromServer')
      // this.$store.dispatch('getStudentsFromServer')

        // .then(function (response) {
        // }).catch(function (error) {
        //   console.log(error)
        // })
    }
  }
</script>
