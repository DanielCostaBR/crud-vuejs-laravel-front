<template>
  <q-page padding>
    <q-table title="Tabela de despesas" :rows="rows" :columns="columns" row-key="name">
      <template v-slot:top>
        <span class="text-h5">Tabela de despesas</span>
        <q-space />
        <q-btn color="primary" label="Nova despesa" :to="{ name: 'formPost' }"></q-btn>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-gutter-sm">
          <q-btn icon="edit" color="primary" dense @click="handleEditPost(props.row.userId)"></q-btn>
          <q-btn icon="delete" color="negative" dense @click="handleDeletePost(props.row.userId)"></q-btn>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue';
import postsService from 'src/services/posts'
import { Notify } from 'quasar'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { api } from 'src/boot/axios';
import Cookie from 'js-cookie';
import { showMoney } from 'src/helpers/money';

const notify = (message) => {
  Notify.create({
    message: message,
    color: 'positive',
    textColor: 'white',
    icon: 'check'
  })
}

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const rows = ref([])
    const { remove } = postsService()
    const columns = [
      { name: 'userId', field: 'userId', label: 'ID', sortable: true, align: 'left' },
      { name: 'value', field: 'value', label: 'Valor', sortable: true, align: 'left', valueformat: "currency" },
      { name: 'description', field: 'description', label: 'Descrição', sortable: true, align: 'left' },
      { name: 'createdAt', field: 'createdAt', label: 'Data', sortable: true, align: 'left' },
      { name: 'actions', field: 'actions', label: 'Ações', align: 'right' }
    ]

    onMounted(() => {
      getData()
    })

    const getData = async () => {
      try {
        const data = await api.post('/api/data', { token: Cookie.get('_myapp_token') })
        rows.value = data.data.data

      } catch (error) {
        throw new Error(error)
      }
    }

    const $q = useQuasar()
    const handleDeletePost = async (id) => {
      try {
        $q.dialog({
          title: 'Deletar',
          message: 'Deseja deletar este registro?',
          cancel: 'Cancelar',
          persistent: true
        }).onOk(async () => {
          await remove(id)
          notify('Apagado com sucesso!')
          location.reload()
          await getData()
        })
      } catch (error) {
        throw new Error(error)
      }
    }

    const $router = useRouter()
    const handleEditPost = async (id) => {
      $router.push({ name: 'formPost', params: { id } })
    }

    return {
      rows,
      columns,
      handleDeletePost,
      handleEditPost
    }
  }
})
</script>

