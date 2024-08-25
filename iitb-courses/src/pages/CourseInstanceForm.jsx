import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CourseInstanceForm({ fetchInstances }) {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');

  useEffect(() => {
    // Fetch the list of courses when the component mounts
    axios.get('http://127.0.0.1:8000/api/courses/')
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCourse) {
      axios.post('http://127.0.0.1:8000/api/instances/', { year, semester, course: selectedCourse.id })
        .then(() => {
          setYear('');
          setSemester('');
          fetchInstances();
        })
        .catch(error => console.error('Error adding instance:', error));
    }
  };

  const handleCourseChange = (e) => {
    const selectedId = e.target.value;
    const selected = courses.find(course => course.id === parseInt(selectedId));
    setSelectedCourse(selected);
  };

  const refreshCourses = () => {
    axios.get('http://127.0.0.1:8000/api/courses/')
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => console.error('Error refreshing courses:', error));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md" style={{marginLeft:'35vw',marginTop:'15vh'}}>
      <div className="flex items-center justify-between w-full mb-4">
        <select onChange={handleCourseChange} className="p-2 border border-gray-300 rounded-md w-full" defaultValue="">
          <option value="" disabled>Select course</option>
          {courses.map(course => (
            <option key={course.id} value={course.id}>{course.title}</option>
          ))}
        </select>
        <button type="button" onClick={refreshCourses} className="ml-2 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Refresh
        </button>
      </div>
      <div className="flex space-x-4 w-full mb-4">
        <input 
          value={year} 
          onChange={e => setYear(e.target.value)} 
          placeholder="Year" 
          className="w-1/2 p-2 border border-gray-300 rounded-md"
          style={{backgroundColor:'white'}}
        />
        <input 
          value={semester} 
          onChange={e => setSemester(e.target.value)} 
          placeholder="Semester" 
          className="w-1/2 p-2 border border-gray-300 rounded-md"
          style={{backgroundColor:'white'}}
        />
      </div>
      <button 
        type="submit" 
        disabled={!selectedCourse} 
        className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Add instance
      </button>
    </form>
  );
}

export default CourseInstanceForm;
