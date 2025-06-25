const Contact = () => {
  return (
    <section className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-primary mb-4">Contact Us</h2>
      <p className="mb-4 text-gray-700">
        Need help or have a question? Reach out to us!
      </p>
      <ul className="text-lg space-y-2">
        <li>
          Email:{" "}
          <a href="mailto:sniekdho@gmail.com" className="text-accent">
            sniekdho@gmail.com
          </a>
        </li>
        <li>
          Phone: <span className="text-accent">+880 1717 910578</span>
        </li>
        <li>
          Facebook:{" "}
          <a
            href="https://www.facebook.com/sniekdho.shafiq/"
            target="_blank"
            className="text-accent"
          >
            facebook.com/sniekdho.shafiq
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Contact;
