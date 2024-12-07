'use client';
import React from 'react';

import styles from '../page.module.css';
import Rendering from './rendering';
import RenderingQuiz from './rendering quiz';

const ContentRenderer = ({ chapter, params, chaptersFinal, addCourseProgress }) => {
  return (
    <div className={styles.content}>
      {chapter.type === 'file' ? (
        <Rendering
          data={chapter.data.content}
          params={params}
          chapters={chaptersFinal}
          currentNode={params.node}
          addCourseProgress={addCourseProgress}
          chapter={chapter}
        />
      ) : (
        <RenderingQuiz
          data={chapter.data.content}
          params={params}
          chapters={chaptersFinal}
          currentNode={params.node}
          addCourseProgress={addCourseProgress}
          chapter={chapter}
        />
      )}
    </div>
  );
};

export default ContentRenderer;
