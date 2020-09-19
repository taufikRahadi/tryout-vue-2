<template>
  <div>
    <crud-layout
      :columns="columns"
      :moduleName="moduleName"
      :formRecord="formRecord"
      :formComponent="formComponent"
      @reset-data="resetData"
      :data="users"
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
          <action-button @fill-data="fillData" :record="user" :moduleName="moduleName" :formRecord="formRecord" />
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
    formRecord: {}
  }),
  methods: {
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
