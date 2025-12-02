import AppRouter from "./router/AppRouter.jsx";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return <AuthProvider><AppRouter/>;
</AuthProvider>
}