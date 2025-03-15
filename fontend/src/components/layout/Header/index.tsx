import { /*PanelLeftOpen*/ Edit } from "lucide-react";
import logo from "@/assets/image/logo/logo.png";
// import avatar from "@/assets/image/avatar/avatar.jpg";

interface HeaderProps {
  showSidebar: boolean;
  openSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ showSidebar /*openSidebar*/ }) => {
  return (
    <div className='fixed flex w-full items-center justify-between px-2 py-3 h-16'>
      {/* Left Section */}
      <div className='flex items-center gap-2'>
        <div style={{ display: showSidebar ? "none" : "flex" }}>
          {/* <button
            className='p-2 rounded-full hover:bg-gray-200'
            onClick={openSidebar}
          >
            <PanelLeftOpen className='w-6 h-6 text-gray-400' />
          </button> */}
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
      {/* <div>
        <img
          src={avatar}
          alt='User Avatar'
          className='w-10 h-10 rounded-full border'
        />
      </div> */}
      <div className='flex items-center space-x-2'>
        <button className='text-black font-medium px-4 py-2 rounded-full hover:bg-slate-200'>
          Đăng nhập
        </button>
        <button className='bg-primary text-white font-medium px-4 py-2 rounded-full hover:opacity-70'>
          Đăng ký
        </button>
      </div>
    </div>
  );
};

export default Header;
