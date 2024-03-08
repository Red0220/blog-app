import {createSlice} from '@reduxjs/toolkit'
const initialState ={
    theme: 'light',
};

const themeSice = createSlice({
    name: 'theme',
    initialState,
    reducers : {
        toggleTheme : (state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light'
        },
    },
});

export const { toggleTheme} = themeSice.actions;
export default themeSice.reducer ;
