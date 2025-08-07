import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, Bookmark } from 'lucide-react';

interface PDFViewerProps {
  bookTitle: string;
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onClose: () => void;
}

const PDFViewer: React.FC<PDFViewerProps> = ({
  bookTitle,
  totalPages,
  currentPage,
  onPageChange,
  onClose
}) => {
  const [zoom, setZoom] = useState(100);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 25, 50));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 font-medium"
          >
            ← Back
          </button>
          <h1 className="text-lg font-semibold text-gray-900 truncate max-w-md">
            {bookTitle}
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={handleZoomOut}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
              disabled={zoom <= 50}
            >
              <ZoomOut className="h-4 w-4" />
            </button>
            <span className="text-sm text-gray-600 min-w-[4rem] text-center">
              {zoom}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
              disabled={zoom >= 200}
            >
              <ZoomIn className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded">
              <Bookmark className="h-4 w-4" />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded">
              <Download className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* PDF Content Area */}
      <div className="flex-1 bg-gray-800 flex items-center justify-center p-4">
        <div className="bg-white shadow-xl" style={{ transform: `scale(${zoom / 100})` }}>
          {/* Mock PDF Page - In a real app, you'd use react-pdf or similar */}
          <div className="w-[595px] h-[842px] bg-white p-8 text-gray-900">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-4">{bookTitle}</h1>
              <div className="w-full h-px bg-gray-300 mb-4"></div>
            </div>
            
            <div className="space-y-4 text-justify">
              <p>
                This is a mock PDF viewer showing page {currentPage} of {totalPages}. 
                In a real implementation, this would display the actual PDF content 
                using a library like react-pdf.
              </p>
              
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
                eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              
              <div className="mt-8 p-4 bg-gray-100 rounded">
                <h3 className="font-semibold mb-2">Chapter {currentPage}</h3>
                <p>This section would contain the actual book content for page {currentPage}.</p>
              </div>
            </div>
            
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-gray-500">
              Page {currentPage}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Controls */}
      <div className="bg-white border-t p-4">
        <div className="flex items-center justify-center space-x-6">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage <= 1}
            className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </button>

          <div className="flex items-center space-x-2">
            <input
              type="number"
              value={currentPage}
              onChange={(e) => {
                const page = parseInt(e.target.value);
                if (page >= 1 && page <= totalPages) {
                  onPageChange(page);
                }
              }}
              className="w-16 px-2 py-1 border border-gray-300 rounded text-center focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              min="1"
              max={totalPages}
            />
            <span className="text-gray-600">of {totalPages}</span>
          </div>

          <button
            onClick={handleNextPage}
            disabled={currentPage >= totalPages}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div
              className="bg-indigo-600 h-1 rounded-full transition-all duration-300"
              style={{ width: `${(currentPage / totalPages) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;