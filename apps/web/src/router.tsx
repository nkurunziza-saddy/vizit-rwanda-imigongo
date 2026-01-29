import { createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import pkg from "react-helmet-async";
const { HelmetProvider } = pkg;
import * as TanstackQuery from "./integrations/tanstack-query/root-provider";

// Import i18n config (initializes i18n)
import "./lib/i18n";

import { routeTree } from "./routeTree.gen";
import { AuthProvider } from "./context/auth-context";
import { WishlistProvider } from "./context/wishlist-context";
import { ToastProvider } from "./components/notifications";

export const getRouter = () => {
  const rqContext = TanstackQuery.getContext();

  const router = createRouter({
    routeTree,
    context: { ...rqContext },
    defaultPreload: "intent",
    Wrap: (props: { children: React.ReactNode }) => {
      return (
        <HelmetProvider>
          <AuthProvider>
            <WishlistProvider>
              <TanstackQuery.Provider {...rqContext}>
                <ToastProvider />
                {props.children}
              </TanstackQuery.Provider>
            </WishlistProvider>
          </AuthProvider>
        </HelmetProvider>
      );
    },
  });

  setupRouterSsrQueryIntegration({
    router,
    queryClient: rqContext.queryClient,
  });

  return router;
};
