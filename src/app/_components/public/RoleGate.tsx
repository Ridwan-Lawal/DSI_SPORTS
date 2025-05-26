import { useGetUser } from "@/src/app/_hooks/useGetUser";
import React from "react";

export default function RoleGate({ children }: { children: React.ReactNode }) {
  const { user } = useGetUser();

  if (user?.role === "admin") {
    return <div>{children}</div>;
  }
}
