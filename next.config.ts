import type { NextConfig } from "next";

//Next recibe llamadas en /api/users y las reenvia a la api real.
// Esto permite que en el frontend corre en el puerto 3001 y la API en el 3000
const nextConfig: NextConfig = {
  async rewrites(){
    const userApiTarget =
    process.env.USERS_API_TARGET ?? "http://localhost:3000/api/users";
    
    return [
      {
        source: "/api/user",
        destination: userApiTarget,
      },
      {
        source: "/api/users/:path*",
        destination: `${userApiTarget}/:path*`,
      }
    ];
  }
};

export default nextConfig;
