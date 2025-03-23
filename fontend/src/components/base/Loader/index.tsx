import { PuffLoader } from "react-spinners";

function Loading() {
  return (
    <div className='flex items-center justify-center h-screen'>
      <PuffLoader color='#00c8ff' size={100} />
    </div>
  );
}

export default Loading;
