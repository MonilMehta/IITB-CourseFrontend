import React, { useEffect,useState } from 'react';
import axios from 'axios';
import CourseModal from '../components/instanceModal';

function CourseInstanceList({ instances, setInstances, fetchInstances }) {
  const [selectedInstance, setSelectedInstance] = useState(null);

  useEffect(() => {
    fetchInstances();  // Call fetchInstances when the component mounts
  }, [fetchInstances]);

  const openModal = (instance) => {
    setSelectedInstance(instance);
  };

  const closeModal = () => {
    setSelectedInstance(null);
  };

  const handleDeleteInstance = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/instances/${id}/`)
      .then(response => {
        setInstances(prev => prev.filter(instance => instance.id !== id));
      })
      .catch(error => console.error('Error deleting instance:', error));
  };

  return (
    <div className="flex justify-center items-center min-h-screen mt-10">
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-semibold mb-4 text-center" style={{marginLeft:'250px'}}>List of Course Instances</h2>
        <table className="min-w-full bg-white border border-black-200 rounded-lg w-full mt-10" style={{marginLeft:'10vw'}}>
          <thead>
            <tr className="bg-blue-500 text-white" style={{ border: '1px solid black' }}>
              <th className="text-left py-3 px-4">Course Title</th>
              <th className="text-left py-3 px-4">Year-Sem</th>
              <th className="text-left py-3 px-4">Code</th>
              <th className="text-center py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {instances.map(instance => (
              <tr key={instance.id} className="border-t border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-4" style={{ border: '1px solid black' }}>{instance.course_title}</td>
                <td className="py-3 px-4" style={{ border: '1px solid black' }}>{instance.year}-{instance.semester}</td>
                <td className="py-3 px-4" style={{ border: '1px solid black' }}>{instance.course_code}</td>
                <td className="py-3 px-4 text-center" style={{ border: '1px solid black' }}>
                  <button
                    onClick={() => openModal(instance)}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                    title="View Instance"
                  >
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi-NqtsqEwIuN1le9yryUWyDfxlScyQmRosQ&s"
                      style={{ width: '20px', height: '20px' }}
                      alt="View"
                    />
                  </button>
                  <button
                    onClick={() => handleDeleteInstance(instance.id)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete Instance"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="w-5 h-5 inline-block"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <CourseModal course={selectedInstance} onClose={closeModal} />
      </div>
    </div>
  );
}

export default CourseInstanceList;
