interface NavigationItem {
  title: string;
  url: string;
  external?: boolean;
}

const navigation: NavigationItem[] = [
  {
    title: 'Home',
    url: '/'
  },
  {
    title: 'About',
    url: '/about/'
  },
  {
    title: 'Services',
    url: '/services/'
  },
  {
    title: 'Contact',
    url: '/contact/'
  }
];

export default navigation;