<template>
    <q-page padding>
        <span class="text-h5" padding>Cadastrar despesas</span>
        <q-form @submit="onSubmit(form.createdAt)">
            <div class="row q-col-gutter-lg">
                <q-input class="row-lg-6 col-xs-4" outlined v-model="form.value" label="Valor *" mask="R$#######"
                    unmasked-value hint=" Campo obrigatório" lazy-rules :rules="[rules.required]" />
                <q-input class="row-lg-6 col-xs-4" outlined v-model="form.createdAt" :rules="[rules.date]" mask="##/##/####"
                    label="DD/MM/YYYY *" @blur="handleBlurDate(form.createdAt)" hint=" Campo obrigatório" />
                <q-input class="row-lg-6 col-xs-4" outlined v-model="form.description" label="Descrição *"
                    hint="Campo obrigatório" lazy-rules :rules="[rules.required]" :maxlength="191"
                    onchange="form.description" />
            </div>
            <div class=" col-12 q-gutter-sm">
                <q-btn label="Salvar" color="primary" class="float-right" icon="save" type="submit"
                    :disable="disable"></q-btn>
                <q-btn label="Cancelar" class="float-right" text-color="primary" :to="{ name: 'AdminDashboard' }"></q-btn>
            </div>
        </q-form>
    </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import postsService from 'src/services/posts';
import { Notify } from 'quasar';
import { useRouter, useRoute } from 'vue-router';
import Cookie from 'js-cookie';
import rules from 'src/support/rules/fieldRules';
import { api } from 'boot/axios';
import { useCommonStore, useAuthStore } from "stores/all";
import { handleErros } from 'src/support/errors/handleErros';

const { post, getById } = postsService()
const $router = useRouter()
const $route = useRoute()
const notify = (message) => {
    Notify.create({
        message: message,
        color: 'positive',
        textColor: 'white',
        icon: 'check'
    });
}

const notifyError = (message) => {
    Notify.create({
        message: message,
        color: 'negative',
        textColor: 'white',
    });
}

const disable = ref(false);

const form = ref({
    value: '',
    description: '',
    createdAt: '',
    email: localStorage.getItem('email'),
    token: Cookie.get('_myapp_token')
})

onMounted(async () => {
    if ($route.params.id) {
        const response = await getById($route.params.id)
        form.value = response.data[0]
    }
    verifyPermissionEdit()
})

const $store = useAuthStore()
const $commonStore = useCommonStore()

onMounted(async () => {
    await api.post('/api/check-token', { token: Cookie.get('_myapp_token') })
        .then((res) => {
            if (res.data.success) {
                return true;
            }
            try {
                $store.SIGN_OUT()

            } catch (error) {
                $commonStore.REMOVE_REQUEST()
                handleErros(error)
            }
        })
})

const verifyPermissionEdit = async () => {
    if ($route.params.id) {
        const id = $route.params.id
        await api.post(`/api/verify-permission-edit/${id}`, { token: Cookie.get('_myapp_token') })
            .then((res) => {
                if (res.data.Type) {
                    return;
                }
                try {
                    notifyError('Voce nao tem permissao para alterar esse registro!')
                    return $router.push('/404')
                } catch (error) {
                    return handleErros(error)
                }
            })
    }
}

const handleBlurDate = async (value) => {
    const date = {
        createdAt: value
    }
    if (date.createdAt.length == 10) {
        try {
            const { data } = await api.post('/api/validate-date', date)
            if (data.status == 401) {
                disable.value = false
                return notifyError('A data informada deve ser menor ou igual a hoje!')
            }
            disable.value = false
            return data
        } catch (error) {
            notifyError('A data informada está inválida!')
            throw new Error(error)
        }
    } else {
        return false;
    }
}

const onSubmit = async (date) => {
    if ($route.params.id) {
        return updateData($route.params.id, date)
    }
    return postData(date)
}

const formEdit = ref({
    value: '',
    description: '',
    createdAt: '',
    email: '',
    token: Cookie.get('_myapp_token')
})

const updateData = async (id, date) => {
    formEdit.value = form.value
    const dateObj = {
        createdAt: date
    }
    await api.post('/api/validate-date', dateObj).then((res) => {
        if (res.data.status != 401) {
            try {
                api.put(`${'/api/edit-expense'}/${id}`, formEdit.value)
                notify('Despesa alterada com sucesso!')
                $router.push('/admin')
            } catch (error) {
                notifyError('Voce nao tem permissao para alterar esse registro!')
                throw new Error(error)
            }
        }
    })
}

const postData = async (date) => {
    const dateObj = {
        createdAt: date
    }
    await api.post('/api/validate-date', dateObj).then((res) => {
        if (res.data.status != 401) {
            try {
                post(form.value)
                notify('Despesa salva com sucesso!')
                $router.push('/admin')
            } catch (error) {
                notifyError('Ocorreu no processo de cadastro de registro e envio de e-mail!');
                throw new Error(error)
            }
        }
    })
}
</script>
