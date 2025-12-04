const PublicFooter = () => {
  return (
    <footer className="bg-gray-100 py-6 text-center text-gray-600">
      <p>© {new Date().getFullYear()} BusBuddy</p>

      <div className="mt-3 flex justify-center gap-6">
        <a href="/about" className="hover:text-orange-600">About</a>
        <a href="/contact" className="hover:text-orange-600">Contact</a>
        <a href="/privacy-policy" className="hover:text-orange-600">Privacy Policy</a>
      </div>
    </footer>
  );
};

export default PublicFooter;
