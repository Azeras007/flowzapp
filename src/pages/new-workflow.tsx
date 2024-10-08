import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { FaCirclePlus, FaEquals } from 'react-icons/fa6';
import api from '@/services/axiosInstance';

interface SubService {
  id: number;
  name: string;
  icon_url: string;
  service_id: number;
}

interface Event {
  id: number;
  name: string;
  icon_url: string;
  metadata: {
    fields: {
      name: string;
      type: string;
      label: string;
      required: boolean;
    }[];
  };
}

interface Payload {
  [key: string]: string;
}

interface UserTokens {
  [key: string]: boolean;
}

const NewWorkflow: React.FC = () => {
  const [selectedAction, setSelectedAction] = useState<SubService | null>(null);
  const [selectedReaction, setSelectedReaction] = useState<SubService | null>(
    null
  );
  const [events, setEvents] = useState<Event[]>([]);
  const [subServices, setSubServices] = useState<SubService[]>([]);
  const [listenerPayload, setListenerPayload] = useState<Payload>({});
  const [actionPayload, setActionPayload] = useState<Payload>({});
  const [areaName, setAreaName] = useState<string>('');
  const [isActionMode, setIsActionMode] = useState<boolean>(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedActionEvent, setSelectedActionEvent] = useState<Event | null>(
    null
  );
  const [userTokens, setUserTokens] = useState<UserTokens>({});
  const [serviceName, setServiceName] = useState<string>('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/user');
        setUserTokens(response.data.user);
      } catch (error) {
        console.error('Error fetching user tokens', error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchServicesAndSubServices = async () => {
      try {
        const servicesResponse = await api.get('/services');
        const services = servicesResponse.data.data;

        const subServicesPromises = services.map((service: { id: number }) =>
          api.get(`/services/${service.id}/sub-services`)
        );

        const subServicesResponses = await Promise.all(subServicesPromises);
        const allSubServices = subServicesResponses.flatMap(
          (response) => response.data.data
        );

        setSubServices(allSubServices);
      } catch (error) {
        console.error('Error fetching services or sub-services', error);
      }
    };

    fetchServicesAndSubServices();
  }, []);

  useEffect(() => {
    const getSelectedServiceName = async () => {
      if (selectedAction) {
        try {
          const response = await api.get(
            `/services/${selectedAction.service_id}`
          );
          setServiceName(response.data.data.name);
        } catch (error) {
          console.error('Error fetching service name', error);
        }
      } else if (selectedReaction) {
        try {
          const response = await api.get(
            `/services/${selectedReaction.service_id}`
          );
          setServiceName(response.data.data.name);
        } catch (error) {
          console.error('Error fetching service name', error);
        }
      }
    };

    getSelectedServiceName();
  }, [selectedAction, selectedReaction]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        if (selectedAction && isActionMode) {
          const response = await api.get(
            `/services/${selectedAction.service_id}/sub-services/${selectedAction.id}/listeners`
          );
          setEvents(response.data);
        } else if (selectedReaction && !isActionMode) {
          const response = await api.get(
            `/services/${selectedReaction.service_id}/sub-services/${selectedReaction.id}/actions`
          );
          setEvents(response.data);
        }
      } catch (error) {
        console.error('Error fetching events', error);
      }
    };

    fetchEvents();
  }, [selectedAction, selectedReaction, isActionMode]);

  const handleListenerPayloadChange = (fieldName: string, value: string) => {
    setListenerPayload((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleActionPayloadChange = (fieldName: string, value: string) => {
    setActionPayload((prev) => ({ ...prev, [fieldName]: value }));
  };

  const fieldChecks = [
    { field: areaName, label: 'Name' },
    { field: selectedEvent, label: 'Action' },
    { field: selectedActionEvent, label: 'Reaction' },
  ];

  const missingFields = fieldChecks
    .filter((check) => !check.field)
    .map((check) => check.label);

  const handleCreateArea = async () => {
    if (missingFields.length > 0) {
      toast('Please fill out all fields', {
        description: `Missing fields: ${missingFields.join(', ')}`,
      });
      return;
    }

    const payload = {
      listener_id: selectedEvent?.id,
      action_id: selectedActionEvent?.id,
      name: areaName,
      listener_payload: listenerPayload,
      action_payload: actionPayload,
    };

    try {
      await api.post('/areas/new', payload);
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Error creating AREA', error);
      toast('Failed to create AREA');
    }
  };

  const handleSubServiceSelect = (subService: SubService, action: boolean) => {
    if (action) {
      if (subService.id !== selectedAction?.id) {
        setSelectedAction(subService);
        setSelectedEvent(null);
        setListenerPayload({});
      }
      setIsActionMode(true);
    } else {
      if (subService.id !== selectedReaction?.id) {
        setSelectedReaction(subService);
        setSelectedActionEvent(null);
        setActionPayload({});
      }
      setIsActionMode(false);
    }
    setEvents([]);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <Sheet>
        <SheetTrigger asChild>
          <Card className="w-[380px] cursor-pointer">
            <CardHeader>
              <CardTitle>
                {selectedAction ? (
                  <div className="flex items-center">
                    <img
                      src={selectedAction.icon_url}
                      alt={selectedAction.name}
                      className="mr-2 h-6 w-6"
                    />
                    Action - {selectedAction.name}
                  </div>
                ) : (
                  'Action'
                )}
              </CardTitle>
              <CardDescription>
                {selectedEvent
                  ? `On "${selectedEvent.name}"`
                  : 'Triggering the workflow'}
              </CardDescription>
              {selectedAction && (
                <Badge variant="secondary" className="mt-2 w-fit">
                  {userTokens[`has_${serviceName.toLowerCase()}_token`]
                    ? `✓ Connected to ${serviceName}`
                    : `✗ Not connected to ${serviceName}`}
                </Badge>
              )}
            </CardHeader>
            <CardFooter>
              <Button className="w-full">Choose an Action</Button>
            </CardFooter>
          </Card>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Select an Action</SheetTitle>
            <SheetDescription>
              Choose an app, then select an action
            </SheetDescription>
          </SheetHeader>
          <div className="space-y-2 pt-3">
            <ToggleGroup
              type="single"
              size="lg"
              variant="outline"
              className="flex flex-col"
            >
              {subServices.map((app) => (
                <ToggleGroupItem
                  value={app.name}
                  key={app.id}
                  className="w-full flex items-center"
                  onClick={() => handleSubServiceSelect(app, true)}
                >
                  <img
                    src={app.icon_url}
                    alt={app.name}
                    className="mr-2 h-4 w-4"
                  />
                  {app.name}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          {selectedAction && (
            <div className="space-y-4 mt-4">
              <Separator className="my-4" />
              <ToggleGroup
                type="single"
                size="lg"
                variant="outline"
                className="flex flex-col"
              >
                {events.map((event) => (
                  <ToggleGroupItem
                    value={event.name}
                    key={event.id}
                    className="w-full flex items-center"
                    onClick={() => setSelectedEvent(event)}
                  >
                    <img
                      src={event.icon_url}
                      alt={event.name}
                      className="mr-2 h-4 w-4 invert"
                    />
                    {event.name}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>

              {selectedEvent?.metadata?.fields?.map((field) => (
                <div key={field.name}>
                  <label>{field.label}</label>
                  <Input
                    className="w-full"
                    type={field.type === 'string' ? 'text' : field.type}
                    required={field.required}
                    value={listenerPayload[field.name] || ''}
                    onChange={(e) =>
                      handleListenerPayloadChange(field.name, e.target.value)
                    }
                  />
                </div>
              ))}
            </div>
          )}
        </SheetContent>
      </Sheet>

      <Button className="rounded-full p-2 bg-transparent">
        <FaCirclePlus className="h-6 w-6" />
      </Button>

      <Sheet>
        <SheetTrigger asChild>
          <Card className="w-[380px] cursor-pointer">
            <CardHeader>
              <CardTitle>
                {selectedReaction ? (
                  <div className="flex items-center">
                    <img
                      src={selectedReaction.icon_url}
                      alt={selectedReaction.name}
                      className="mr-2 h-6 w-6"
                    />
                    Reaction - {selectedReaction.name}
                  </div>
                ) : (
                  'Reaction'
                )}
              </CardTitle>
              <CardDescription>
                {selectedActionEvent
                  ? `Do "${selectedActionEvent.name}"`
                  : 'Completing the workflow'}
              </CardDescription>
              {selectedReaction && (
                <Badge variant="secondary" className="mt-2 w-fit">
                  {userTokens[`has_${serviceName.toLowerCase()}_token`]
                    ? `✓ Connected to ${serviceName}`
                    : `✗ Not connected to ${serviceName}`}
                </Badge>
              )}
            </CardHeader>
            <CardFooter>
              <Button className="w-full">Choose a Reaction</Button>
            </CardFooter>
          </Card>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Select a Reaction</SheetTitle>
            <SheetDescription>
              Choose an app, then select an action
            </SheetDescription>
          </SheetHeader>
          <div className="space-y-2 pt-3">
            <ToggleGroup
              type="single"
              size="lg"
              variant="outline"
              className="flex flex-col"
            >
              {subServices.map((app) => (
                <ToggleGroupItem
                  value={app.name}
                  key={app.id}
                  className="w-full flex items-center"
                  onClick={() => handleSubServiceSelect(app, false)}
                >
                  <img
                    src={app.icon_url}
                    alt={app.name}
                    className="mr-2 h-4 w-4"
                  />
                  {app.name}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          {selectedReaction && (
            <div className="space-y-4 mt-4">
              <Separator className="my-4" />
              <ToggleGroup
                type="single"
                size="lg"
                variant="outline"
                className="flex flex-col"
              >
                {events.map((action) => (
                  <ToggleGroupItem
                    value={action.name}
                    key={action.id}
                    className="w-full flex items-center"
                    onClick={() => setSelectedActionEvent(action)}
                  >
                    <img
                      src={action.icon_url}
                      alt={action.name}
                      className="mr-2 h-4 w-4 invert"
                    />
                    {action.name}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>

              {selectedActionEvent?.metadata?.fields?.map((field) => (
                <div key={field.name}>
                  <label>{field.label}</label>
                  <Input
                    className="w-full"
                    type={field.type === 'string' ? 'text' : field.type}
                    required={field.required}
                    value={actionPayload[field.name] || ''}
                    onChange={(e) =>
                      handleActionPayloadChange(field.name, e.target.value)
                    }
                  />
                </div>
              ))}
            </div>
          )}
        </SheetContent>
      </Sheet>

      <Button className="rounded-full p-2 bg-transparent">
        <FaEquals className="h-6 w-6" />
      </Button>

      <div className="w-[380px]">
        <label>Name of the AREA</label>
        <Input
          className="w-full"
          value={areaName}
          onChange={(e) => setAreaName(e.target.value)}
        />
      </div>

      <Button className="w-[380px]" onClick={handleCreateArea}>
        Create AREA
      </Button>
    </div>
  );
};

export default NewWorkflow;
