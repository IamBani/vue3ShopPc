import { defineStore } from "pinia";
 
interface aaa{
    str: string | number,
    count: number,
    ccc:bbb[]
}
interface bbb{
    a: string,
    b:boolean
}
export const useCount = defineStore('counter',{
    state: ():aaa=> {
        return {
            count: 0,
            str: 'agsh',
            ccc: [{
                a:'sss',
                b:false
            }]
        }
    },
    actions: {
        increments() {
            this.count++
            this.str = 6789
        }
    },
    persist:true
})