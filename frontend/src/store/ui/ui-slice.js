import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
    name: 'ui',
    initialState: { pending: false, notification: null },
    reducers: {
        toggle(state) {
            state.dataIsVisible = !state.dataIsVisible;
        },
        dataPending(state, action) {
            state.pending = action.payload.pending
        },
    },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;