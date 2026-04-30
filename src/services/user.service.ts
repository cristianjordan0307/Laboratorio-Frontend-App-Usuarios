import { USERS_API_URL } from "@/lib/api";
import { ApiResponse, User, UserPayLoad } from "@/types/user";

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    ...init,
  });

  const text = await response.text();
  const body = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error(
      body?.message ?? `La API respondio con estado ${response.status}.`
    );
  }

  if (body && typeof body === "object" && "success" in body) {
    const apiBody = body as ApiResponse<T>;
    if (!apiBody.success) {
      throw new Error(apiBody.message ?? "La operacion no fue exitosa.");
    }
    return apiBody.data;
  }

  return body as T;
}

export const usersService = {
  getAll(): Promise<User[]> {
    return request<User[]>(USERS_API_URL);
  },

  getById(id: number): Promise<User> {
    return request<User>(`${USERS_API_URL}/${id}`);
  },

  create(payload: UserPayLoad): Promise<User> {
    return request<User>(USERS_API_URL, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  update(id: number, payload: UserPayLoad): Promise<User> {
    return request<User>(`${USERS_API_URL}/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  },

  delete(id: number): Promise<void> {
    return request<void>(`${USERS_API_URL}/${id}`, {
      method: "DELETE",
    });
  },
};