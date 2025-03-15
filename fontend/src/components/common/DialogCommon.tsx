import { ReactElement, ReactNode } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface DialogCommonProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

const DialogCommon = ({
  open,
  onClose,
  children,
}: DialogCommonProps): ReactElement => {
  return (
    <Transition show={open} as='div'>
      <Dialog
        onClose={onClose}
        className='fixed inset-0 z-[9999] flex items-center justify-center'
      >
        {/* Overlay */}
        <Transition.Child
          enter='transition-opacity duration-300 ease-out'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='transition-opacity duration-200 ease-in'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-50' />
        </Transition.Child>

        {/* Nội dung Dialog */}
        <Transition.Child
          enter='transition-transform duration-300 ease-out'
          enterFrom='scale-90 opacity-0'
          enterTo='scale-100 opacity-100'
          leave='transition-transform duration-200 ease-in'
          leaveFrom='scale-100 opacity-100'
          leaveTo='scale-90 opacity-0'
        >
          <Dialog.Panel className='bg-white rounded-lg shadow-lg p-6 max-w-md w-full z-[9999]'>
            {children}
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default DialogCommon;
