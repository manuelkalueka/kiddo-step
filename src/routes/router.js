import React from "react";
import LoadingComponent from "../../src/components/LoadingComponent";

import { useAuth } from "../contexts/auth";
// ----------- Stacks ---------------------
import AuthRoutes from "./stack.auth.routes";
import TabRoutes from "../routes/tab.routes";
import KiddoRouter from "./stack.config.kiddo.routes";
//-----------------------------------------------

export function Router() {
  const { signed, loading, user } = useAuth();

  // const isActive = !!user.isActive;

  if (loading) {
    return <LoadingComponent />;
  } else {
    return signed ? <KiddoRouter /> : <AuthRoutes />;
  }
}
