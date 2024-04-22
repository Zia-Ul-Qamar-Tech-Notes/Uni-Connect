import { faHome, faCalendarAlt, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";

export const headerLinks = [
  {
    label: 'Home',
    route: '/',
    icon: faHome,
  },
  {
    label: 'Create Event',
    route: '/events/create',
    icon: faCalendarAlt,
  },
  {
    label: 'Admin',
    route: '/profile',
    icon: faUser,
  },
];

export const clientHeaderLinks = [
  {
    label: 'Home',
    route: '/',
    icon: faHome,
  },
  {
    label: 'All Event',
    route: '/allevents',
    icon: faCalendarAlt,
  },
  {
    label: 'My Profile',
    route: '/profile',
    icon: faUser,
  },
];

export const eventDefaultValues = {
  title: '',
  description: '',
  location: '',
  imageUrl: '',
  startDateTime: new Date(),
  endDateTime: new Date(),
  categoryId: '',
  price: '',
  isFree: false,
  url: '',
};
