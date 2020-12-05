<template>
  <div id="app">
    <div id="content">
      <div id="nav">
        <div class="logo">
          <router-link to="/">MeetUp</router-link>
        </div>
        <div class="pages">
          <router-link to="/">Browse</router-link>
          <router-link to="/add">+ Activity</router-link>
          <router-link to="/manage">Manage</router-link>
        </div>
      </div>
      <router-view />
    </div>
    <div class="footer">
      <a href="https://github.com/jack40tall/meetup-4">Github Repo</a>
    </div>
  </div>
</template>

<style>
html {
  box-sizing: border-box;
}

body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #fcf8ec;
  margin: 0px;
  padding: 0px;
}

a {
  text-decoration: none;
}

#nav {
  padding: 24px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #d0e8f2;
  border-bottom: 1px solid #C0C0C0;
}

.logo {
  font-size: 16pt;
  padding: 0 20px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav .pages a:hover {
  color: #79a3b1;
}

#nav .pages {
  align-content: center;
  display: flex;
}

#nav .pages a{
  padding: 0 20px;
  line-height: 20pt;
  text-align: center;
}

#content {
  min-height: 100vh;
}

.footer {
  background-color: #456268;
  padding: 10px;
}

.footer a {
  color: #fcf8ec;
}

</style>
