/* eslint-disable import/no-extraneous-dependencies */
import SvgColor from 'src/services/svg-color';
import { MdDashboard } from 'react-icons/md';
import { GoProjectRoadmap } from 'react-icons/go';
import { PiCertificateFill } from "react-icons/pi";

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'داشبورد',
    path: '/',
    icon: <MdDashboard className="text-2xl" />,
  },
  {
    title: 'پروفایل',
    path: '/ProfilePage',
    icon: icon('ic_blog'),
  },

  {
    title: 'ایجاد و پیگیری طرح',
    path: '/card',
    icon: icon('ic_analytics'),
  },
  {
    title: 'مشاهده طرح ها',
    path: '/plans',
    icon: <GoProjectRoadmap className="text-2xl" />,
  },
  {
    title: 'گواهی مشارکت',
    path: '/certificate',
    icon: <PiCertificateFill className="text-2xl" />,
  },
];

export default navConfig;
