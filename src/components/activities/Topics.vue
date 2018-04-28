<template>
  <v-container fluid v-bind="{ [`grid-list-sm`]: true }">
    <v-subheader> {{ this.$store.getters.selectedClass.ano }}o Ano</v-subheader>
    <v-layout row wrap>
      <v-flex
        md3
        sm4
        xs6
        class="pa-2"
        v-for="topic in topics"
        :key="topic.nome">
        <v-card>
          <v-card-media>
            <img src="../../assets/matematica.png"/>
          </v-card-media>
          <v-card-title>{{ topic.nome }}</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat color="primary"
                   @click.native="selectTopic(topic.id)">Escolher
              <v-icon right light>arrow_forward</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-divider></v-divider>
    <!--<v-layout row wrap>-->
      <!--<v-flex-->
        <!--md3-->
        <!--sm4-->
        <!--xs6-->
        <!--class="pa-2"-->
        <!--v-for="topicWithoutYear in topicsWithoutYear"-->
        <!--:key="topicWithoutYear.nome">-->
        <!--<v-card>-->
          <!--<v-card-media>-->
            <!--<img src="../../assets/matematica.png"/>-->
          <!--</v-card-media>-->
          <!--<v-card-title>{{ topicWithoutYear.nome }}</v-card-title>-->
          <!--<v-card-actions>-->
            <!--<v-spacer></v-spacer>-->
            <!--<v-btn flat color="primary"-->
                   <!--@click.native="selectTopic(topicWithoutYear.id)">Escolher-->
              <!--<v-icon right light>arrow_forward</v-icon>-->
            <!--</v-btn>-->
          <!--</v-card-actions>-->
        <!--</v-card>-->
      <!--</v-flex>-->
    <!--</v-layout>-->
  </v-container>
</template>

<script>
  export default {
    computed: {
      topics () {
        return this.$store.getters.topicsFilteredWithYear
      },
      topicsWithoutYear () {
        console.log('without: ' + this.$store.getters.topicsFilteredWithoutYear.length)
        return this.$store.getters.topicsFilteredWithoutYear
      }
    },
    methods: {
      selectTopic (id) {
        this.$store.dispatch('setSelectedTopic', id)
        // this.$store.dispatch('getClassesFromServer')
        this.$store.dispatch('getTopicActivitiesFromServer')
        // this.$router.push('/activities' + id)
      }
    }
  }
</script>
