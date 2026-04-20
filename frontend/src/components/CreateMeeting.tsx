import { useState } from 'react';

import { Clock2Icon } from 'lucide-react';
import { toast } from 'sonner';

import api from '@/api';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { useAppDispatch } from '@/store/hooks';
import { addMeeting } from '@/store/meetingSlice';

const CreateMeeting = () => {
  const [startTime, setStartTime] = useState('10:30:00');
  const [endTime, setEndTime] = useState('12:30:00');
  const [date, setDate] = useState<Date>(new Date());

  const dispatch = useAppDispatch();

  const handleCreateMeeting = async () => {
    const MeetingDateTime = (baseDate: Date, timeString: string) => {
      const [hours, minutes, seconds] = timeString.split(':').map(Number);
      const newDate = new Date(baseDate);
      newDate.setHours(hours, minutes, seconds || 0);
      return newDate;
    };

    const startAt = MeetingDateTime(date, startTime);
    const endAt = MeetingDateTime(date, endTime);

    try {
      const response = await api.post('/meeting/create', {
        startTime: startAt,
        endTime: endAt,
      });
      toast.success('Meeting Scheduled');
      dispatch(addMeeting(response.data));
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to create meeting');
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="font-semibold text-lg active:shadow-sm active:translate-y-1">
          Add a Meeting
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Select a Date</DropdownMenuLabel>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              captionLayout="dropdown"
              required
            />
          </DropdownMenuItem>
          <DropdownMenuLabel>Start Time</DropdownMenuLabel>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <InputGroup>
              <InputGroupInput
                id="time-from"
                type="time"
                step="1"
                value={startTime}
                onChange={(event) => setStartTime(event.target.value)}
                className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
              <InputGroupAddon>
                <Clock2Icon className="text-muted-foreground" />
              </InputGroupAddon>
            </InputGroup>
          </DropdownMenuItem>
          <DropdownMenuLabel>End Time</DropdownMenuLabel>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <InputGroup>
              <InputGroupInput
                id="time-to"
                type="time"
                step="1"
                value={endTime}
                onChange={(event) => setEndTime(event.target.value)}
                className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
              <InputGroupAddon>
                <Clock2Icon className="text-muted-foreground" />
              </InputGroupAddon>
            </InputGroup>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <Button
              className="w-full active:shadow-sm active:translate-y-1"
              onClick={handleCreateMeeting}
            >
              Create
            </Button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CreateMeeting;
