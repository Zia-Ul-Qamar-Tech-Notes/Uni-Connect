import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center">
          <Link href="/">
            <span className="flex items-center gap-2">
              <span className="text-lg font-semibold">Uni-Connect - All Rights Reserved</span>
            </span>
          </Link>
          <div className="ml-6 flex gap-4">
            <Link href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} size="2x" />
            </Link>
            <Link href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} size="2x" />
            </Link>
            <Link href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </Link>
          </div>
        </div>
        <div className="flex gap-8">
          <Link href="/allevents">
            <span className="text-lg font-medium flex items-center gap-2">
              <FontAwesomeIcon icon={faCalendarAlt} /> All Events
            </span>
          </Link>
          <Link href="/search">
            <span className="text-lg font-medium flex items-center gap-2">
              <FontAwesomeIcon icon={faSearch} /> Search
            </span>
          </Link>
          <Link href="/profile">
            <span className="text-lg font-medium flex items-center gap-2">
              <FontAwesomeIcon icon={faUser} /> Profile
            </span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;