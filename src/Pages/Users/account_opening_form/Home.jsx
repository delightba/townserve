import React, { useEffect, useRef, useState } from 'react'
import TM001 from './TM001';
import PageTwoContent from './Page2TM001';
import TM002 from './TM002';



const Home = ({ pdf }) => {
  const [currentStage, setCurrentStage] = useState(1);
  const containerRef = useRef(null);

  const handleNextStage = () => {
    setCurrentStage((prevStage) => prevStage + 1);
  };

  const handlePreviousStage = () => {
    setCurrentStage((prevStage) => Math.max(prevStage - 1, 1));
  };

  useEffect(() => {
    containerRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [currentStage]);


  const renderStage = () => {
    switch (currentStage) {
      case 1:
        return <TM001 />;
      case 2:
        return <PageTwoContent />;
      case 3:
        return <TM002 />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-[1300px] my-4 mx-auto border-2 shadow-xl flex flex-col gap-3" ref={containerRef}>
      {renderStage()}
      <div className="mt-4 ml-auto mx-3 my-3">
        {currentStage > 1 && (
          <button onClick={handlePreviousStage} className="back">
            Previous
          </button>
        )}
        {currentStage < 3 && (
          <button onClick={handleNextStage} className="next">
            Next
          </button>
        )}
        {currentStage === 3 && (
          <button onClick={pdf} className="back !bg-green-500">
            Submit
          </button>
        )}
      </div>
    </div>
  );
}

export default Home