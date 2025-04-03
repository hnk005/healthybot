import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVertical, Trash, Pencil } from "lucide-react";

const Action = ({ onDelete, onChange }) => {
  return (
    <Menu as='div' className='relative text-right'>
      <Menu.Button className='p-1 rounded-full flex items-center justify-center'>
        <EllipsisVertical className='w-4 h-4' />
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
        <Menu.Items className='absolute right-0 top-0 mt-2 p-2 min-w-max bg-gray-400 border rounded-lg shadow-lg focus:outline-none z-[9999]'>
          {/* Mỗi button nằm trong một Menu.Item riêng biệt */}
          <Menu.Item>
            {({ close }) => (
              <button
                onClick={() => {
                  onChange();
                  close();
                }}
                className='flex flex-row gap-2 items-center w-full px-4 py-2 text-sm text-white hover:bg-slate-500 rounded-lg'
              >
                <Pencil className='w-5 h-5 mr-2' />
                Đổi tên
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ close }) => (
              <button
                onClick={() => {
                  onDelete();
                  close();
                }}
                className='flex items-center gap-2 w-full px-4 py-2 text-sm text-red-700 font-semibold hover:bg-slate-500 rounded-lg'
              >
                <Trash className='w-5 h-5 mr-2' />
                Xóa
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Action;
