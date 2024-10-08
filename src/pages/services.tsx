import { useEffect, useState } from 'react';
import api from '@/services/axiosInstance';

interface Service {
  name: string;
  description: string;
  icon_url: string;
}

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get(
          'https://area-development.tech/api/services'
        );
        setServices(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching services:', error);
        setError('Failed to load services: ' + error);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return <div>Loading services...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="py-32">
      <div className="container mx-auto max-w-screen-xl">
        <p className="mb-4 text-xs text-muted-foreground md:pl-5">Services</p>
        <h2 className="text-3xl font-medium md:pl-5 lg:text-4xl">
          Our Core Services
        </h2>
        <div className="mx-auto mt-14 grid gap-x-20 gap-y-8 md:grid-cols-2 md:gap-y-6 lg:mt-20">
          {services.map((service, idx) => (
            <div className="flex gap-6 rounded-lg md:block md:p-5" key={idx}>
              <span className="mb-8 flex size-10 shrink-0 items-center justify-center rounded-full bg-accent md:size-12">
                <img
                  src={service.icon_url}
                  alt={service.name}
                  className="h-5 w-5"
                />
              </span>
              <div>
                <h3 className="font-medium md:mb-2 md:text-xl">
                  {service.name}
                </h3>
                <p className="text-sm text-muted-foreground md:text-base">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
