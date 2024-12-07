import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { IoSchoolOutline } from 'react-icons/io5';
import { MdOutlineClass } from 'react-icons/md';
import styles from '../page.module.css';

const CourseCard = ({ course }) => {
  return (
    <div className={styles.courseCard}>
      <Image
        src={course.imgurl}
        alt={course.title}
        width={200}
        height={100}
        className={styles.courseCardImage}
      />
      <div>
        <Link href={`/student/${course._id}`}>
          <p className={styles.courseCardTitle}>{course.title}</p>
        </Link>
        <div className={styles.courseCardInfo}>
          <MdOutlineClass className={styles.courseCardInfoIcon} />
          <span>
            class{' '}
            {course.class.min === course.class.max
              ? `${course.class.min}`
              : `${course.class.min}-${course.class.max}`}
          </span>
        </div>
        <div className={styles.courseCardInfo}>
          <IoSchoolOutline className={styles.courseCardInfoIcon} />
          <span>{course.instructor}</span>
        </div>
        <p className={styles.courseCardDescription}>{course.about}</p>
      </div>
    </div>
  );
};

export default CourseCard;
