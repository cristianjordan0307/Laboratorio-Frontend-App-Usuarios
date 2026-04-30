// Este tipo representa un usuario completo recibido desde la api
export type User = {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Este tipo representa los datos que se envian al crear (POST) o actualizar (PUT) un usuario.
export type UserPayLoad = {
  name: string;
  email: string;
  age: number;
}

// Este tipo respresenta la estructura general de respuesta de la API. Generica T
export type ApiResponse<T> = {
    success: boolean;
    data: T;
    message?: string;
}
