export const USERS_API_URL =process.env.NEXT_PUBLIC_USERS_API_URL ?? '/api/users';


// Normaliza errores desconocidos para mostrar en el form.
export function getApiErrorMessage(error: unknown){
    if (error instanceof Error) {
        return error.message;
    }
    return "Ocurrio un error inesperado";
}