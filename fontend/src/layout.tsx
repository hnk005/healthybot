import { ReactElement, ReactNode, useState } from "react";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import { useAuth } from "./hooks/useAuth";
import Loading from "./components/base/Loader";

const Layout = ({ children }: { children: ReactNode }): ReactElement => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { isLoading } = useAuth();

  if (isLoading) return <Loading></Loading>;
  return (
    <>
      <div className='flex flex-row h-[100vh]'>
        <Sidebar open={showSidebar} onClose={() => setShowSidebar(false)} />
        <div className='flex flex-col w-full h-full z-9999 justify-between'>
          <Header
            showSidebar={showSidebar}
            openSidebar={() => setShowSidebar(true)}
          />
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
