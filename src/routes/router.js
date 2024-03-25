import React from "react";
import LoadingComponent from "../../src/components/LoadingComponent";

import { useAuth } from "../contexts/auth";
// ----------- Stacks ---------------------
import AuthRoutes from "./stack.auth.routes";
import TabRoutes from "../routes/tab.routes";
//-----------------------------------------------

export function Router() {
  const { signed, loading } = useAuth();

  if (loading) {
    // COLOCAR O EXPO SPLASH SCREEN
    return <LoadingComponent />;
  }

  return signed ? <TabRoutes /> : <AuthRoutes />;
}
