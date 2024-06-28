import axios from "axios";
import { IUserProfile, DataItem } from "../types";

const API_URL = `${process.env.REACT_APP_API_URL || "http://localhost:3000/api"}/users`;

console.log(process.env.REACT_APP_API_URL)
export const getAllProfiles = async (): Promise<IUserProfile[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getProfileById = async (id: string): Promise<IUserProfile> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createProfile = async (profile: IUserProfile): Promise<IUserProfile> => {
  const response = await axios.post(API_URL, profile);
  return response.data;
};

export const updateProfile = async (id: string, profile: IUserProfile): Promise<IUserProfile> => {
  const response = await axios.put(`${API_URL}/${id}`, profile);
  return response.data;
};

export const deleteProfile = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};

// Generates a large array of data items for demonstration purposes, do not need to modify.
export const generateDataItems = (page: number, size: number): DataItem[] => {
    const offset = page * size;
    return Array.from({ length: size }, (v, k) => ({
      id: offset + k,
      value: `Item ${offset + k}`,
      number: Math.floor(Math.random() * 100),
    }));
  };