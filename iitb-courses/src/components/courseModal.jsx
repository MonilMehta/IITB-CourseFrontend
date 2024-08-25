import React from 'react';

const CourseModal = ({ course, onClose }) => {
  if (!course) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">{course.title}</h2>
        <p className="mb-4"><strong>Code:</strong> {course.course_code}</p>
        <p><strong>Description:</strong> {course.description}</p>
        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseModal;
