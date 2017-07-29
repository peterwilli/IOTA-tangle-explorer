import Vue from 'vue';
Vue.directive('toast', {
  bind: function (el, binding, vnode) {    
    el.event = function(event)
    {        
        if(el == event.target || el.contains(event.target))
        {
            Vue.toast(binding.expression.replace(/"/g,''),{className:['toast-box'],verticalPosition: 'bottom', duration: 3000})
        }
    }
    document.body.addEventListener('click', el.event)    
  },
  unbind: function (el) {
    document.body.removeEventListener('click', el.event)
  }
})

