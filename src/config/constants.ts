import type { LanyardData } from 'react-use-lanyard';

export const SITE_URL = (() => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL &&
    process.env.NEXT_PUBLIC_SITE_URL.trim() !== ''
      ? process.env.NEXT_PUBLIC_SITE_URL
      : // If not set, check for NEXT_PUBLIC_VERCEL_URL, which is automatically set by Vercel.
        process?.env?.NEXT_PUBLIC_VERCEL_URL &&
          process.env.NEXT_PUBLIC_VERCEL_URL.trim() !== ''
        ? process.env.NEXT_PUBLIC_VERCEL_URL
        : // If neither is set, default to localhost for local development.
          'http://localhost:3000/';

  url = url.replace(/\/+$/, '');

  return url.includes('http') ? url : `https://${url}`;
})();

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

  // Wenn der Geburtsmonat noch nicht erreicht wurde oder
  // wenn der Geburtsmonat gleich ist, aber der Tag noch nicht erreicht wurde
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}

export const ABOUT = `Hi, I'm Ardelan Yamanel, an ${getAge(2006, 2, 23)}-year-old developer from Berlin. I've been coding for almost 3 years, and I'm particularly passionate about web development. I'm always eager to learn new programming languages and expand my skill set. When I'm not coding, you'll find me cycling around the city or working out at the gym.`;

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
