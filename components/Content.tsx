import { useState } from 'react';

import HistoriesList from '../pages/histoClinix/histories/index';

import CitasList from './Citas/index';

// const Content: React.FC = () => {
const Content = (): JSX.Element => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="container p-1 ">
      {loading ? (
        <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900" />
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row top-0">
          <div
            className="relative  mb-1 overflow-hidden lg:mb-0 sm:h-64 lg:h-auto lg:flex-grow"
            style={{
              backgroundImage:
                'url("bg-map.png"), linear-gradient(90deg, rgba(118,171,255,0.1) 0%, rgba(118,171,255,0.4) 40%, rgba(118,171,255,0.4) 60%, rgba(118,171,255,0.1) 100%)',
            }}
          />
          <div className="divide-y-2 divide-dashed md:divide-solid">
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
          </div>
          <div
            className="relative  mb-1 overflow-hidden lg:mb-0 sm:h-64 lg:h-auto lg:flex-grow"
            style={{
              backgroundImage:
                'url("bg-map.png"), linear-gradient(90deg, rgba(118,171,255,0.1) 0%, rgba(118,171,255,0.4) 40%, rgba(118,171,255,0.4) 60%, rgba(118,171,255,0.1) 100%)',
            }}
          />
        </div>
      )}
    </div>
  );
};
export default Content;
