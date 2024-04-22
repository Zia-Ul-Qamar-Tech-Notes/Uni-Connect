import { clientHeaderLinks, headerLinks } from '@/constants';
import Link from 'next/link';
import React from 'react';
import { auth } from "@clerk/nextjs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCalendarAlt, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';

const NavItems = () => {
  const { sessionClaims } = auth();
  const adminEmail = "zia.softwareprogrammer@gmail.com";
  const userEmail = sessionClaims?.primaryEmail as string;

  const navLinks = userEmail === adminEmail ? headerLinks : clientHeaderLinks;

  const getIcon = (label: string) => {
    switch (label) {
      case 'Home':
        return faHome;
      case 'Create Event':
        return faCalendarAlt;
      case 'All Event':
        return faCalendarAlt;
      case 'Search':
        return faSearch;
      case 'Admin':
        return faUser;
      case 'My Profile':
        return faUser;
      default:
        return null;
    }
  };

  return (
    <ul className="md:flex-between flex w-full flex-col items-start gap-10 md:flex-row">
      {navLinks.map((link) => {
        const Icon = getIcon(link.label);

        return (
          <li
            key={link.route}
            className={`flex-center p-medium-16 whitespace-nowrap`}
          >
            <Link href={link.route}>
              <span className="flex items-center gap-2">
                {Icon && <FontAwesomeIcon icon={Icon} />}
                <span>{link.label}</span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems;
