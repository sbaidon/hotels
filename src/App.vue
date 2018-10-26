<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <div class="profile">
        <img alt="avatar" src="./assets/logo.png" />
        <span>Sergio Baidon</span>
      </div>
    </div>
    <router-view/>
  </div>
</template>
<style lang="stylus">
a
  color salmon 
  font-weight bold

button
  background salmon
  border none
  color white 
  font-weight bold
  margin 2em auto
  width 30%

img 
  height 100%
  width 100%
  object-fit cover 

#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  height: 100vh

#nav
  display flex
  padding 1em
  text-align left
  a
    color black
    &.router-link-exact-active
      color salmon

.profile
  align-items center
  align-self flex-end
  display flex
  flex 1
  justify-content flex-end

  img
    background-color black 
    border-radius 50%
    height 25px 
    margin 0 1em
    width 25px


.description
  text-align justify

.rating
 color salmon 
 font-weight bold

.description
  text-align justify
</style>
