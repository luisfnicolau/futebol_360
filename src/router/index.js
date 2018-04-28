import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Activities from '@/components/activities/Activities'
import Subjects from '@/components/activities/Subjects'
import Topics from '@/components/activities/Topics'
import ClassTasks from '@/components/class_tasks/ClassTasks'
import Profile from '@/components/user/Profile'
import Login from '@/components/user/Login'
import Reports from '@/components/reports/Reports'
import Calendar from '@/components/calendar/Calendar'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {forVisitors: true, title: 'Inicio'}
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {forVisitors: true, title: 'Entrar'}
    },
    {
      path: '/subjects',
      name: 'Subjects',
      component: Subjects,
      meta: {forAuth: true, title: 'Assuntos'}
    },
    {
      path: '/topics',
      name: 'Topics',
      component: Topics,
      meta: {forAuth: true, title: 'Topicos'}
    },
    {
      path: '/activities',
      name: 'Activities',
      component: Activities,
      meta: {forAuth: true, title: 'Atividades'}
    },
    {
      path: '/tasks',
      name: 'Tasks',
      component: ClassTasks,
      meta: {forAuth: true, title: 'Tarefas'}
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: {forAuth: true, title: 'Profile'}
    },
    {
      path: '/reports',
      name: 'Relatorios',
      component: Reports,
      meta: {forAuth: true, title: 'Relatorio'}
    },
    {
      path: '/calendar',
      name: 'Calendar',
      component: Calendar,
      meta: {forAuth: true, title: 'Calendario'}
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
