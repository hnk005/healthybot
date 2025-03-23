import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { UserRound, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const User = () => {
  const { logout } = useAuth();
  return (
    <Menu as='div' className='relative inline-block text-left'>
      <Menu.Button className='p-2 rounded-full border flex items-center justify-center'>
        <UserRound className='w-8 h-8' />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute right-0 mt-2 w-48 bg-red-500 border rounded-lg shadow-lg focus:outline-none'>
          <Menu.Item>
            {
              <button
                onClick={logout}
                className='flex items-center w-full px-4 py-2 text-sm text-white hover:opacity-70'
              >
                <LogOut className='w-4 h-4 mr-2' />
                Đăng xuất
              </button>
            }
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default User;
