import View from './components/view'
import Link from './components/link'

export function install (Vue) {
  if (install.installed) return
  install.installed = true

  Object.defineProperty(Vue.prototype, '$router', {
    get () { return this.$root._router }
  })

  Object.defineProperty(Vue.prototype, '$route', {
    get () { return this.$root._route }
  })

  Vue.mixin({
    beforeCreate () {
      if (this.$options.router) {
        this._router = this.$options.router
        this._router.init(this)
        Vue.util.defineReactive(this, '_route', this._router.history.current)
      }
    }
  })

  Vue.component('router-view', View)
  Vue.component('router-link', Link)
}
