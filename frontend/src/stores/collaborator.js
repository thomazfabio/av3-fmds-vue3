import { defineStore } from "pinia";
import axios from 'axios'
import { computed, toRaw } from "vue";
import { useUserStore } from "./user"; 

const collaboratorStore = useUserStore();

const token = computed(() => collaboratorStore.getUserProfile.accessToken);


// Create an instance using the config defaults provided by the library
const apiBackend = axios.create({
    baseURL: 'http://localhost:3005/',
    timeout: 1000,
    headers: { 'Authorization': `Bearer ${token.value}` }
});

export const useCollaboratorStore = defineStore('collaborator', {
    state: () => ({
        collaborator: [],
        alert: {
            show: false,
            message: '',
            type: '',
        },
    }),

    getters: {
        getCollaborator: (state) => state.collaborator,
    },

    actions: {

        resetAlert() {
            this.alert = {
                show: false,
                message: '',
                type: '',
            };
        },

        closseById(id) {
            //return array.filter(item => item.info.id !== id);
            const temArr = this.collaborator.filter(collaborator => collaborator.id !== id);
            this.collaborator = temArr;
        },

        setCollaborator(newCollaborator) {
            this.collaborator.push(newCollaborator[0]);
        },

        getCollaboratorById(collaboratorId) {
            apiBackend.get(`/collaborator/${collaboratorId}`)
                .then((response) => {
                    const collaborator = response.data.result;
                    this.setCollaborator(collaborator);
                }).catch((error) => {
                    console.log(error);
                });
        },

        newCollaborator(collaboratorData) {
            const dataRaw = toRaw(collaboratorData);
            apiBackend.post('/collaborator', dataRaw)
                .then((response) => {
                    const collaboratorId = response.data.result.insertId;
                    //aciona o alerta
                    this.alert = {
                        show: true,
                        message: 'Colaborador inserido com sucesso!',
                        type: 'success',
                    };
                    this.getCollaboratorById(collaboratorId);
                }).catch((error) => {
                    console.log(error);
                });
        },

        getAllCollaborator() {
            apiBackend.get('/collaborator')
                .then((response) => {
                    const collaborator = response.data.result;
                    this.collaborator = collaborator;
                }).catch((error) => {
                    console.log(error);
                });
        },

        updateCollaborator(collaboratorData) {
            const dataRaw = toRaw(collaboratorData);
            const data = {
                name: dataRaw.name,
                task_function: dataRaw.function,
                description: dataRaw.description,
            };
            console.log(data);
            apiBackend.put(`/collaborator/${dataRaw.id}`, data)
                .then((response) => {
                    //aciona o alerta
                    this.alert = {
                        show: true,
                        message: 'Colaborador atualizado com sucesso!',
                        type: 'success',
                    };
                    this.getCollaboratorById(dataRaw.id);
                }).catch((error) => {
                    console.log(error);
                });
        },

        deleteCollaborator(collaboratorId) {
            apiBackend.delete(`/collaborator/${collaboratorId}`)
                .then((response) => {
                    //aciona o alerta
                    this.alert = {
                        show: true,
                        message: 'Colaborador deletado com sucesso!',
                        type: 'success',
                    };
                    this.collaborator = this.collaborator.filter((collaborator) => collaborator.id !== collaboratorId);
                }).catch((error) => {
                    console.log(error);
                });
        }
    },
})

