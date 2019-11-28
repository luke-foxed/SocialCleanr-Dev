import Dashboard from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';
import Home from './views/SidebarPages/Home';
import Profile from './views/SidebarPages/Profile';

const DashboardRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: Dashboard,
    component: Home
  },
  {
    path: '/profile',
    name: 'Profile',
    icon: Person,
    component: Profile
  }
];
