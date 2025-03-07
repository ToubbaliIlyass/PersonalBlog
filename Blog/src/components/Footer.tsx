import logo from "../assets/logo.png";
import { FaYoutube, FaInstagram, FaTiktok, FaLinkedinIn } from "react-icons/fa";
import Newsletter from "./Newsletter";
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
      <social.icon className="text-black" />
    </a>
  ));
  return (
    // <div className=" container flex flex-col p-7">
    //   <div className="w-ful mx-auto max-w-[500px] flex-row items-center justify-center">
    //     <img src={logo} alt="logo" />

    //     <div className="pt-7  flex  justify-between gap-4 items-center">
    //       {icons}
    //     </div>
    //   </div>
    //   <Newsletter />
    // </div>

    <footer className="w-full ">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-[500px] mx-auto">
          <img src={logo} alt="logo" className="w-full" />
          <div className="pt-7 flex justify-center gap-4">{icons}</div>
        </div>
        <Newsletter />
      </div>
    </footer>
  );
};

export default Footer;
