// /site内容
import types from '../types'
import menu from '../../menu'
import _ from 'lodash'
import http from '../../http'

export default {
  state: {
    name: '饿了么管理员', //site name
    locale: 'zh-CN',
    locale_switcher: false,
    url: 'http://lapalaca.top',
    footer: `
  <span><a href="http://lapalaca.top">饿了么筑梦者</a> &copy; 2018</span>
  <span class="ml-auto">
    GitHub <a href="https://github.com/wxs77577/rest-admin">REST-ADMIN</a>
  </span>
  `,
    menu: [ //site menu
      {
        name: '管理员',
        url: '/',
        icon: 'icon-home',
      },
      {
        name: '活动管理',
        url: '/rest/activity',
        icon: 'icon-list'
      },
      // {
      //   name: '用户管理',
      //   url: '/rest/users',
      //   icon: 'icon-user',
      // },
      {
        name: '资源管理',
        title: true,
      },
      {
        name: '知识点',
        url: '/rest/point',
        icon: 'icon-list'
      },
      {
        name: '题型讲解',
        url: '/rest/explain',
        icon: 'icon-list'
      },
      {
        name: '学习指导',
        url: '/rest/guidance',
        icon: 'icon-list'
      },
      {
        name: '典型例题',
        url: '/rest/example',
        icon: 'icon-list'
      },
      {
        name: '学习经验',
        url: '/rest/experience',
        icon: 'icon-list'
      },
      {
        name: '大学介绍',
        url: '/rest/college',
        icon: 'icon-list'
      },
      {
        name: '学科介绍',
        url: '/rest/subject',
        icon: 'icon-list'
      },
      {
        name: 'System',
        title: true,
      },
      // {
      //   "name": "Settings",
      //   "url": "/form?uri=site/settings",
      //   "icon": "icon-settings",
      //   // a custom form.
      // },
      {
        name: 'Logout',
        url: '/login',
        icon: 'icon-lock',
      },
    ]
  },
  mutations: {
    [types.SET_SITE](state, data) {
      for (let k in data) {
        const value = data[k]
        if (typeof value === 'undefined') {
          continue
        }
        state[k] = value
      }
    },
  },
  getters: {
    currentMenu(state, getters, rootState) {
      const item = _.find(state.menu, { url: '/rest/' + rootState.route.params.resource }) || {}
      return item
    }
  },
  actions: {
    [types.FETCH_SITE]({ commit }) {
      http.get('site').then(({ data }) => {
        commit(types.SET_SITE, data)
        if (data.locale) {
          commit(types.SET_LOCALE, data.locale)
        }
      })
    }
  }
}