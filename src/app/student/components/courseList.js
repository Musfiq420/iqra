'use client';

import React, { useEffect, useState } from 'react';
import CourseCard from './courseCard';
import styles from '../page.module.css';

const CourseList = ({ courses }) => {
  const [filterCourses, setFilteredCourses] = useState(courses);
  const [selectedClass, setSelectedClass] = useState(6);

  useEffect(() => {
    const tempCourses = courses.filter(
      (e) => e.class.min <= selectedClass && e.class.max >= selectedClass
    );
    setFilteredCourses(tempCourses);
  }, [selectedClass]);

  return (
    <div>
      <div className={styles.courseFilter}>
        {[6, 7, 8, 9, 10, 11, 12].map((e) => (
          <div
            key={e}
            onClick={() => setSelectedClass(e)}
            className={`${styles.filterButton} ${
              selectedClass === e
                ? styles.filterButtonSelected
                : styles.filterButtonDefault
            }`}
          >
            Class {e}
          </div>
        ))}
      </div>
      <div className={styles.courseGrid}>
        {filterCourses.map((e) => (
          <CourseCard key={e._id} course={e} />
        ))}
      </div>
    </div>
  );
};

export default CourseList;
