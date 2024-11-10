import React from 'react';
import { FiDownload } from 'react-icons/fi';
import { OnRun } from 'src/api/OnRun';
import SmallError from 'src/components/smallError';
import SmallLoader from 'src/components/SmallLoader';
import { useParams } from 'react-router-dom';
import useDocumentation from '../service/use-documentation';

const Documentation = () => {
  const { traceCode } = useParams();
  const { data: documents, isLoading, error } = useDocumentation(traceCode);
  if (isLoading) {
    return <SmallLoader />;
  }

  if (error) {
    return <SmallError label="خطا در برقراری اتباط" />;
  }

  if (!documents) {
    return <SmallError label="مستندات یافت نشد" />;
  }

  return (
    <div className="p-4 bg-white">
      {documents.map((item, index) => (
        <div
          key={index}
          className="flex justify-between items-center mb-4 p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out"
        >
          <div>
            <p className="text-lg font-semibold text-gray-800">{item.title}</p>
          </div>
          <div className="flex gap-4">
            <a
              href={`${OnRun}${item.file}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 flex items-center hover:text-blue-800 text-sm font-medium transition-colors duration-200 ease-in-out"
            >
              دانلود فایل
              <FiDownload className="w-5 h-5 ml-2" />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Documentation;
