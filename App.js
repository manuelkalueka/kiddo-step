import { Router } from "./src/routes/router";
import { AuthProvider } from "./src/context/Auth"; //encapsular o App dentro dele para disponibilizar os dados para todas as telas

export default function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}
