import React, { useState } from 'react';
import axios from 'axios';

function CourseForm({ setCourses }) {
  const [title, setTitle] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Hello from CourseForm.jsx');
    axios.post('http://127.0.0.1:8000/api/courses/', { title, course_code: courseCode, description })
      .then(response => {
        console.log('Course added:', response.data);
        setCourses(prev => [...prev, response.data]);
        setTitle('');
        setCourseCode('');
        setDescription('');
      })
      .catch(error => console.error('Error adding course:', error));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md" style={{marginLeft:'35vw',marginTop:'15vh'}}>
      <input 
        value={title} 
        onChange={e => setTitle(e.target.value)} 
        placeholder="Course title" 
        className="mb-4 w-full p-2 border border-gray-300 rounded-md"
        style={{backgroundColor:'white'}}
      />
      <input 
        value={courseCode} 
        onChange={e => setCourseCode(e.target.value)} 
        placeholder="Course code" 
        className="mb-4 w-full p-2 border border-gray-300 rounded-md"
        style={{backgroundColor:'white'}}
      />
      <textarea 
        value={description} 
        onChange={e => setDescription(e.target.value)} 
        placeholder="Course description" 
        className="mb-4 w-full p-2 border border-gray-300 rounded-md"
      />
      <button 
        type="submit" 
        disabled={!title || !courseCode} 
        className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Add course
      </button>
    </form>
  );
}

export default CourseForm;
