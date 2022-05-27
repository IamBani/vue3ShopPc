import { useIntersectionObserver } from "@vueuse/core";
import { ref } from "vue";
import { CallbackFunction } from "@/http/request";
export const useLazyData =<T=any>(apiFn?: CallbackFunction) => {
  const target = ref(null);
  const result = ref<T[]>([]);
    const { stop } = useIntersectionObserver(
      target,
      ([{ isIntersecting }]) => {
        if (isIntersecting) {
          stop();
          apiFn &&
            apiFn().then((res) => {
              result.value = res.result;
            });
        }
      },
      {
        threshold: 0,
      }
    );
  return { target, result };
};
