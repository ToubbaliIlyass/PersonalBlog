import logo from "../assets/logo.png";
import { FaYoutube, FaInstagram, FaTiktok, FaLinkedinIn } from "react-icons/fa";
const Footer = () => {
  const socialLinks = [
    {
      icon: FaYoutube,
      label: "YouTube",
      href: "#",
      ariaLabel: "Visit our YouTube channel",
    },
    {
      icon: FaInstagram,
      label: "Instagram",
      href: "#",
      ariaLabel: "Follow us on Instagram",
    },
    {
      icon: FaLinkedinIn,
      label: "LinkedIn",
      href: "#",
      ariaLabel: "Connect with us on LinkedIn",
    },
    {
      icon: FaTiktok,
      label: "TikTok",
      href: "#",
      ariaLabel: "Follow us on TikTok",
    },
  ];
  const icons = socialLinks.map((social, index) => (
    <a
      key={index}
      href={social.href}
      className="bg-[#F8F6F2] p-4 rounded-full hover:bg-[#f4a067] transition-colors duration-300 flex items-center justify-center"
      aria-label={social.ariaLabel}
    >
      <social.icon size={24} className="text-black" />
    </a>
  ));
  return (
    <div className=" container  h-[1000px] text- flex   p-7">
      <div className="w-1/2 mx-auto flex-row">
        <img src={logo} alt="logo" />

        <div className="p-7 flex w-full justify-between gap-4 items-center">
          {icons}
        </div>
      </div>
    </div>
  );
};

export default Footer;
