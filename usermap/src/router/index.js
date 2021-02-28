import Vue from 'vue'
import Router from 'vue-router'
// import axios from 'axios'
import routes from './routes'

Vue.use(Router)

let router = new Router(routes)

router.beforeEach((to, from, next) => {
  console.log('index.js-router.beforeEach((to:' + JSON.stringify(to, null, 3) +', from, next) => { ' + from + JSON.stringify(next,null, 3));
  console.log('localStorage = ' + JSON.stringify(localStorage,null,3));

  if (to.path === "/") {
    console.log('checking to for uri = / rerouting to /home!!!!');
    // next.path='/home'
    // next.name='Home'
    // next.fullPath='/home'
    // next({
    //   path: '/home',
    //   name: 'Home'
      // })
      // object
      router.push({ path: 'home' });
  }

  if (to.path === "/logout") {
    console.log('logout!!! woah. clearing USERS & jwt!!! ');

    localStorage.clear('jwt');
    localStorage.clear('user');
    router.push({ path: 'login' });
  }

  // console.log(' axios =defaults ' + JSON.stringify(axios.defaults, null, 3) );

  if (to.matched.some(record => record.meta.requiresAuth)) {
    console.log('index.js-router.beforeEach record.meta.requiresAuthtrue jwt=' + localStorage.getItem('jwt'));
    if (localStorage.getItem('jwt') == null) {
          next({
              path: '/login',
              params: { nextUrl: to.fullPath }
          })
      } else {
          let user = JSON.parse(localStorage.getItem('user')); // should be username? lol
          console.log('user = '+ user)
          if (to.path == '/login') {
            next({
                  path: '/home',
                  name: 'Home'
              });
          }
          if(to.matched.some(record => record.meta.is_admin)) {
              if(user.is_admin == 1){
                  next()
              }
              else{
                console.log('else user is not admin required')
                  next({name:'Profile'})
              }
          }else {
              console.log('else not admin required')
              next()
          }
      }
  } else {
    console.log('matched requiresAuth not required, public page: next commmand?)= to.path=' + to.path)
    if (to.path == '/login' && localStorage.getItem('user')) {
      console.log('already logged in reroute login to /home' + localStorage.getItem('user'));
      next({
            path: '/home',
            name: 'Home'
        });
    }
    next()
  }
  console.log('end of router before Each...')
})


export default router