import MobileNav from "@/components/layout/MobileNav";
export default function ContactPage() {
  return (
    <div className="pb-20 lg:pb-0 max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-heading font-bold text-[#f0b429] mb-6">📬 Contact Us</h1>
      <div className="bg-[#0f1520] border border-[#ffffff0f] rounded-xl p-6 space-y-6">
        <div>
          <h3 className="text-white font-bold text-lg mb-2">📧 Email Support</h3>
          <p className="text-gray-400 text-sm">Reach out to our support team anytime:</p>
          <a href="mailto:binaryalexx@gmail.com" className="text-[#f0b429] text-lg font-bold hover:underline">binaryalexx@gmail.com</a>
        </div>
        <div className="border-t border-[#ffffff0f] pt-4">
          <h3 className="text-white font-bold text-lg mb-2">⏰ Response Time</h3>
          <p className="text-gray-400 text-sm">We typically respond within 24 hours. For urgent matters, please include &quot;URGENT&quot; in your subject line.</p>
        </div>
        <div className="border-t border-[#ffffff0f] pt-4">
          <h3 className="text-white font-bold text-lg mb-2">💬 Live Chat</h3>
          <p className="text-gray-400 text-sm">Live chat support is available Monday - Friday, 9 AM - 6 PM EAT.</p>
        </div>
        <div className="border-t border-[#ffffff0f] pt-4">
          <h3 className="text-white font-bold text-lg mb-2">📍 Location</h3>
          <p className="text-gray-400 text-sm">EdgeCore Casino<br/>Nairobi, Kenya</p>
        </div>
      </div>
      <MobileNav />
    </div>
  );
}