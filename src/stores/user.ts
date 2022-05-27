import { defineStore } from "pinia";

interface User {
  id?: string | number;
  avatar?: string;
  nickname?: string;
  account?: string;
  mobile?: string;
  token?: string;
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
      return this.profile;
    },
  },
  actions: {
    setProfile(payload: User) {
      this.profile = payload;
    },
  },
  persist: true,
});
