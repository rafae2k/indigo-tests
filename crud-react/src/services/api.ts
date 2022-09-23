import axios from 'axios';

import { IHero } from '../types';

const api = axios.create({
  baseURL: 'http://localhost:3001'
})

export const getHeroById = (id: number) => api.get<IHero>(`/heroes/${id}`)

export const getAllHeroes = () => api.get<IHero[]>(`/heroes`)

export const insertHero = (payload: Omit<IHero, 'id'>) =>
  api.post(`/heroes`, payload)

export const updateHeroById = (id: number, payload: Omit<IHero, 'id'>) =>
  api.patch(`/heroes/${id}`, payload)

export const deleteHeroById = (id: number) => api.delete(`/heroes/${id}`)
