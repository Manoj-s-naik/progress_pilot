import { useState } from 'react';

function LeftSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Button to open the sidebar */}
      <button
        onClick={toggleSidebar}
        className="p-2 bg-blue-500 text-white rounded fixed top-4 left-4 z-50"
      >
        Open Sidebar
      </button>

      {/* Sidebar (Left Sheet) */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transition-transform transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } z-40`}
      >
        {/* Sidebar content */}
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Sidebar Content</h2>
          <ul>
            <li className="mb-2">Menu Item 1</li>
            <li className="mb-2">Menu Item 2</li>
            <li className="mb-2">Menu Item 3</li>
          </ul>
          {/* Button to close sidebar */}
          <button
            onClick={toggleSidebar}
            className="mt-4 p-2 bg-red-500 text-white rounded"
          >
            Close Sidebar
          </button>
        </div>
      </div>

      {/* Overlay when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
}

export default LeftSidebar;
