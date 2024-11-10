import { BsCloudUploadFill } from 'react-icons/bs';
import { OnRun } from 'src/api/OnRun';
import { handleFileRemove } from '../utils/removeUploadFiles';

export const renderFileSection = (fileKey, label, linkText, localData, setLocalData) => (
  <div className="mb-6">
    <label htmlFor="text" className="block text-right text-gray-700 text-sm font-medium">
      {label}:
    </label>
    {localData[fileKey] ? (
      <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-inner">
        {typeof localData[fileKey] === 'string' ? (
          <a
            href={localData[`Lock_${fileKey}`] ? null : `${OnRun}/${localData[fileKey]}`}
            onClick={(e) => localData[`Lock_${fileKey}`] && e.preventDefault()}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-sm font-medium ${
              localData[`Lock_${fileKey}`] ? 'text-gray-400' : 'text-blue-600 hover:text-blue-800'
            }`}
          >
            {linkText}
          </a>
        ) : (
          <span className="text-sm font-medium text-gray-800">{localData[fileKey].name}</span>
        )}
        <button
          type="button"
          className="text-red-400 hover:text-red-600 disabled:text-gray-200 ml-4"
          onClick={() => handleFileRemove(fileKey, setLocalData)}
          disabled={localData[`Lock_${fileKey}`]}
        >
          حذف
        </button>
      </div>
    ) : (
      <div className="flex items-center rounded-lg shadow-lg p-3 bg-gray-100">
        <label
          htmlFor={`uploadfile_${fileKey}`}
          className="block text-right text-gray-700 text-sm font-medium"
        >
          انتخاب فایل
          <BsCloudUploadFill className="ml-2" />
          <input
            id={`uploadfile_${fileKey}`}
            name={fileKey}
            type="file"
            onChange={(e) => {
              setLocalData({
                ...localData,
                [fileKey]: e.target.files[0],
              });
            }}
            disabled={localData[`Lock_${fileKey}`]}
            className="hidden"
          />
        </label>
        <span className="ml-4 mr-8 text-sm">
          {localData[fileKey] ? localData[fileKey].name : 'هیچ فایلی انتخاب نشده'}
        </span>
      </div>
    )}
  </div>
);
