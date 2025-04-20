import { useRouter } from 'next/router';
import styles from '../../styles/Help.module.css';

export default function HelpPage() {
  const router = useRouter();
  const { slug } = router.query;

  const renderContent = () => {
    if (!slug) {
      return (
        <div>
          <h2 className={styles.h2}>Welcome to the Help Section!</h2>
          <p className={styles.p}>
            Here you can find answers to frequently asked questions, contact us for support, or read our privacy policy.
          </p>
        </div>
      );
    }

    switch (slug[0]) {
      case 'faqs':
        return (
          <div>
            <h2 className={styles.h2}>Frequently Asked Questions</h2>
            <ul className={styles.ul}>
              <li className={styles.li}><strong>Q:</strong> How do I create an account?</li>
              <li className={styles.li}><strong>A:</strong> Click on the "Sign Up" button on the homepage and follow the instructions.</li>
              <li className={styles.li}><strong>Q:</strong> How can I reset my password?</li>
              <li className={styles.li}><strong>A:</strong> Go to the login page and click "Forgot Password" to reset it.</li>
              <li className={styles.li}><strong>Q:</strong> How do I contact support?</li>
              <li className={styles.li}><strong>A:</strong> Visit the Contact page for more details.</li>
            </ul>
          </div>
        );
      case 'contact':
        return (
          <div>
            <h2 className={styles.h2}>Contact Us</h2>
            <p className={styles.p}>
              Need help? Reach out to us at:
              <br />
              <strong>Email:</strong> support@cineverse.com
              <br />
              <strong>Phone:</strong> +1-800-555-1234
              <br />
              <strong>Address:</strong> 123 Cineverse Lane, Movie City, CA
            </p>
          </div>
        );
      case 'privacy':
        return (
          <div>
            <h2 className={styles.h2}>Privacy Policy</h2>
            <p className={styles.p}>
              Your privacy is important to us. We collect minimal data to provide you with the best experience. For more
              details, please read our full privacy policy on our website.
            </p>
            <p className={styles.p}>
              <strong>What we collect:</strong> Name, email, and usage data.
              <br />
              <strong>How we use it:</strong> To improve your experience and provide support.
            </p>
          </div>
        );
      default:
        return <p className={styles.p}>Help topic not found. Please check the URL or go back to the Help Center.</p>;
    }
  };

  return (
    
    <div className={styles.container}>
       {/* Back Button */}
       <div className={styles.backButtonWrapper}>
        <button className={styles.backButton} onClick={() => router.push('/')}>
          ← Back
        </button>
      </div>
      <div className={styles.card}>
        <h1 className={styles.heading}>Help Center</h1>
        {renderContent()}
      </div>
    </div>
  );
}
