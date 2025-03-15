import InputChat from "./components/section/InputChat";

const Page = () => {
  return (
    <div className='w-full h-full px-4 flex justify-center'>
      <div className='min-w-[768px] max-md:min-w-full flex items-center'>
        <InputChat></InputChat>
      </div>
    </div>
  );
};

export default Page;
