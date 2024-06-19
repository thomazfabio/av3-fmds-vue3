<template>
    <v-container>
        <v-row>
            <v-col>
                <h1>Gerenciamento de colaboradores</h1>
            </v-col>
        </v-row>
        <v-data-iterator :items="items">
            <template v-slot:header="{ prevPage }">

                <div class="pb-4">
                    <v-row>
                        <v-col>
                            <div>
                                <v-btn class="mr-4" @click="newEnabled = true">
                                    <template v-slot:prepend>
                                        <v-icon color="green">mdi-plus-box-outline</v-icon>
                                    </template>novo
                                </v-btn>
                                <v-btn class="mr-4" @click="searchEnabled = true">
                                    <template v-slot:prepend>
                                        <v-icon color="orange">mdi-file-search-outline</v-icon>
                                    </template>buscar
                                </v-btn>
                            </div>
                        </v-col>
                    </v-row>
                </div>
                <v-alert v-if="alertStatus" :type="alertType" elevation="2" class="mb-2" closable @click="resetAlert">
                    {{ alertMsg }}
                </v-alert>
                <!-- Card de novo colaborador -->
                <v-card class="mb-4" v-if="newEnabled">
                    <v-card-title>{{ titleNewCollaborator }}</v-card-title>
                    <v-divider></v-divider>
                    <v-card-text class="pb-0 mt-4">
                        <v-row class="pb-0 mb-0">
                            <v-col cols="6" class="pb-0">
                                <v-text-field class="mb-2" variant="outlined" density="compact" label="Nome"
                                    v-model="collaborator.name"></v-text-field>
                                <v-text-field class="mb-2" variant="outlined" density="compact" label="Função"
                                    v-model="collaborator.function"></v-text-field>
                                <v-textarea class="mb-2" variant="outlined" density="compact" label="Observação"
                                    v-model="collaborator.description"></v-textarea>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions class="pt-0 mt-0">
                        <v-btn color="primary" @click="newCollaborator">Salvar</v-btn>
                        <v-btn color="yellow" @click="closeNewEditCollaborator">fechar</v-btn>
                        <v-btn color="red" @click="closeNewEditCollaborator">Cancelar</v-btn>
                    </v-card-actions>
                </v-card>
                <!-- ...  -->

                <!-- Card de busca avançada -->
                <v-card class="mb-4" v-if="searchEnabled">
                    <v-card-title>Busca avamçada</v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-row>
                            <v-col cols="6">
                                <div class="">
                                    <v-checkbox-btn v-model="ckeckSearchAll" class="pe-2"
                                        label="Buscar todos"></v-checkbox-btn>
                                </div>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions class="pl-6">
                        <v-btn color="primary" @click="searchAllCollaborator()"
                            :disabled="!ckeckSearchAll">Buscar</v-btn>
                        <v-btn color="yellow" @click="searchEnabled = false">fechar</v-btn>
                        <v-btn color="red" @click="searchEnabled = false">Cancelar</v-btn>
                    </v-card-actions>
                </v-card>
                <!-- ...  -->

            </template>
            <template v-slot:default="{ items }">
                <template v-for="(item, i) in items" :key="i">
                    <v-card v-bind="item.raw">
                        <v-divider></v-divider>
                        <v-card-text>{{ "id: " + item.raw.exportData.id }}</v-card-text>
                        <v-card-text>{{ "nome: " + item.raw.exportData.name }}</v-card-text>
                        <v-card-text>{{ "função: " + item.raw.exportData.function }}</v-card-text>
                        <v-card-text>{{ "descrição: " + item.raw.exportData.description }}</v-card-text>
                        <v-card-actions>
                            <v-btn color="primary" @click="updateCollaborator(item.raw.exportData, 'update')">Editar</v-btn>
                            <v-btn color="yellow" @click="closseById(item.raw.exportData.id)">fechar</v-btn>
                            <v-btn color="red" @click="deleteCollaborator(item.raw.exportData.id)">Excluir</v-btn>
                        </v-card-actions>
                    </v-card>

                    <br>
                </template>
            </template>
        </v-data-iterator>
    </v-container>
</template>
<script setup>
import { ref, watch } from 'vue'
import { useCollaboratorStore } from '../stores/collaborator'
const collaboratorStore = useCollaboratorStore()

const newEnabled = ref(false)
const searchEnabled = ref(false)
const ckeckSearchByName = ref(false)
const ckeckSearchAll = ref(false)
const ckeckSearchByFunction = ref(false)
const statusButtonEdit = ref(false)
const statusButtonDelete = ref(false)
const updateCollaboratorEnabled = ref(false)
const collaborator = ref({
    name: '',
    function: '',
    description: ''
})
const titleNewCollaborator = ref('Novo colaborador')
const alertStatus = computed(() => collaboratorStore.alert.show)
const alertMsg = computed(() => collaboratorStore.alert.message)
const alertType = computed(() => collaboratorStore.alert.type)


const newCollaborator = () => {
    if (updateCollaboratorEnabled.value) {
        collaboratorStore.updateCollaborator(collaborator.value)
        updateCollaboratorEnabled.value = false
        titleNewCollaborator.value = 'Novo colaborador'
        collaborator.value = {
            name: '',
            function: '',
            description: ''
        }
        return
    }
    collaboratorStore.newCollaborator(collaborator.value)
    collaborator.value = {
        name: '',
        function: '',
        description: ''
    }
}

const resetAlert = () => {
    collaboratorStore.resetAlert()
}

const closeNewEditCollaborator = () => {
    collaborator.value = {
        name: '',
        function: '',
        description: ''
    }
    newEnabled.value = false
    titleNewCollaborator.value = 'Novo colaborador'
}

const deleteCollaborator = (id) => {
    collaboratorStore.deleteCollaborator(id)
}

const searchAllCollaborator = () => {
    collaboratorStore.getAllCollaborator()
}

//apenas abre o card new collaborator preparado para update
const updateCollaborator = (data , info) => {
    updateCollaboratorEnabled.value = true
    newEnabled.value = true
    collaborator.value = data
    titleNewCollaborator.value = 'Editar colaborador'
}


const colaboradorData = computed(() => collaboratorStore.collaborator);

// Função para fechar card do collaborador pelo id
const closseById = (id) => {
    collaboratorStore.closseById(id)
}

// Lista de itens, inicialmente vazia
const items = computed(() => {
    return colaboradorData.value.map((collaborator, index) => ({
        title: "Dabos do colaborador", // Supondo que 'name' seja uma propriedade dos colaboradores
        exportData: {
            id: collaborator.id,
            name: collaborator.first_name,
            function: collaborator.task_function,
            description: collaborator.description
        }
    }));
});

</script>