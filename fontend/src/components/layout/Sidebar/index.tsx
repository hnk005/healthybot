import { useHistoryChat } from "@/hooks/useChatHistory";
import { PanelLeftClose, Edit, Search } from "lucide-react";
import Action from "./Action";
import { useState } from "react";
import DeleteDialog from "./DeleleDialog";
import ChangeDialog from "./ChangeDialog";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar = ({ open, onClose }: SidebarProps) => {
  const {
    history,
    currentChatId,
    chooseChat,
    handleNewChat,
    hadnleChangeTitle,
    hadnleDeleteChat,
  } = useHistoryChat();

  const [openChange, setOpenChange] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [currentItemDelete, setCurrentItemDelete] = useState("");
  const [currentItemChange, setCurrentItemChange] = useState("");
  const [currentTitleChange, setCurrentTitleChange] = useState("");

  const handleDelete = (chatId: string) => {
    setOpenDelete(true);
    setCurrentItemDelete(chatId);
  };

  const handleChange = (chatId: string, title: string) => {
    setOpenChange(true);
    setCurrentItemChange(chatId);
    setCurrentTitleChange(title);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setCurrentItemDelete("");
  };

  const handleCloseChange = () => {
    setOpenChange(false);
    setCurrentItemChange("");
    setCurrentTitleChange("");
  };

  return (
    <div
      className={`${
        open ? "flex flex-col" : "hidden"
      } min-w-56 max-w-56 h-full bg-gray-200 shadow-lg relative`}
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
          <button
            onClick={handleNewChat}
            className='p-2 rounded-full hover:bg-gray-300'
          >
            <Edit className='w-6 h-6 text-gray-400' />
          </button>
        </div>
      </div>
      {/* Nút đóng */}

      {/* Nội dung sidebar */}
      <div className='p-4 h-full w-full overflow-y-auto overscroll-x-hidden'>
        <ul className='mt-4 space-y-2 text-sm'>
          {history.map((h, index) => (
            <li
              key={index}
              onClick={() => chooseChat(h._id)}
              className={`p-2 ${
                currentChatId === h._id && "bg-primary text-white"
              } rounded-2xl cursor-pointer flex justify-between items-center hover:bg-gray-300`}
            >
              <span className='truncate block w-full'>{h.title}</span>
              <Action
                onDelete={() => handleDelete(h._id)}
                onChange={() => handleChange(h._id, h.title)}
              />
            </li>
          ))}
        </ul>
      </div>

      <DeleteDialog
        isOpen={openDelete}
        onClose={handleCloseDelete}
        onDelete={() => hadnleDeleteChat(currentItemDelete)}
      />
      <ChangeDialog
        title={currentTitleChange}
        isOpen={openChange}
        onClose={handleCloseChange}
        onChange={(newTitle: string) =>
          hadnleChangeTitle(currentItemChange, newTitle)
        }
      />
    </div>
  );
};

export default Sidebar;
