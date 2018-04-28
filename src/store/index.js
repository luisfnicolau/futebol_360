/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'
// import createPersistedState from 'vuex-persistedstate'
import VuexPersist from 'vuex-persist/dist/index'

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: 'vuex', // The key to store the state on in the storage provider.
  storage: window.localStorage // or window.sessionStorage or localForage
})

var moment = require('moment')

// localStorage.removeItem('vuex')

export const store = new Vuex.Store({
  plugins: [vuexLocalStorage.plugin],
  state: {
    news: [
      {
        imageUrl: 'https://www.insidehighered.com/sites/default/server_files/media/iStock-520374378.jpg',
        id: 'first',
        title: 'Title First'
      },
      {
        imageUrl: 'https://www.timeshighereducation.com/sites/default/files/istock-499343530.jpg',
        id: 'second',
        title: 'Title Second'
      }
    ],
    events: [
      // {
      //   id: '2',
      //   title: 'Prova de Historia',
      //   description: 'Segunda prova de Historia ',
      //   time: '2018-02-27@8:00',
      //   place: 'Sala 213'
      // },
      // {
      //   id: '1',
      //   title: 'Prova de Matemática',
      //   description: 'Terceira prova de Matemática',
      //   time: '2018-01-27@8:00',
      //   place: 'Sala 215'
      // },
      // {
      //   id: '2',
      //   title: 'Prova de Portugues',
      //   description: 'Segunda prova de Portugues ',
      //   time: '2018-01-27@8:00',
      //   place: 'Sala 213'
      // }
    ],
    messages: [
      // {
      //   title: 'Ótimo professor',
      //   shortMessage: 'Obrigado professor',
      //   message: 'Obrigado professor',
      //   sender: 'Luquinhas',
      //   sent: '17/01/2018 - 8:00',
      //   place: '200',
      //   dialog: false
      // },
      // {
      //   title: 'Dúvida matematica',
      //   shortMessage: 'Estou com duvida na questão que o senhor passou para casa...',
      //   message: 'Estou com duvida na questão que o senhor passou para casa Lorem ipsum sem lacinia eget massa suscipit orci aenean, iaculis pellentesque quam pharetra nisl lacinia risus sed curabitur, ultricies eu phasellus scelerisque eget ullamcorper feugiat sed suspendisse habitasse sodales euismod accumsan.' +
      //   'Estou com duvida na questão que o senhor passou para casa Lorem ipsum sem lacinia eget massa suscipit orci aenean, iaculis pellentesque quam pharetra nisl lacinia risus sed curabitur, ultricies eu phasellus scelerisque eget ullamcorper feugiat sed suspendisse habitasse sodales euismod accumsan.',
      //   sender: 'Marquinhos',
      //   sent: '15/01/2018 - 13:54',
      //   place: '200',
      //   dialog: false
      // }
    ],
    tasks: [
      // {
      //   id: 'aaa',
      //   title: 'Problema matemática',
      //   createDate: '2018-01-25@20:38',
      //   dueDate: '2018-01-25@20:38',
      //   imageUrl: 'https://hlfppt.org/wp-content/uploads/2017/04/placeholder.png',
      //   description: 'Resolve isso ai'
      // }
    ],
    user: null,
    auth: {
      token: '',
      expiration: ''
    },
    classes: [],
    selectedClass: {},
    subjects: [],
    subjectSelected: '',
    topics: [],
    topicSelected: '',
    activities: [],
    selectedActivity: '',
    students: [],
    loading: false,
    errors: [
      {
        error: 'Credenciais do usuário inválidas'
      }
    ],
    showToolbar: false,
    studentReports: []
  },






  mutations: {
    createTask (state, payload) {
      state.tasks.push(payload)
    },
    createActivity (state, payload) {
      state.activities.push(payload)
    },
    setUser (state, payload) {
      state.user = payload
    },
    setAuth (state, payload) {
      state.auth = payload
    },
    eraseAuth (state) {
      state.auth = ''
    },
    eraseUserInfo (state) {
      state.auth = ''
      state.user = ''
    },
    updateUser (state, payload) {
      state.user.nome = payload.nome
      state.user.formacao = payload.formacao
      state.user.idade = payload.idade
    },
    eraseData (state) {
      state.auth = ''
      state.user = ''
      state.activities = []
      state.selectedActivity = ''
      state.messages = []
      state.subjects = []
      state.subjectSelected = ''
      state.topicSelected = ''
      state.topics = []
      state.classes = []
      state.selectedClass = ''
      state.students = []
      state.tasks = []
      state.events = []
      state.studentReports = []
      state.loading = false
    },
    setMessages (state, payload) {
      state.messages = payload
    },
    addMessages (state, payload) {
      state.messages.push(payload)
    },
    deleteMessages (state) {
      state.messages = []
    },
    setSubjects (state, payload) {
      state.subjects = payload
    },
    setSelectedSubject (state, payload) {
      state.subjectSelected = payload
    },
    deleteSubjects (state) {
      state.subjects = null
      state.subjectSelected = null
    },
    setTopics (state, payload) {
      state.topics = payload
    },
    setSelectedTopic (state, payload) {
      state.topicSelected = payload
    },
    deleteTopic (state) {
      state.topicSelected = null
      state.topics = null
    },
    setActivities (state, payload) {
      state.activities = payload
    },
    setSelectedActivity (state, payload) {
      state.selectedActivity = payload
    },
    setClasses (state, payload) {
      state.classes = payload
    },
    setStudents (state, payload) {
      state.students = payload
    },
    setTasks (state, payload) {
      state.tasks = payload
    },
    addTask (state, payload) {
      state.tasks.push(payload)
    },
    addTasks (state, payload) {
      for (let index in payload) {
        state.tasks.push(payload[index])
      }
    },
    setEvents (state, payload) {
      state.events = payload
    },
    addEvent (state, payload) {
      state.events.push(payload)
    },
    addStudentReport (state, payload) {
      state.studentReports.push(payload)
    },
    cleanStudentsReports (state, payload) {
      state.studentReports = []
    },
    cleanEvents (state) {
      state.events = []
    },
    setSelectedClass (state, payload) {
      for (var i = 0; i < state.classes.length; i++) {
        if (state.classes[i].nome === payload) {
          state.selectedClass = state.classes[i]
        }
      }
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    changeToolbarVisibility (state, payload) {
      state.showToolbar = payload
    }
  },




  actions: {
    createActivity ({commit}, payload) {
      const date = new Date()
      var month = date.getMonth() + 1
      if (month < 10) {
        month = '0' + month.toString()
      }

      const activity = {
        id: (new Date()).getMilliseconds(),
        title: payload.title,
        createDate: date.getFullYear() + '-' + month + '-' + date.toDateString().substr(8, 2) + '@' + date.getHours() + ':' + date.getMinutes(),
        dueDate: payload.dueDate,
        imageUrl: payload.imageUrl,
        description: payload.description
      }

      commit('createActivity', activity)
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      return new Promise((resolve, reject) => {
        axios.post('/api/professor/login', payload)
          .then(response => {
            const newAuth = {
              token: response.data.access_token,
              expiration: response.data.expires_in + moment().valueOf()
            }
            commit('setAuth', newAuth)
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + newAuth.token
            this.dispatch('getLoggedUserInfoFromServer')
          })
          .catch(error => {
            const errorMessage = 'Credenciais de usuário inválidas.'
            console.log(error)
            commit('setLoading', false)
            reject(errorMessage)
            // return 'Credenciais de usuário inválidas'
          })
      })
    }
  },
  getters: {
    news (state) {
      return state.news.sort()
    },
    events (state) {
      return state.events.sort((eventA, eventB) => {
        return eventA.data > eventB.data
      })
    },
    event (state) {
      return eventId => {
        return state.events.find((event) => {
          return event.id === eventId
        })
      }
    },
    messages (state) {
      return state.messages.sort((messageA, messageB) => {
        return messageA.sent > messageB.sent
      })
    },
    students (state) {
      const filteredStudents = state.students.filter(student => {
        return student.pivot.turmas_id === state.selectedClass.id
      })
      return filteredStudents.sort((studentA, studentB) => {
        return studentA.nome > studentB.nome
      })
    },
    studentsIds (state) {
      const studentsIds = []
      for (let i = 0; i < state.students.length; i++) {
        studentsIds.push(state.students[i].id)
      }
      return studentsIds
    },
    tasks (state) {
      return state.tasks.sort()
    },
    tasksForClass (state) {
      const filteredTasks = state.tasks.filter(task => {
        return task.pivot.estudantes_id === undefined && task.pivot.turmas_id === state.selectedClass.id
      })
      return filteredTasks.sort((taskA, taskB) => {
        return taskA.due_date > taskB.due_date
      })
    },
    tasksForStudents (state) {
      let filteredTasks = state.tasks.filter(task => {
        for (let index in state.students) {
          if (state.students[index].pivot.turmas_id === state.selectedClass.id) {
            return task.pivot.estudantes_id !== undefined
          }
        }
      })

      return filteredTasks.sort((taskA, taskB) => {
        return taskA.due_date > taskB.due_date
      })
    }
  }
})
