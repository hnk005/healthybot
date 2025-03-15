import { ReactElement, ReactNode, useState } from "react";
import Header from "./components/layout/Header";

// import Sidebar from "./components/layout/Sidebar";

const Layout = ({ children }: { children: ReactNode }): ReactElement => {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <>
      <div className='flex flex-row h-[100vh]'>
        {/* <Sidebar open={showSidebar} onClose={() => setShowSidebar(false)} /> */}
        <div className='w-full h-full z-9999'>
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
