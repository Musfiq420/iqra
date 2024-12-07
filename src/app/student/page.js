import db from '@/lib/mongodb';
import React from 'react';
import CourseList from './components/courseList';
import styles from './page.module.css';

const Student = async () => {
  const courses = await db.collection("courses").find({ published: true }).toArray();

  return (
    <div className={styles.studentContainer}>
      <div>
        <p className={styles.browseTitle}>Browse Courses</p>
      </div>
      <CourseList courses={courses} />
    </div>
  );
};

export default Student;
