'use client';

import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebaseConfig';

export default function SupplyInfo() {
  const [supply, setSupply] = useState(null);

  useEffect(() => {
    async function fetchSupply() {
      const docRef = doc(db, 'supply', 'total');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setSupply(docSnap.data().value);
      }
    }
    fetchSupply();
  }, []);

  return (
    <section style={styles.section}>
      <h2 style={styles.title}>Supply Total</h2>
      <p style={styles.value}>
        {supply !== null ? `${supply.toLocaleString()} $COOL` : 'Carregando...'}
      </p>
    </section>
  );
}

const styles = {
  section: {
    padding: '30px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '16px',
    margin: '30px 40px',
  },
  title: {
    fontSize: '1.8rem',
    marginBottom: '10px',
    color: '#00ffcc',
  },
  value: {
    fontSize: '1.4rem',
  },
};
