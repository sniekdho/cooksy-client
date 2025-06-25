const Newsletter = () => {
  return (
    <section className="bg-accent/10 py-16">
      <div className="max-w-2xl mx-auto text-center px-4">
        <h2 className="text-3xl text-secondary font-bold mb-4">Stay Updated</h2>
        <p className="text-lg text-base-content/70 mb-6">
          Subscribe to get the latest recipes and tips.
        </p>
        <form className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            placeholder="Your email"
            className="input input-bordered flex-grow"
            required
          />
          <button type="submit" className="btn btn-primary">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
