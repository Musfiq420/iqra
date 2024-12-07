import Image from 'next/image';
import styles from './page.module.css';
import { getServerSession } from 'next-auth';
import { authOptions } from './utils/auth';
import Link from 'next/link';
import { SignInStudent } from './signIn';
import Anim from '../lib/anim.gif';

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.textSection}>
            <h1>
              ক্লাসের বোরিং পড়াগুলো<br /> শিখো এবার <span>খেলতে খেলতে</span>
            </h1>
            <p>
              Digital Platform for Islamic Education. Our aim is to provide distance education to 
              the muslims within the guidance of shariah. The platform to gain ilm for muslim ummah.
            </p>
            <div className={styles.actions}>
              {!session ? (
                <div>
                  <SignInStudent className={styles.button} />
                </div>
              ) : (
                <div style={{ color: 'gray' }}>
                  <p style={{ fontSize: 12 }}>Signed in as</p>
                  <p>{session.user.name}</p>
                </div>
              )}
              <Link href="/student">
                <div className={styles.goToCourses}>Go to courses</div>
              </Link>
            </div>
          </div>
          <div className={styles.imageWrapper}>
            <Image src={Anim} alt="Animation" width={300} height={300} />
          </div>
        </div>
      </main>
    </>
  );
}
