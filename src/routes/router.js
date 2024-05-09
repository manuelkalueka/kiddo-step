import React from "react";
import LoadingComponent from "../../src/components/LoadingComponent";

import { useAuth } from "../contexts/auth";
import { KiddoProvider } from "../contexts/kiddo";
// ----------- Stacks ---------------------
import AuthRoutes from "./stack.auth.routes";
import TabRoutes from "../routes/tab.routes";
import KiddoRouter from "./stack.config.kiddo.routes";

export function Router() {
  const { signed, loading, isActive } = useAuth();

  if (loading) {
    return <LoadingComponent />;
  } else {
    return signed ? (
      <KiddoProvider>
        {isActive ? <TabRoutes /> : <KiddoRouter />}
      </KiddoProvider>
    ) : (
      <AuthRoutes />
    );
  }
}
