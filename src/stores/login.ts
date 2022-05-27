import { defineStore } from "pinia";

export const uselogin = defineStore('login', {
    state: () => {
        return {
            ccc:12
        }
    },
    actions: {
        change(v:number) {
            this.ccc +=v
        }
    }
})