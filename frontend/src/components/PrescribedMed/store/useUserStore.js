import { create } from "zustand";

const initialState = {
  selectedUser: null,
  isSendEmailModalOpen: false,
};

const store = (set) => ({
  ...initialState,
  setSelectedUser: (user) => set({ selectedUser: user }),
  openSendEmailModal: () => set({ isSendEmailModalOpen: true }),
  closeSendEmailModal: () => set({ isSendEmailModalOpen: false }),
});

export const useUserStore = create(store, "userStore");