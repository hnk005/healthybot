import { PanelLeftOpen, Edit } from "lucide-react";
import logo from "@/assets/image/logo/logo.png";
import { useState } from "react";
import DialogCommon from "@/components/common/DialogCommon";
import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";
import { useAuth } from "@/hooks/useAuth";
import User from "./User";

interface HeaderProps {
  showSidebar: boolean;
  openSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ showSidebar, openSidebar }) => {
  const { user } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const handleOpenLogin = () => {
    setShowLogin(true);
    setShowRegister(false);
    setShowModal(true);
  };

  const handleOpenRegister = () => {
    setShowRegister(true);
    setShowLogin(false);
    setShowModal(true);
  };

  return (
    <>
      <div className='fixed flex w-full items-center justify-between px-2 py-3 h-16'>
        {/* Left Section */}
        <div className='flex items-center gap-2'>
          <div style={{ display: showSidebar ? "none" : "flex" }}>
            {user && (
              <button
                className='p-2 rounded-full hover:bg-gray-200'
                onClick={openSidebar}
              >
                <PanelLeftOpen className='w-6 h-6 text-gray-400' />
              </button>
            )}
            <button className='p-2 rounded-full hover:bg-gray-200'>
              <Edit className='w-6 h-6 text-gray-400' />
            </button>
          </div>

          <div className='flex items-center gap-2 px-2'>
            <div className='w-9 h-9 rounded-full flex items-center justify-center'>
              <img src={logo} />
            </div>
            <span className='font-semibold text-black'>Healthybot</span>
          </div>
        </div>

        {/* Right Section */}
        {user ? (
          <User />
        ) : (
          <div className='flex items-center space-x-2'>
            <button
              className='text-black font-medium px-4 py-2 rounded-full hover:bg-slate-200'
              onClick={handleOpenLogin}
            >
              Đăng nhập
            </button>
            <button
              className='bg-primary text-white font-medium px-4 py-2 rounded-full hover:opacity-70'
              onClick={handleOpenRegister}
            >
              Đăng ký
            </button>
          </div>
        )}
      </div>
      <DialogCommon open={showModal} onClose={() => setShowModal(false)}>
        {showLogin && (
          <Login
            onClose={() => setShowModal(false)}
            openRegister={handleOpenRegister}
          />
        )}
        {showRegister && (
          <Register
            onClose={() => setShowModal(false)}
            onOpenLogin={handleOpenLogin}
          />
        )}
      </DialogCommon>
    </>
  );
};

export default Header;
