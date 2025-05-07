"use client"
import React, { useEffect, useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PdfDocument from './PdfDocument';
import { Button } from './ui/button';


const PDFGenerator = ({ input }) => {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])
  return (
    <div>
      {isClient && 
      <PDFDownloadLink document={<PdfDocument plan = {input} />} fileName={"Travel_Plan"}>
        {({ loading }) =>
          loading ? <Button>Loading...</Button> : <button className='bg-[#e24d2c] hover:bg-[#e24d2c] text-white px-8 py-2 rounded-full'>Generate PDF</button>
        }
      </PDFDownloadLink>
      }
    </div>
  );
};

export default PDFGenerator;





