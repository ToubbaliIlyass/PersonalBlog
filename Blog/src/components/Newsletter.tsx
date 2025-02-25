import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api } from "@/services/api";

const NewsletterSection = () => {
  const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailInput = e.currentTarget.elements.namedItem(
      "email"
    ) as HTMLInputElement;
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      alert("Please enter your email");
      return;
    }

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    try {
      await api.addemail(email);

      // Show success alert
      alert("You have been subscribed successfully!");

      // Clear input field
      emailInput.value = "";
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert("Failed to subscribe. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-3xl p-10 max-w-4xl mx-auto flex flex-col md:flex-row gap-10">
      {/* Left Side (Title & Text) */}
      <div className="flex-1">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
          Subscribe to <span className="font-special">MyJourney</span>
        </h2>
      </div>

      {/* Right Side (Form) */}
      <div className="flex-1">
        <p className="text-gray-700 text-lg mb-3">
          I will be sharing my life in its rawest form. No filters, just the
          real journey.
        </p>

        <form
          onSubmit={handlesubmit}
          className="flex items-center bg-gray-100 rounded-full p-2 "
        >
          <Input
            type="email"
            name="email"
            placeholder="Your email"
            className="flex-1 bg-transparent text-gray-700 border-none outline-none focus:ring-0"
          />
          <Button
            type="submit"
            className="bg-[#5dccf1] hover:bg-[#7dd3fc]/90 text-white rounded-full px-6 py-3"
          >
            Subscribe
          </Button>
        </form>

        <p className="text-xs text-gray-500 mt-3">
          By submitting this form, you’ll be signed up to my free newsletter.
          See our{" "}
          <a href="#" className="text-blue-500 underline">
            privacy policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default NewsletterSection;
