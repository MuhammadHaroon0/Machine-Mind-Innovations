import { create } from "zustand";
import axios from "axios";


const useStore = create((set) => ({
  services: [],
  data: null,
  getAllServices: async () => {
console.log(process.env.REACT_APP_BACKEND_URL);
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/services`);
      set({ services: await response.data.data.doc });
    } catch (error) {
      throw error
    }
  },
  products: [],
  getAllProducts: async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/products`);
      set({ products: await response.data.data.doc });
    } catch (error) {
      throw error
    }
  },
  postLoginData: async (loginData) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/users/login`,
        loginData,{withCredentials:true}
        );      
        localStorage.setItem('role',response.data.data.role)
        await useStore.getState().getUserImage(response.data.data.id)
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  postSignUpData: async (signupData) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/users/signup`,
        signupData,{withCredentials:true}
      );
      set({ data: await response.data });
    } catch (error) {
      throw error;
    }
  },
  patchUpdatePassword: async (updateData) => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}/users/updatePassword`,
        updateData,{withCredentials:true}
        );
      } catch (error) {
      console.log(error);
      throw error;
    }
  },
  reviews:[],
  getAllReviews:async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/testimonials`,
      );
      set({ reviews: await response.data.data.doc });
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  isLoggedIn:false,
  setIsLoggedIn:(isLoggedIn)=>set({isLoggedIn}),

  postServiceData:async (serviceData) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/services/`,
        serviceData,{withCredentials:true}
      );
      
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  postProductData:async (productData) => {
    try {
       await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/products/`,
        productData,{withCredentials:true}
      );
      
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  patchUpdatePicture:async (picture) => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}/users/`,
        picture,{withCredentials:true}
      );
      
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  userImg:null,
  getUserImage:async(name)=>{
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/image/user/${name}`,
        {responseType: 'arraybuffer',withCredentials:true},
        
      );
      const fileBlob = new Blob([response.data]);
          set({userImg: URL.createObjectURL(fileBlob)}) 
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getServiceImage:async(name)=>{
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/image/service/${name}`, {
          
            responseType: 'arraybuffer', // Set the response type to 'arraybuffer'
          
        });
      
      return response
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  postForgotPassword:async(email)=>{
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/users/forgotPassword`, email);
      
      return response
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  patchResetPassword:async(token,data)=>{
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}/users/resetPassword/${token}`, data);
      
      console.log(response);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}));
export default useStore;
