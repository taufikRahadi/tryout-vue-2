<template>
  <div>
    <crud-layout
      :columns="columns"
      :moduleName="`users`"
    >
      <tr class="hover:bg-gray-700" v-for="(user, index) in users.data" :key="user.id">
        <td class="px-4 py-3">
          {{ index + 1 }}
        </td>
        <td class="px-4 py-3">
          {{ user.full_name | capitalize }}
        </td>
        <td class="px-4 py-3">
          {{ user.username }}
        </td>
        <td class="px-4 py-3">
          {{ user.email }}
        </td>
        <td class="px-4 py-3">
          {{ user.phone_number }}
        </td>
        <td class="px-4 py-3">
          {{ user.role | capitalize }}
        </td>
        <td>
          <action-button />
        </td>
      </tr>
    </crud-layout>
  </div>
</template>

<script>
import CrudLayout from '@/layouts/CrudLayout.vue'
import ActionButton from '@/components/ActionButton.vue'
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
    columns: ['Full Name', 'username', 'email', 'phone number', 'role']
  }),
}
</script>
