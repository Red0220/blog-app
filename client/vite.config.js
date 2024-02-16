import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  
proxy :{
  '/server' :{
    target: 'localhost:3000',
    secure: false ,
  },
},
  plugins: [react()],
})
