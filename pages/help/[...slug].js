import { useRouter } from 'next/router';
import styles from '../../styles/Help.module.css';

export default function HelpPage() {
  const router = useRouter();
  const { slug } = router.query;

  const renderContent = () => {
    if (!slug) {
      return (
        <div>
          <h2>Welcome to the Help Section!</h2>
          <p>
            Here you can find answers to frequently asked questions, contact us for support, or read our privacy policy.
          </p>
        </div>
      );
    }

    switch (slug[0]) {
      case 'faqs':
        return (
          <div>
            <h2>Frequently Asked Questions</h2>
            <ul>
              <li>Q: How do I create an account?</li>
              <li>A: Click on the "Sign Up" button on the homepage and follow the instructions.</li>
              <li>Q: How can I reset my password?</li>
              <li>A: Go to the login page and click "Forgot Password" to reset it.</li>
              <li>Q: How do I contact support?</li>
              <li>A: Visit the Contact page for more details.</li>
            </ul>
          </div>
        );
      case 'contact':
        return (
          <div>
            <h2>Contact Us</h2>
            <p>
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
            <h2>Privacy Policy</h2>
            <p>
              Your privacy is important to us. We collect minimal data to provide you with the best experience. For more
              details, please read our full privacy policy on our website.
            </p>
            <p>
              <strong>What we collect:</strong> Name, email, and usage data.
              <br />
              <strong>How we use it:</strong> To improve your experience and provide support.
            </p>
          </div>
        );
      default:
        return <p>Help topic not found. Please check the URL or go back to the Help Center.</p>;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.heading}>Help Center</h1>
        {renderContent()}
      </div>
    </div>
  );
}