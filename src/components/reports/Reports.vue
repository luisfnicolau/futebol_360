<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12>
        <v-layout row wrap align-center justify-center flex>
          <v-flex xs12 sm4>
              <v-card-text v-if="students.length === 0">
                <p class="text-xs-center">Não há alunos nesta Turma</p>
              </v-card-text>
          </v-flex>
        </v-layout>
        <v-expansion-panel>
          <v-expansion-panel-content v-for="(student, index) in students" :key="student.id">
            <div slot="header">{{ student.nome }}</div>

            <v-select
              class="ma-3 pr-5"
              :items="subjects"
              item-text="nome"
              item-value="id"
              v-model="selectedSubjectId"
              label="Selecione um assunto"
              single-line
              bottom
            ></v-select>

            <v-card v-if="checkIfEmpty(student.id)">
              <v-card-text> Nenhuma informação no momento</v-card-text>
            </v-card>

            <v-container fluid v-bind="{ [`grid-list-sm`]: true }">
              <v-layout row wrap>
                <v-flex xs12
                        sm6
                        v-for="(report, index) in studentsReports"
                        :key="report.id"
                        v-if="report.pivot.estudantes_id === student.id && selectedSubjectId === report.assuntos_id">

                  <v-card>
                    <v-card-title class="title">{{report.nome}} - {{report.ano}}º ano</v-card-title>
                    <v-card-text>
                      <v-layout row>
                        <v-flex>
                          <v-progress-circular
                            :size="100"
                            :width="15"
                            :rotate="360"
                            :value="report.pivot.desempenho_medio_global"
                            :color="performanceColor(report.pivot.desempenho_medio_global)"
                          >
                            {{report.pivot.desempenho_medio_global}}%
                          </v-progress-circular>
                        </v-flex>
                        <v-flex>
                          Fez {{report.pivot.questoes_respondidas_totais}} questões, acertou
                          {{report.pivot.desempenho_medio_global}}%.
                        </v-flex>
                      </v-layout>
                    </v-card-text>

                  </v-card>

                </v-flex>
              </v-layout>
            </v-container>

          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        selectedSubjectId: 1
      }
    },
    computed: {
      students () {
        return this.$store.getters.students
      },
      studentsReports () {
        return this.$store.getters.studentReports
      },
      subjects () {
        return this.$store.getters.subjects
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      performanceColor (desempenhoNoTopico) {
        if (desempenhoNoTopico >= 70) {
          return 'green'
        } else if (desempenhoNoTopico < 70 && desempenhoNoTopico >= 40) {
          return 'yellow'
        } else if (desempenhoNoTopico < 40) {
          return 'red'
        }
      },
      checkIfEmpty (studentId) {
        let isEmpty = true
        var reports = this.$store.getters.studentReports
        for (var i = 0; i < reports.length; i++) {
          if (reports[i].pivot.estudantes_id === studentId && reports[i].assuntos_id === this.selectedSubjectId) {
            isEmpty = false
          }
        }
        return isEmpty
      }
    },
    beforeMount () {
      const data = {
        studentId: 1,
        subjectId: 1
      }
      this.$store.dispatch('getSubjectsFromServer')
      this.$store.dispatch('getStudentTrainedTopicsOnSubject', data)
    }
  }
</script>
