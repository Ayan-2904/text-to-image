function Footer() {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} AI Image Studio
      </p>

      <span>
        Built with React, Node.js, MongoDB & AI
      </span>
    </footer>
  );
}

export default Footer;