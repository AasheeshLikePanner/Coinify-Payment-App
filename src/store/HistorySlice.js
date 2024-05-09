import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    history: []
};

const HistorySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        addInHistory: (state, action) => {
            state.history = action.payload;
        },
    }
});

export const { addInHistory } = HistorySlice.actions;

export default HistorySlice.reducer;
