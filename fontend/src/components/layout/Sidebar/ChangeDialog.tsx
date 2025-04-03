import DialogCommon from "@/components/common/DialogCommon";
import { useEffect, useState } from "react";

const ChangeDialog = ({ isOpen, onClose, onChange, title }) => {
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    setNewTitle(title);
  }, [title]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onChange(newTitle);
    onClose();
  };

  return (
    <DialogCommon open={isOpen} onClose={onClose}>
      <div className='bg-gray-400 p-10 rounded-lg'>
        <h2 className='text-center text-white text-2xl font-bold'>
          Thay đổi tên
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            value={newTitle}
            required
            onChange={(e) => setNewTitle(e.target.value)}
            className='w-full p-2 mt-2 rounded-lg border border-gray-300'
            placeholder='Nhập tên mới'
          />
          <div className='mt-4 flex justify-end gap-2'>
            <button
              type='button'
              onClick={onClose}
              className='px-4 py-2 bg-gray-300 text-gray-700 rounded-lg'
            >
              Hủy
            </button>
            <button
              type='submit'
              className='px-4 py-2 bg-blue-500 text-white rounded-lg'
            >
              Xác nhận
            </button>
          </div>
        </form>
      </div>
    </DialogCommon>
  );
};

export default ChangeDialog;
