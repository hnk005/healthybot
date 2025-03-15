import { PanelLeftClose, Edit, Search } from "lucide-react";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar = ({ open, onClose }: SidebarProps) => {
  return (
    <div
      className={`${
        open ? "flex flex-col" : "hidden"
      } w-64 h-full bg-gray-200 shadow-lg`}
    >
      <div className='flex items-center justify-between px-2 py-3 h-16'>
        <div>
          <button
            className='p-2 rounded-full hover:bg-gray-300'
            onClick={onClose}
          >
            <PanelLeftClose className='w-6 h-6 text-gray-400' />
          </button>
        </div>
        <div>
          <button className='p-2 rounded-full hover:bg-gray-300'>
            <Search className='w-6 h-6 text-gray-400' />
          </button>
          <button className='p-2 rounded-full hover:bg-gray-300'>
            <Edit className='w-6 h-6 text-gray-400' />
          </button>
        </div>
      </div>
      {/* Nút đóng */}

      {/* Nội dung sidebar */}
      <div className='mt-8 p-4 h-full'>
        <p className='text-xs font-semibold'>Hôm nay</p>
        <ul className='mt-4 space-y-2 text-sm'>
          <li className='p-2 bg-primary text-white rounded-2xl'>
            Tôi bị đau đầu
          </li>
          <li className='p-2 hover:bg-gray-300 rounded-2xl'>Tôi bị sốt</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
