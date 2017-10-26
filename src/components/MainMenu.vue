<template>
    <div class="row">
        <div id="top-bar" class="top-bar col-xs-12 bg-inverse d-md-none"></div>
        <div id="nav"
            class="col-xs-3 bg-inverse text-white py-5 k-vbox"
            v-if="this.$route.path !== '/signout'"
            :class="{expand: navState}">
            <span id="nav-toggle" class="nav-toggle d-md-none" @click="navState = !navState">
                <span class="k-icon k-i-hamburger"></span>
            </span>
            <h1 id="app-title">Issues</h1>
            <p id="app-subtitle">Sample Dashboard</p>
            <hr />
            <p class="h4 mt-5">Project</p>
            <ul class="nav nav-pills flex-column">
                <li class="nav-item" id="dashbaord">
                    <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
                </li>
                <li class="nav-item" id="issues">
                    <router-link to="/issues" class="nav-link">Issues</router-link>
                </li>
            </ul>
            <p class="h4 mt-5">Account</p>
            <ul class="nav nav-pills flex-column">
                <li class="nav-item" id="profile">
                    <router-link to="/profile" class="nav-link">My Profile</router-link>
                </li>
                <li class="nav-item" id="signout">
                    <router-link to="/signout" class="nav-link">Sign Out</router-link>
                </li>
            </ul>
            <hr class="k-flex" />
            <div id="copy">
                <p>Copyright &copy; {{year}},<br /><a href="http://www.progress.com">Progress Software Corporation</a> and/or its subsidiaries or affiliates.</p>
                <p>All Rights Reserved.</p>
            </div>
        </div>
        <main class="col-xs p-4 py-5">
            <router-view></router-view>
        </main>
    </div>
  </template>

  <script>
  export default {
    name: 'main-menu',
    data () {
      return {
        year: '2017',
        transformValue: 'translateX(0)',
        navState: false
      }
    }
  }
  </script>

