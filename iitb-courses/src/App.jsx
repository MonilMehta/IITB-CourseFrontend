import React, { useState, useEffect,useCallback } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CourseForm from './pages/CourseForm';
import CourseList from './pages/CourseList';
import CourseInstanceForm from './pages/CourseInstanceForm';
import CourseInstanceList from './pages/CourseInstanceList';
import HomePage from './pages/HomePage';
import Navigation from './components/Navbar';

function App() {
  const [courses, setCourses] = useState([]);
  const [instances, setInstances] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Fetch courses when the component mounts
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/courses/')
      .then((response) => setCourses(response.data))
      .catch((error) => console.error('Error fetching courses:', error));
  }, []);

  // Fetch instances when the component mounts or when `fetchInstances` is called
  const fetchInstances = useCallback(() => {
    axios.get('http://127.0.0.1:8000/api/getinstances/')
      .then(response => {
        setInstances(response.data);
      })
      .catch(error => console.error('Error fetching instances:', error));
  }, [setInstances]);

  return (
    <Router>
      <Navigation />

      <Routes>
        <Route 
          exact 
          path="/" 
          element={<HomePage />} 
        />
        <Route 
          path="/courses" 
          element={<CourseList courses={courses} setSelectedCourse={setSelectedCourse} />} 
        />
        <Route 
          path="/course-instances" 
          element={<CourseInstanceList instances={instances} fetchInstances={fetchInstances} />} 
        />
        <Route 
          path="/add-course" 
          element={<CourseForm setCourses={setCourses} />} 
        />
        <Route 
          path="/add-course-instance" 
          element={<CourseInstanceForm selectedCourse={selectedCourse} fetchInstances={fetchInstances} />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
