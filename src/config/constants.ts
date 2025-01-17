import type { LanyardData } from 'react-use-lanyard';

export const SITE_URL = 'https://ardelanyamanel.com';

export const FIRST_NAME = 'Ardelan';
export const LAST_NAME = 'Yamanel';
export const FULL_NAME = `${FIRST_NAME} ${LAST_NAME}`;

export const BIRTHDAY = new Date(2006, 1, 23);

export const DESCRIPTION = 'Fullstack Developer';

function getAge(year: number, month: number, date: number) {
  const today = new Date();
  const birth = new Date(year, month - 1, date);

  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}

export const ABOUT = `Hi, I'm Ardelan Yamanel, an ${getAge(2006, 2, 23)}-year-old developer from Berlin. I've been coding for almost 3 years, with a strong focus on web development. I’m always keen to explore new programming languages and enhance my skills. When I'm not coding, I enjoy cycling around the city or working out at the gym.`;

export const GITHUB_NAME = 'ardelan869';
export const GITHUB_URL = `https://github.com/${GITHUB_NAME}`;
export const GITHUB_AVATAR_URL = `${GITHUB_URL}.png`;

// You have to join https://discord.gg/lanyard for this to work
export const DISCORD_USER_ID = '852630017404960848';
export const DISCORD_STATUS_COLOR: Record<
  LanyardData['discord_status'],
  string
> = {
  online: '#43b581',
  idle: '#faa61a',
  dnd: '#f04747',
  offline: 'grey'
};
