import { defineStore } from "pinia";

interface User {
  id: string;
  avatar: string;
  nickname: string;
  account: string;
  mobile: string;
  token: string;
}
interface Profile {
  profile: User;
}
export default defineStore("user", {
  state: (): Profile => {
    return {
      profile: {
        id: "",
        avatar: "",
        nickname: "",
        account: "",
        mobile: "",
        token: "",
      },
    };
  },
  getters: {
    getUser(): User {
      console.log(this);
      return this.profile;
    },
  },
  persist: true,
});
