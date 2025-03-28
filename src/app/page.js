'use client'
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { FaX, FaDiscord } from 'react-icons/fa6';
import NewsPanel from '@/components/NewsPanel';
import styles from './page.module.css';
import Image from 'next/image';

export default function Home() {
  const [walletBalance, setWalletBalance] = useState(0);
  const [mintDate, setMintDate] = useState('');
  const [mintAmount, setMintAmount] = useState(0);

  useEffect(() => {
    const q = query(collection(db, 'metrics'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.forEach((doc) => {
        const data = doc.data();
        setWalletBalance(data.walletBalance);
        setMintDate(data.nextMintDate.toDate().toLocaleDateString());
        setMintAmount(data.mintAmount);
      });
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.spaceBackground}>
        <div className={styles.moon}></div>
        <div className={styles.stars}></div>
        
        <div className={styles.content}>
          <h1 className={styles.title}>CoolAla 🐨</h1>

          <div className={styles.statsContainer}>
            {/* ... restante do código estatístico ... */}
          </div>

          <div className={styles.mission}>
            <h2>🚀 The CoolAla Ecosystem Revolution</h2>
            <div>
              <p>
                We evolved from meme coin to Solana&apos;s first <strong>community-driven hedge fund</strong>. Here&apos;s why you should join:
              </p>

              
              <div className={styles.highlights}>
                <div className={styles.bullet}>
                  <div className={styles.glowBullet}></div>
                  <span>💼 <strong>Daily Revenue Generation:</strong><br/>
                  Our $250k+ treasury actively earns through:<br/>
                  - LP Fees (Raydium & Orca)<br/>
                  - Yield Farming Strategies<br/>
                  - Arbitrage Opportunities</span>
                </div>

                <div className={styles.bullet}>
                  <div className={styles.glowBullet}></div>
                  <span>🎯 <strong>Value Distribution:</strong><br/>
                  70% of profits fund:<br/>
                  - Staking Rewards (APY 45-68%)<br/>
                  - Buyback Program<br/>
                  - Strategic Burns</span>
                </div>

                <div className={styles.bullet}>
                  <div className={styles.glowBullet}></div>
                  <span>🔐 <strong>Sustainable Growth:</strong><br/>
                  30% reinvested to:<br/>
                  - Expand LP Positions<br/>
                  - Develop New Products<br/>
                  - Partnerships</span>
                </div>
              </div>

              <div className={styles.cta}>
                <strong>Be part of Web3's first profitable DAO!</strong><br/>
                Every $COOL holder earns through:<br/>
                ↗️ Price Appreciation<br/>
                🏦 Staking Dividends<br/>
                🔥 Deflationary Mechanics
              </div>
            </div>
          </div>

          <NewsPanel />
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={styles.coingecko}>
          <a href="LINK_COINGECKO" target="_blank" rel="noopener noreferrer">
            <Image
              src="/images/coingecko.png"
              alt="CoinGecko"
              width={200}
              height={50}
              priority
            />
          </a>
        </div>
        <p>© 2024 CoolAla DAO - Solana&apos;s Productive Economy Protocol</p>
      </footer>
    </div>
  );
}