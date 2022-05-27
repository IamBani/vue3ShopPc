import { useCount } from '@/stores/counter'
import { uselogin } from '@/stores/login'
import { defineComponent, reactive, ref } from 'vue'

interface abc{
    a: string,
    b:number
}

export default defineComponent({
    setup() {
        const a = ref(0) 
        const arr:abc[] = reactive([{a:'sghds',b:23,ccc:122}])
        const counter = useCount()
       const login = uselogin()
        const handleClick = () => {
            a.value += 1
            counter.increments()
            login.change(12)
        }
        const str = ref<string>(`<div>${a.value}</div>`)
        return () => (
            <div onClick={handleClick}>
                <input type="text" v-model={a.value} />
                <p>{counter.count}</p>
                <p>{ login.ccc}</p>
            </div>
        )
    }
})