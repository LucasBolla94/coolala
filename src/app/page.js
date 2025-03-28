'use client'
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { FaX, FaDiscord } from 'react-icons/fa6';
import NewsPanel from '@/components/NewsPanel';
import styles from './page.module.css';

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
            <div className={styles.statBox}>
              <span>Date Mint</span>
              <h2>{mintDate}</h2>
            </div>
            <div className={styles.statBox}>
              <span>Next Mint</span>
              <h2>{mintAmount.toLocaleString()} COOL</h2>
            </div>
            <div className={styles.statBox}>
              <span>CoolAla Treasury</span>
              <h2>${walletBalance.toLocaleString()}</h2>
              <div className={styles.subText}>
                Actively earning in LP pools<br/>
                +{(walletBalance*0.003).toLocaleString()} daily
              </div>
            </div>
          </div>

          <div className={styles.socialLinks}>
            <a href="LINK_X" target="_blank" rel="noopener noreferrer">
              <FaX className={styles.xIcon} />
            </a>
            <a href="LINK_DISCORD" target="_blank" rel="noopener noreferrer">
              <FaDiscord className={styles.icon} />
            </a>
          </div>

          <div className={styles.mission}>
            <h2>🚀 The CoolAla Ecosystem Revolution</h2>
            <div>
              <p>
                We evolved from meme coin to Solana's first <strong>community-driven hedge fund</strong>. Here's why you should join:
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
            <img src="/images/coingecko.png" alt="CoinGecko" />
          </a>
        </div>
        <p>© 2024 CoolAla DAO - Solana's Productive Economy Protocol</p>
      </footer>
    </div>
  );
}