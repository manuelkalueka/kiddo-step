import React from "react";
import LoadingComponent from "../../src/components/LoadingComponent";

import { useAuth } from "../contexts/auth";
import { useKiddo, KiddoProvider } from "../contexts/kiddo";
// ----------- Stacks ---------------------
import AuthRoutes from "./stack.auth.routes";
import TabRoutes from "../routes/tab.routes";
import KiddoRouter from "./stack.config.kiddo.routes";
//-----------------------------------------------
function AppRouterStrategy() {
  const { isActive } = useAuth();
  const { setted } = useKiddo();

  //Primeiro Uso, definir criança setted && user.isActive
  return <TabRoutes />;
}
export function Router() {
  const { signed, loading } = useAuth();

  if (loading) {
    return <LoadingComponent />;
  } else {
    return signed ? (
      <KiddoProvider>
        <AppRouterStrategy />
      </KiddoProvider>
    ) : (
      <AuthRoutes />
    );
  }
}
