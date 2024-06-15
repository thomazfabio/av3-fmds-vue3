<template>
    <v-container>
        <v-data-iterator :items="items" :page="page">
            <template v-slot:header="{ prevPage }">

                <div class="pb-4">
                    <v-row>
                        <v-col>
                            <div>
                                <v-btn class="mr-4">
                                    <template v-slot:prepend>
                                        <v-icon color="green">mdi-plus-box-outline</v-icon>
                                    </template>novo
                                </v-btn>
                                <v-btn class="mr-4" :disabled="!statusButtonEdit">
                                    <template v-slot:prepend>
                                        <v-icon color="blue">mdi-pencil-outline</v-icon>
                                    </template>editar
                                </v-btn>
                                <v-btn class="mr-4" :disabled="!statusButtonDelete">
                                    <template v-slot:prepend>
                                        <v-icon color="red">mdi-delete-outline</v-icon>
                                    </template>excluir
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
                        <v-row>
                            <v-col cols="6">
                                <div class="">
                                    <v-checkbox-btn v-model="ckeckSearchByName" class="pe-2"
                                        label="busca por nome"></v-checkbox-btn>
                                    <v-text-field :disabled="!ckeckSearchByName" label="Digite o nome"></v-text-field>
                                </div>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6">
                                <div class="">
                                    <v-checkbox-btn v-model="ckeckSearchByFunction" class="pe-2"
                                        label="busca por função"></v-checkbox-btn>
                                    <v-text-field :disabled="!ckeckSearchByFunction" label="Digite a função"></v-text-field>
                                </div>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="primary">Buscar</v-btn>
                        <v-btn color="red" @click="searchEnabled = false">Cancelar</v-btn>
                    </v-card-actions>
                </v-card>
            </template>
            <template v-slot:default="{ items }">
                <template v-for="(item, i) in items" :key="i">
                    <v-card v-bind="item.raw"></v-card>

                    <br>
                </template>
            </template>
        </v-data-iterator>
    </v-container>
</template>
<script setup>
import { ref } from 'vue'

const searchEnabled = ref(false)   
const ckeckSearchByName = ref(false)
const ckeckSearchAll = ref(false)
const ckeckSearchByFunction = ref(false)
const statusButtonEdit = ref(false)
const statusButtonDelete = ref(false)

const page = ref(1)
const items = Array.from({ length: 15 }, (k, v) => ({
    title: 'Item ' + v + 1,
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!',
}))
</script>