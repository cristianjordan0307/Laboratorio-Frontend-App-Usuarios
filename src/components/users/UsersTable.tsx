"use client";

import { Edit2, Trash2, UserX } from "lucide-react";
import type { User } from "@/types/user";

type UsersTableProps = {
  users: User[];
  isLoading: boolean;
  onRefresh: () => Promise<void>; 
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
};

export function UsersTable({
  users,
  isLoading,
  onRefresh,
  onEdit,
  onDelete,
}: UsersTableProps) {
  // Mostramos un mensaje visual si la lista esta vacia y no estamos cargando.
  if (!isLoading && users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 py-12 text-center">
        <UserX className="mb-3 text-slate-400" size={40} />
        <h3 className="text-sm font-medium text-slate-900">No hay usuarios</h3>
        <p className="mt-1 text-sm text-slate-500">
          Comienza creando uno nuevo en el formulario.
        </p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Edad</th>
              <th className="px-4 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {users.map((user) => (
              <tr
                key={user.id}
                className="group transition-colors hover:bg-slate-50"
              >
                <td className="whitespace-nowrap px-4 py-3 font-medium text-slate-600">
                  #{user.id}
                </td>
                <td className="whitespace-nowrap px-4 py-3 font-semibold text-slate-900">
                  {user.name}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                  {user.email}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                  {user.age} años
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onEdit(user)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                      title="Editar usuario"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(user.id)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                      title="Eliminar usuario"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Overlay de carga para cuando la API esta trabajando. */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-[1px]">
          <div className="flex items-center gap-3 rounded-full bg-white px-4 py-2 shadow-lg border border-slate-100">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-emerald-600 border-t-transparent" />
            <span className="text-sm font-medium text-slate-700">
              Cargando...
            </span>
          </div>
        </div>
      )}
    </div>
  );
}