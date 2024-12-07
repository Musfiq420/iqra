import db from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/utils/auth';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { addFileNo, topicList, totalFileNo } from '@/app/utils/functions';

import styles from './page.module.css';
import Sidebar from './components/sidebar';
import ContentRenderer from './components/content';

const getFileIndex = (chapters, nodeId) => {
  const res = chapters.find((e) => e.id.toString() === nodeId);
  return res.fileNo;
};

const Node = async ({ params }) => {
  const course = await db.collection('courses').findOne({ _id: new ObjectId(params.course) });
  const nodes = await db.collection('nodes').find({ course: params.course }).toArray();
  const chapter = await db.collection('nodes').findOne({ _id: new ObjectId(params.node) });

  const session = await getServerSession(authOptions);
  const student = session
    ? await db.collection('students').findOne({ email: session.user.email })
    : null;

  const chapters = topicList(nodes, null, 0, []);
  const chaptersFinal = addFileNo(chapters);
  const fileNo = getFileIndex(chaptersFinal, params.node);

  const completed = student
    ? student.courses && student.courses[params.course]
      ? student.courses[params.course]
      : 0
    : -1;

  const addCourseProgress = async () => {
    'use server';
    if (completed <= fileNo) {
      await db.collection('students').updateOne(
        { email: session.user.email },
        {
          $set: {
            [`courses.${params.course}`]: completed + 1,
          },
        }
      );
    }
    revalidatePath(`/student/${params.course}`);
    redirect(`/student/${params.course}`);
  };

  if (!chapter.data) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '100px',
        }}
      >
        <p>No Cards added</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Sidebar Component */}
      <Sidebar
        course={course}
        chaptersFinal={chaptersFinal}
        completed={completed}
        params={params}
      />

      {/* Content Renderer */}
      <ContentRenderer
        chapter={chapter}
        params={params}
        chaptersFinal={chaptersFinal}
        addCourseProgress={addCourseProgress}
      />
    </div>
  );
};

export default Node;
