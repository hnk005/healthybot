import { Suspense, lazy } from "react";
import { AuthProvider } from "./providers/Auth.provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import Loading from "./components/base/Loader";
import { HistoryChatProvider } from "./providers/HistoryChat.provider";

const queryClient = new QueryClient();
const Layout = lazy(() => import("./layout"));
const Page = lazy(() => import("./page"));

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <HistoryChatProvider>
          <Suspense fallback={<Loading />}>
            <Layout>
              <Page />
              <ToastContainer style={{ zIndex: 99999, position: "fixed" }} />
            </Layout>
          </Suspense>
        </HistoryChatProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
