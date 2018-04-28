<template>
  <v-container fluid>
    <v-divider></v-divider>
    <v-subheader> JOGO </v-subheader>


    <v-layout row wrap>
      <v-flex sm12>
        <v-card class="primary pl-3 pr-3 mb-3">
          <v-card class="neutral">
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">INSIRA VIDEO AQUI</h3>
              </div>
            </v-card-title>
          </v-card>
        </v-card>
      </v-flex>
    </v-layout>


  </v-container>
</template>


<script>
  /* eslint-disable space-before-function-paren */

  export default {
    computed: {
    },
    data () {
      return {}
    },
    methods: {
      onLoadCalendar () {

      }
      // onLoadTasks () {
      //   this.$store.dispatch('getTasksFromServer')
      // },
    },
    beforeMount () {
      // this.$store.dispatch('getClassesFromServer', false)
      // this.$store.dispatch('getTasksFromServer')
      // this.$store.dispatch('getMessagesFromServer')
      // this.$store.dispatch('getStudentsFromServer')
    },
    mounted () {
      // this.$store.dispatch('changeToolbarVisibility', true)
    }
  }
</script>

<style scoped>
  .title {
    position: absolute;
    bottom: 50px;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
  }

  .bottom-left {
    left: 10px;
    bottom: 10px;
    position: absolute;
  }

  .bottom {
    bottom: 16px;
    position: absolute;
  }
</style>
