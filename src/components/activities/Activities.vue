<template>
  <v-container>
  <v-container fluid v-bind="{ [`grid-list-sm`]: true }">
    <v-layout row wrap>
      <v-flex
        md4
        sm6
        xs12
        class="pa-2"
        v-for="activity in activities"
        :key="activity.nome">
        <v-card>
          <img src="../../assets/matematica.png"/>
          <v-card-title>{{ activity.nome }}</v-card-title>
          <v-subheader>{{ activity.texto }}</v-subheader>
          <v-card-actions>
            <!--<v-btn flat color="primary"-->
                   <!--@click.native="selectActivity(activity)">Testar-->
              <!--&lt;!&ndash;<v-icon right light>arrow_forward</v-icon>&ndash;&gt;-->
            <!--</v-btn>-->
            <v-spacer></v-spacer>
            <v-btn flat color="primary"
                   @click.native="selectActivity(activity)">Enviar
              <v-icon right light>arrow_forward</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>

  <v-navigation-drawer
    app
    absolute
    fixed
    enable-resize-watcher
    right
    v-model="rightSideNav"
    v-if="selectedActivity !== ''">
    <v-layout>
      <v-flex xs12 class="mt-2 offset-xs2">
        <img src="../../assets/matematica.png"
             height="196px"/>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex>
        <v-card-title v-if="selectedActivity !== undefined">{{ selectedActivity.nome }}</v-card-title>
      </v-flex>
    </v-layout>
    <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs3>
        <v-btn class="primary" @click.native="onCreateRecomendation"> Enviar </v-btn>
      </v-flex>
      <v-flex xs6 class="ml-5 pl-5 mt-2">
        <v-progress-circular v-if="loading" indeterminate color="primary"></v-progress-circular>
      </v-flex>
    </v-layout>
      </v-container>

    <v-divider></v-divider>
    <v-snackbar
      :timeout="6000"
      v-model="alert"
    >
      {{ alertMessage }}
      <v-btn flat color="pink" @click.native="alert = false">Fechar</v-btn>
    </v-snackbar>


    <v-list>
      <v-list-tile v-for="(student, index) in students"
                   :key="student.id">

        <v-layout row wrap>
        <v-flex
          xs12
        >
          <v-list-tile style="cursor: pointer"
                       @click="toggle(index)"
                       :key="student.id"
                       v-bind:ripple="{ class: 'primary--text' }">
            <v-list-tile-action>
              <v-layout row wrap>
                  <v-flex class="px-0" xs12>
                  <v-list-tile-action-text ripple>
                        {{ student.nome }}
                  </v-list-tile-action-text>
                    <v-icon
                      color="grey lighten-1"
                      v-if="selected.indexOf(index) < 0"
                    ></v-icon>
                    <v-icon
                      color="primary darken-2"
                      v-else
                    >check
                    </v-icon>
                  </v-flex>
              </v-layout>
            </v-list-tile-action>
          </v-list-tile>
        </v-flex>
        </v-layout>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        rightSideNav: false,
        activitySelected: '',
        alert: false,
        alertMessage: '',
        selected: []
      }
    },
    computed: {
      activities () {
        return this.$store.getters.activities
      },
      selectedActivity () {
        return this.$store.getters.selectedActivity
      },
      students () {
        return this.$store.getters.students
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      selectActivity (activity) {
        this.$store.dispatch('setSelectedActivity', activity)
        this.rightSideNav = true
        // this.$router.push('/activities' + id)
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
      onCreateRecomendation () {
        var estudantes = []
        for (var i = 0; i < this.selected.length; i++) {
          estudantes[i] = this.students[this.selected[i]].id
        }
        const data = {
          // activity: this.selectedActivity.id,
          estudantes: estudantes
        }
        this.$store.dispatch('sendActivityRecomendation', data)
          .then((data) => {
            this.alert = true
            this.alertMessage = data
          })
      }
    }
  }
</script>
