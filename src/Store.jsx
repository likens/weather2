import create from 'solid-zustand';

export const useAppStore = create((set, get) => ({

    geolocationData: undefined,
    loading: false,

    actions: {
        appReset: () => {
            console.log("resetting...");
            set(({
                geolocationData: undefined,
                queryData: undefined
            }))
        },
        setGeolocationData: (data) => {
            console.log("setGeolocationData", data);
            set(({geolocationData: data}))
        },
        setQueryData: (data) => {
            console.log("setQueryData", data);
            set(({queryData: data}))
        },
        setLoading: (loading) => {
            console.log("setLoading", loading);
            set(({loading: loading}))
        }
    }

}));

// state
export const useGeolocationData = () => useAppStore((state) => state.geolocationData);
export const useLoading = () => useAppStore((state) => state.loading);

// actions
export const useAppActions = () => useAppStore((state) => state.actions);