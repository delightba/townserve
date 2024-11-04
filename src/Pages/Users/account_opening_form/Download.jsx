// Download.jsx
import React from 'react';
import TM001 from './TM001';
import TM002 from './TM002';
import PageTwoContent from './Page2TM001';

const Download = ({ targetRef }) => {
 return (
  <div ref={targetRef} className='flex flex-col gap-8'>
   <div>
    <TM001 />
   </div>
   <br />
   <div>
    <PageTwoContent />
   </div>
   <br />
   <div>
    <TM002 />
   </div>
  </div>
 );
};

export default Download;
