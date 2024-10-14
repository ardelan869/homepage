import { ABOUT } from '@/config/constants';

import Transition from '@/components/transition';
import Listening from './(components)/listening';
import Activity from './(components)/activity';
import Skills from './(components)/skills';
import MDXBody from '@/components/mdx-body';

export default function Home() {
  return (
    <Transition className="flex flex-col gap-6 overflow-y-scroll px-4 pt-6">
      <section className="flex items-center justify-between">
        <Listening />
        <Activity />
      </section>

      <section className="flex flex-col justify-start gap-1">
        <h1 className="text-xl">My Skills</h1>
        <Skills />
      </section>

      <MDXBody className="text-center self-center text-muted-foreground">{ABOUT}</MDXBody>
    </Transition>
  );
}
