export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-row">
        <div className="footer-col">
          <div className="footer-title">Get to Know Us</div>
          <a href="#">About</a>
          <a href="#">Careers</a>
          <a href="#">Press</a>
        </div>
        <div className="footer-col">
          <div className="footer-title">Make Money with Us</div>
          <a href="#">Sell products</a>
          <a href="#">Become an affiliate</a>
          <a href="#">Advertise your products</a>
        </div>
        <div className="footer-col">
          <div className="footer-title">Let Us Help You</div>
          <a href="#">Your Account</a>
          <a href="#">Shipping Rates</a>
          <a href="#">Returns & Replacements</a>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">© {new Date().getFullYear()} Amazon Clone (Portfolio)</div>
      </div>
    </footer>
  )
}
