import { AxiosResponse } from 'axios';
import { api } from 'src/boot/axios';

export interface IAddress {
  id: number;
  endereco: string;
  especialidade: string;
  medico: string;
}

export async function getAdresses(search: string) {
  const result = await api
    .get(`enderecos/busca?especialidade=${search}`)
    .then((response: AxiosResponse<IAddress[]>) => {
      return response.data;
    });

  return result;
}
