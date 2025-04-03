import DialogCommon from "@/components/common/DialogCommon";

const DeleteDialog = ({ isOpen, onClose, onDelete }) => {
  return (
    <DialogCommon open={isOpen} onClose={onClose}>
      <div className='bg-gray-400 p-10 rounded-lg'>
        <h2 className='text-center text-white text-2xl font-bold'>
          Xác nhận xóa
        </h2>
        <p className='text-gray-700'>Bạn có chắc chắn muốn xóa không?</p>
        <div className='mt-4 flex justify-end gap-2'>
          <button
            onClick={onClose}
            className='px-4 py-2 bg-gray-300 text-gray-700 rounded-lg'
          >
            Hủy
          </button>
          <button
            onClick={() => {
              onDelete();
              onClose();
            }}
            className='px-4 py-2 bg-red-500 text-white rounded-lg'
          >
            Xóa
          </button>
        </div>
      </div>
    </DialogCommon>
  );
};
export default DeleteDialog;
