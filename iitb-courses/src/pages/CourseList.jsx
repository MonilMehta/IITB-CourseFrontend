import React, { useState } from 'react';
import CourseModal from '../components/courseModal';
import axios from 'axios';

function CourseList({ courses }) {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const openModal = (course) => {
    setSelectedCourse(course);
  };

  const closeModal = () => {
    setSelectedCourse(null);
  };
  const handleDeleteCourse = (id) => {
    console.log('Delete course with id:', id);
    axios.delete(`http://127.0.0.1:8000/api/courses/{id}/`)
      .then(response => {
        console.log('Course deleted:', response.data);
        // Remove the course from the list of courses
        setCourses(prev => prev.filter(course => course.id !== id));
      })
      .catch(error => console.error('Error deleting course:', error));

  };

  return (
    <div className="flex justify-center items-center min-h-screen mt-10">
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-semibold mb-4 text-center" style={{ marginLeft: '10vw' }}>List of Courses</h2>
        <table className="min-w-full bg-white border border-black-200 rounded-lg" style={{ width: '60vw', marginTop: '50px', border: '1px solid black' }}>
          <thead style={{ border: '1px solid black' }}>
            <tr className="bg-blue-500 text-white" style={{ border: '1px solid black' }}>
              <th className="text-left py-3 px-4">Course Title</th>
              <th className="text-left py-3 px-4">Code</th>
              <th className="text-center py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course.id} className="border-t border-gray-200 hover:bg-gray-100" style={{ border: '1px solid black' }}>
                <td className="py-3 px-4" style={{ width: '60%' }}>{course.title}</td>
                <td className="py-3 px-4" style={{ border: '1px solid black' }}>{course.course_code}</td>
                <td className="py-3 px-4 text-center" style={{ border: '1px solid black' }}>
                  <button
                    onClick={() => openModal(course)}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                    title="View Course"
                  >
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi-NqtsqEwIuN1le9yryUWyDfxlScyQmRosQ&s"
                      style={{ width: '20px', height: '20px' }}
                      className="w-5 h-5 inline-block"
                      alt="View"
                    />
                  </button>
                  <button
                    onClick={() => handleDeleteCourse(course.id)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete Course"
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

        <CourseModal course={selectedCourse} onClose={closeModal} />
      </div>
    </div>
  );
}

export default CourseList;
