import { AuthContextProvider } from "@/context/AuthContext";

export default function AdminLayout({ children }) {
  return (
    <AuthContextProvider>
      {children}
    </AuthContextProvider>
  );
}
