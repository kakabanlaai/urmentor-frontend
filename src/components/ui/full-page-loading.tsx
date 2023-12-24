import { ClipLoader } from 'react-spinners';

const FullPageLoading = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <ClipLoader color={'#094849'} size={60} />
    </div>
  );
};
export default FullPageLoading;
