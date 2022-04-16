import makeStore from "./makeStore";

const {Provider, useStore} =  makeStore<string>();

export const ErrorMessageProvider = Provider;
export const useErrorMessageStore = useStore;