import { FaYoutube, FaApple, FaGithub, FaDiscord } from 'react-icons/fa';
import { RiNotionFill} from 'react-icons/ri';
import { SiGooglecalendar, SiGmail, SiOpenai } from 'react-icons/si';
const features = [
    {
        title: 'Apple',
        description:
            'Apple is a leading technology company known for designing innovative products like the iPhone, Mac, and iPad, along with its user-friendly software ecosystem.',
        icon: <FaApple className="h-5 w-5" />,
    },
    {
        title: 'Github',
        description:
            'GitHub is a platform for version control and collaboration, enabling developers to host, review, and manage code.',
        icon: <FaGithub className="h-5 w-5" />,
    },
    {
        title: 'Discord',
        description:
            'Discord is a communication platform designed for communities, offering voice, video, and text chat for seamless group interactions.',
        icon: <FaDiscord className="h-5 w-5" />,
    },
    {
        title: 'OpenAI',
        description:
            'OpenAI is an AI research and deployment company that develops advanced artificial intelligence models, including GPT, for various applications.',
        icon: <SiOpenai className="h-5 w-5" />,
    },
    {
        title: 'Notion',
        description:
            'Notion is a productivity tool that combines note-taking, task management, and collaboration features to help teams and individuals organize their work.',
        icon: <RiNotionFill className="h-5 w-5" />,
    },
    {
        title: 'Youtube',
        description:
            'YouTube is a video-sharing platform where users can upload, watch, and share videos, offering content across various categories like entertainment, education, and vlogging.',
        icon: <FaYoutube className="h-5 w-5" />,
    },
    {
        title: 'Gmail',
        description:
            "Gmail is Google's email service that provides free, secure, and feature-rich email management with powerful search, spam filtering, and integration with other Google services.",
        icon: <SiGmail className="h-5 w-5" />,
    },
    {
        title: 'Google Calendar',
        description:
            'Google Calendar is a time-management tool that helps users schedule, manage, and share events, with integration across devices and other Google services.',
        icon: <SiGooglecalendar className="h-5 w-5" />,
    },
];
const ServicesVitrine = () => {
    return (
        <section className="py-32">
            <div className="container mx-auto max-w-screen-xl">
                <p className="mb-4 text-xs text-muted-foreground md:pl-5">Services</p>
                <h2 className="text-3xl font-medium md:pl-5 lg:text-4xl">
                    Our Core Services
                </h2>
                <div className="mx-auto mt-14 grid gap-x-20 gap-y-8 md:grid-cols-2 md:gap-y-6 lg:mt-20">
                    {features.map((feature, idx) => (
                        <div className="flex gap-6 rounded-lg md:block md:p-5" key={idx}>
                            <span className="mb-8 flex size-10 shrink-0 items-center justify-center rounded-full bg-accent md:size-12">
                                {feature.icon}
                            </span>
                            <div>
                                <h3 className="font-medium md:mb-2 md:text-xl">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-muted-foreground md:text-base">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
export default ServicesVitrine;
