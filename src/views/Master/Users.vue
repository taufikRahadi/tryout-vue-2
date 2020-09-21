<template>
  <div>
    <crud-layout
      :columns="columns"
      :moduleName="moduleName"
      :formRecord="formRecord"
      :formComponent="formComponent"
      @reset-data="resetData"
      :data="users"
      :errors="errors"
      @validate-data="validateData"
      :url="url"
    >
      <tr class="hover:bg-gray-700" v-for="(user, index) in users.data" :key="user.id">
        <td>
          {{ index + 1 }}
        </td>
        <td>
          {{ user.full_name | capitalize }}
        </td>
        <td>
          {{ user.username }}
        </td>
        <td>
          {{ user.email }}
        </td>
        <td>
          {{ user.phone_number }}
        </td>
        <td>
          {{ user.role | capitalize }}
        </td>
        <td>
          <action-button 
            @fill-data="fillData" 
            :record="user" 
            :moduleName="moduleName" 
            :formRecord="formRecord" 
            :url="url"
          />
        </td>
      </tr>
    </crud-layout>
  </div>
</template>

<script>
import CrudLayout from '@/layouts/CrudLayout.vue'
import ActionButton from '@/components/ActionButton.vue'
import UserForm from '@/forms/UserForm.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    'crud-layout': CrudLayout,
    ActionButton
  },
  computed: {
    ...mapGetters({
      users: 'users/users'
    })
  },
  data: () => ({
    columns: ['Full Name', 'username', 'email', 'phone number', 'role'],
    formComponent: UserForm,
    moduleName: 'users',
    formRecord: {},
    errors: {},
    url: 'user'
  }),
  methods: {
    validateData() {
      const username = this.formRecord.username.length < 7
      const full_name = this.formRecord.full_name.length < 7
      const regex = {
        email: /^(([^<>()[].,;:\s@"]+(.[^<>()[].,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z\-0-9]+.)+[a-zA-Z]{2,}))$/,
        phone_number: /[0-9]/
      }
      const email = regex.email.test(this.formRecord.email)
      const password = this.formRecord.password.length < 8
      const phone_number = !regex.phone_number.test(this.formRecord.phone_number) || this.formRecord.phone_number.length < 8
      let state = true
      if (username) {
        this.$set(this.errors, 'username', 'Minimal 7 characters for username')
        state = false
      }

      if (full_name) {
        this.$set(this.errors, 'full_name', 'Minimal 7 characters for full name')
        state = false
      }

      if (!email) {
        this.$set(this.errors, 'email', 'Your email address is invalid')
        state = false
      }

      if (password) {
        this.$set(this.errors, 'password', 'Password must contain at least 8 characters')
        state = false
      }

      if(phone_number) {
        this.$set(this.errors, 'phone_numbers', 'invalid phone numbers')
        state = false
      }
      return state
    },
    resetData() {
      this.formRecord = {
        full_name: '',
        username: '',
        email: '',
        phone_number: '',
        password: '',
      }
    },
    fillData(record) {
      this.formRecord = { ...record }
    },
  }
}
</script>
