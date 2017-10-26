<template>

  <div v-if="user.id">
    <div class="row mb-4">
      <div class="col-sm">
        <h2>
          <span class="small text-uppercase text-muted d-block">Account</span>
          {{user.login}} - {{user.name}}
        </h2>
      </div>
      <div class="col-sm text-sm-right">
        <button class="btn btn-secondary" @click="onSignOutClick">Sign out</button>
      </div>
    </div>

    <div class="row">
      <div class="col-md-7">

        <div class="card" id="profile">
          <h3 class="card-header">Public Profile</h3>
          <div class="card-block">

            <div class="row">
              <div class="col-md-3 text-xs-center">
                <img :src="user.avatar_url" style="max-width: 100%" class="img-circle mx-auto" />
              </div>
              <div class="col-md-9">
                <div class="form-group">
                  <label class="h6">Username</label>
                  <input type="text" id="username" class="form-control" :value="user.login" />
                </div>
                <div class="form-group">
                  <label class="h6">Name</label>
                  <input type="text" id="name" class="form-control" :value="user.name" />
                </div>
                <div class="form-group">
                  <label class="h6">Email</label>
                  <input type="email" id="email" class="form-control" :value="user.email" />
                </div>
                <div class="form-group">
                  <label class="form-check-label h6">
                    <input type="checkbox" class="form-check-input" checked /> Keep my email address private
                  </label>
                </div>
                <div class="form-group">
                  <label class="h6">Company</label>
                  <input type="text" id="company" class="form-control" :value="user.company" />
                </div>
                <div class="form-group">
                  <label class="h6">Location</label>
                  <input type="text" id="location" class="form-control" :value="user.location" />
                </div>
                <div class="form-group">
                  <button class="btn btn-primary" @click="onUpdateClick">Update profile</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card" id="delete-account">
          <h3 class="card-header">Delete Account</h3>
          <div class="card-block">
            <p>You will immediately lose access to your repositories and all other information associated with your account.
              <strong>This cannot be undone!</strong>
            </p>
            <button class="btn btn-danger" @click="onDeleteClick">Delete Account</button>
          </div>
        </div>
      </div>
      <div class="col-md-5">

        <div class="card" id="notifications">
          <h3 class="card-header">Notifications</h3>
          <div class="card-block">
            <h4 class="h6">Automatically watch repositories?</h4>
            <p class="text-muted">When you are given push access to a repository, automatically receive notifications for it.</p>
            <p>
             <kendo-switch on-label="YES" off-label="NO"></kendo-switch>
            </p>
            <h4 class="h6">Receive updates to any conversations via email?</h4>
            <p>
             <kendo-switch on-label="YES" off-label="NO" checked="checked"></kendo-switch>
            </p>
            <h4 class="h6">Receive updates to any repositories via email?</h4>
            <p>
              <kendo-switch on-label="YES" off-label="NO" checked="checked"></kendo-switch>
            </p>
          </div>
        </div>
        <div class="card" id="password">
          <h3 class="card-header">Update password</h3>
          <div class="card-block">
            <div class="form-group">
              <label class="h6">Old password</label>
              <input type="password" class="form-control" />
            </div>
            <div class="form-group">
              <label class="h6">New password</label>
              <input type="password" class="form-control" />
            </div>
            <div class="form-group">
              <label class="h6">Confirm password</label>
              <input type="password" class="form-control" />
            </div>
            <div class="form-group">
              <button class="btn btn-secondary">Change password</button>
            </div>
          </div>
        </div>
      </div>
    </div>

	<kendo-window ref="successWindow" :width="450" :height="120" :modal="true" :title="'Thank You'" :resizable="false" :visible="false">
		<p>Your profile has been successfully updated</p>
		<button @click="onProfileDialogClose" class="btn btn-block">OK</button>
	</kendo-window>
	
	<kendo-window ref="deleteWindow" :width="450" :height="120" :modal="true" :title="'Are you sure you want to do this?'" :resizable="false" :visible="false">
		<p>Account deletetion cannot be undone!</p>
		<div>
			<button @click="onDeleteDialogClose" class="btn btn-secondary" style="width: 50%; float: left;">Cancel</button>
			<button @click="onDeleteDialogClose" class="btn btn-primary" style="width: 50%; float: left;">Delete Account</button>
		</div>
	</kendo-window>

  </div>
</template>

<script>
import { KendoWindow, KendoWindowInstaller } from '@progress/kendo-window-vue-wrapper'
import { KendoSwitch, KendoInputsInstaller } from '@progress/kendo-inputs-vue-wrapper'

  /* global kendo */
  export default {
    name: 'profile',
	components : {
		KendoWindow,
		KendoSwitch
	},
    created() {
      var that = this
      that.ghData = new kendo.data.DataSource({
        transport: {
          read: {
            url: 'https://api.github.com/users/ggkrustev',
            dataType: "json",
            beforeSend: function (req) {
              req.setRequestHeader('Authorization', 'token b95116792cba5a8169a1ec10640d8c16535c6419')
            }
          }
        },
        schema: {
          data: function (response) {
            return response
          },
          model: {
            fields: {
              id: { type: "number" }
            }
          }
        },
        requestEnd: (data) => {
          that.user = data.response
        }
      })
      this.ghData.read()
    },
    data() {
      return {
        user: {}
      }
    },
    methods: {
      onSignOutClick() {
        this.$router.push('Signin')
      },
      onUpdateClick() {
		var kWindow = this.$refs.successWindow.kendoWidget();
        kWindow.center().open();
      },
	  onProfileDialogClose(){
	  var kWindow = this.$refs.successWindow.kendoWidget();
        kWindow.close();
	  },
      onDeleteDialogClose() {
         var kWindow = this.$refs.deleteWindow.kendoWidget();
        kWindow.close();
      },
      onDeleteClick() {
	  var kWindow = this.$refs.deleteWindow.kendoWidget();
        kWindow.center().open();
        
      }
    }
  }
</script>