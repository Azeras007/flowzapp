import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const people = [
  {
    id: 'person',
    name: 'Eliot',
    role: 'Backend Developer',
    avatar: 'https://www.shadcnblocks.com/images/block/avatar-1.webp',
  },
  {
    id: 'person',
    name: 'Louis',
    role: 'Web Developer',
    avatar: 'https://www.shadcnblocks.com/images/block/avatar-4.webp',
  },
  {
    id: 'person',
    name: 'Victor',
    role: 'Backend Developer',
    avatar: 'https://www.shadcnblocks.com/images/block/avatar-2.webp',
  },
  {
    id: 'person',
    name: 'Marc-Andrea',
    role: 'App Developer',
    avatar: 'https://www.shadcnblocks.com/images/block/avatar-3.webp',
  },
  {
    id: 'person',
    name: 'Antoine',
    role: 'App Developer',
    avatar: 'https://www.shadcnblocks.com/images/block/avatar-5.webp',
  },
];

const Team = () => {
  return (
    <section className="py-32">
      <div className="container flex flex-col items-center text-center">
        <h2 className="my-6 text-pretty text-2xl font-bold lg:text-4xl">
          Meet our team
        </h2>
        <p className="mb-8 max-w-3xl text-muted-foreground lg:text-xl">
            We’re a passionate group of developers and designers dedicated to
            creating powerful automation tools. Our mission is to simplify
            workflows and deliver reliable, innovative solutions.
        </p>
      </div>
      <div className="container mt-16 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-4">
        {people.map((person) => (
          <div key={person.id} className="flex flex-col items-center">
            <Avatar className="mb-4 size-20 border md:mb-5 lg:size-24">
              <AvatarImage src={person.avatar} />
              <AvatarFallback>{person.name}</AvatarFallback>
            </Avatar>
            <p className="text-center font-medium">{person.name}</p>
            <p className="text-center text-muted-foreground">{person.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Team;
