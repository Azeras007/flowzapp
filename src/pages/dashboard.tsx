import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { LuWorkflow } from 'react-icons/lu';
import { FaRunning } from 'react-icons/fa';
import { MdReportProblem } from 'react-icons/md';
import { VscActivateBreakpoints } from 'react-icons/vsc';
import api from '@/services/axiosInstance';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button';
import { MdDelete } from 'react-icons/md';
import { TbLogs } from 'react-icons/tb';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { PlayIcon } from '@radix-ui/react-icons';
import { toast } from 'sonner';

interface Area {
  id: number;
  name: string;
  status: boolean;
  is_failed: boolean;
  listener: {
    name: string;
    sub_service_name: string;
    sub_service_icon: string;
  };
  action: {
    name: string;
    sub_service_name: string;
    sub_service_icon: string;
  };
  created_at: string;
}

interface Log {
  id: number;
  area_id: number;
  status: string;
  triggered_by: string;
  response: string;
  created_at: string;
}

export function Dashboard() {
  const [areas, setAreas] = useState<Area[]>([]);
  const [logs, setLogs] = useState<{ [key: number]: Log[] | null }>({});
  const [selectedAreaId, setSelectedAreaId] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await api.get('/areas');
        const fetchedAreas = response.data.data;
        setAreas(fetchedAreas);
        fetchedAreas.forEach((area: Area) => fetchLogs(area.id));
      } catch (error) {
        console.error('Error fetching areas:', error);
      }
    };

    fetchAreas();
  }, []);

  const fetchLogs = async (areaId: number) => {
    try {
      const response = await api.get(`/areas/${areaId}/logs`);
      const logData = response.data.data;
      logData.sort(
        (a: Log, b: Log) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      setLogs((prevLogs) => ({
        ...prevLogs,
        [areaId]: logData.length > 0 ? logData : null,
      }));
    } catch (error) {
      console.error(`Error fetching logs for area ${areaId}:`, error);
      setLogs((prevLogs) => ({
        ...prevLogs,
        [areaId]: null,
      }));
    }
  };

  const toggleAreaStatus = async (id: number) => {
    try {
      await api.post(`/areas/${id}/status`);
      setAreas((prevAreas) =>
        prevAreas.map((area) =>
          area.id === id ? { ...area, status: !area.status } : area
        )
      );
    } catch (error) {
      console.error('Error toggling area status:', error);
    }
  };

  const handleTrashClick = (id: number) => {
    setSelectedAreaId(id);
    setOpenDialog(true);
  };

  const handleLogsClick = (id: number) => {
    setSelectedAreaId(id);
    setOpenDrawer(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const handleDelete = async () => {
    if (selectedAreaId) {
      try {
        setLoading(true);
        await api.post(`/areas/${selectedAreaId}/delete`);
        setAreas((prevAreas) =>
          prevAreas.filter((area) => area.id !== selectedAreaId)
        );
      } catch (error) {
        console.error('Error deleting area:', error);
      } finally {
        setLoading(false);
        setOpenDialog(false);
      }
    }
  };

  const formatServiceDetails = (
    icon: string,
    subService: string,
    name: string
  ) => {
    return (
      <div className="flex items-center gap-2">
        <img src={icon} alt={subService} className="h-4 w-4" />
        <span>{`${subService} - ${name}`}</span>
      </div>
    );
  };

  const triggerArea = async (areaId: number) => {
    try {
      await api.post(`/areas/${areaId}/trigger`);
      fetchLogs(areaId);
      toast('Area triggered successfully!');
    } catch (error) {
      console.error('Error triggering area:', error);
      toast('Error triggering area!');
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AREAS</CardTitle>
              <LuWorkflow className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-muted-foreground">
                {areas.length}
              </div>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active AREAS
              </CardTitle>
              <VscActivateBreakpoints className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-muted-foreground">
                {areas.filter((area) => area.status).length}
              </div>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Failed AREAS
              </CardTitle>
              <MdReportProblem className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-muted-foreground">
                {areas.filter((area) => area.is_failed).length}
              </div>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Runs</CardTitle>
              <FaRunning className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-muted-foreground">
                {Object.values(logs).reduce(
                  (acc, logArray) => acc + (logArray ? logArray.length : 0),
                  0
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 grid-cols-2">
          {areas.map((area) => (
            <Card
              key={area.id}
              className={area.status ? '' : 'bg-muted text-muted-foreground'}
            >
              <CardHeader className="flex flex-row items-start">
                <div className="grid gap-0.5">
                  <CardTitle className="group flex items-center gap-2 text-lg truncate mr-3">
                    <span className="truncate max-w-full" title={area.name}>
                      {area.name}
                    </span>
                  </CardTitle>
                  <CardDescription>
                    {formatDistanceToNow(new Date(area.created_at))} ago
                  </CardDescription>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  <Switch
                    checked={area.status}
                    onCheckedChange={() => toggleAreaStatus(area.id)}
                    className="mr-2"
                  />
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-8 w-8"
                    onClick={() => handleTrashClick(area.id)}
                  >
                    <MdDelete className="h-3.5 w-3.5" />
                    <span className="sr-only">Trash</span>
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-8 w-8"
                    onClick={() => handleLogsClick(area.id)}
                  >
                    <TbLogs className="h-3.5 w-3.5" />
                    <span className="sr-only">Logs</span>
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-8 w-8"
                    onClick={() => triggerArea(area.id)}
                  >
                    <PlayIcon className="h-3.5 w-3.5" />
                    <span className="sr-only">Trigger</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-6">
                  <div>
                    <div className="text-xs font-medium uppercase text-muted-foreground">
                      If This
                    </div>
                    <div className="text-sm font-medium">
                      {formatServiceDetails(
                        area.listener.sub_service_icon,
                        area.listener.sub_service_name,
                        area.listener.name
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-medium uppercase text-muted-foreground">
                      Then That
                    </div>
                    <div className="text-sm font-medium">
                      {formatServiceDetails(
                        area.action.sub_service_icon,
                        area.action.sub_service_name,
                        area.action.name
                      )}
                    </div>
                  </div>
                </div>
                {logs[area.id] ? (
                  <div className="flex items-center justify-between mt-10">
                    <Badge
                      variant={
                        !area.status
                          ? 'outline'
                          : !area.is_failed
                          ? 'success'
                          : 'destructive'
                      }
                    >
                      {!area.status
                        ? 'Disabled'
                        : !area.is_failed
                        ? '● Running'
                        : '⚠︎ Failed'}
                    </Badge>
                    <div className="text-xs text-muted-foreground">
                      {new Date(logs[area.id]![0].created_at).toLocaleString()}
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-muted-foreground mt-2">
                    No logs available
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Logs for Area {selectedAreaId}</DrawerTitle>
            <DrawerDescription>
              Found {selectedAreaId !== null ? logs[selectedAreaId]?.length : 0}{' '}
              elements
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4">
            {selectedAreaId !== null &&
            logs[selectedAreaId] &&
            logs[selectedAreaId].length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Log ID</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Triggered by</TableHead>
                    <TableHead>Response</TableHead>
                    <TableHead className="text-right">Timestamp</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs[selectedAreaId].map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-medium">{log.id}</TableCell>
                      <TableCell>{log.status}</TableCell>
                      <TableCell>{log.triggered_by}</TableCell>
                      <TableCell>{log.response}</TableCell>
                      <TableCell className="text-right">
                        {new Date(log.created_at).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p>No logs available for this area.</p>
            )}
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline" onClick={handleDrawerClose}>
                Close
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              area.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleDialogClose}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={loading}>
              {loading ? 'Deleting...' : 'Continue'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
