'use client'
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import styles from '../app/page.module.css';

export default function NewsPanel() {
  const [news, setNews] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'news'), orderBy('date', 'desc'), limit(showAll ? 20 : 5));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newsItems = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: new Date(doc.data().date).toLocaleDateString('pt-BR')
      }));
      setNews(newsItems);
    });
    return () => unsubscribe();
  }, [showAll]);

  return (
    <div className={styles.newsPanel}>
      <h3>📢 Latest Updates</h3>
      {news.map(item => (
        <div key={item.id} className={styles.newsItem}>
          <div className={styles.newsHeader}>
            <span className={styles.newsDate}>{item.date}</span>
            <div className={styles.newsBullet}></div>
          </div>
          <p>{item.content}</p>
        </div>
      ))}
      <button 
        className={styles.newsButton}
        onClick={() => setShowAll(!showAll)}
      >
        {showAll ? '▲ Close' : '▼ Show More'}
      </button>
    </div>
  );
}