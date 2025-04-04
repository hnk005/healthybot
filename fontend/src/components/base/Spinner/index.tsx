import { GridLoader } from "react-spinners";

function Spinnner() {
  return (
    <div className='flex items-center justify-center h-full'>
      <GridLoader color='#00c8ff' size={20} />
    </div>
  );
}

export default Spinnner;
