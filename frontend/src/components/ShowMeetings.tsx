import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { toast } from 'sonner';

import api from '@/api';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setMeetings } from '@/store/meetingSlice';
import type { Meeting } from '@/types/types';

import { Button } from './ui/button';

const ShowMeetings = () => {
  const meetings = useAppSelector((state) => state.meetings.meetings);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const copyMeetingLink = async (meetingDetails: Meeting) => {
    const fullLink = `
    Zync Meeting Link
    Join Video Conference with your friends or coworkers.
    Meeting Details:
    MeetingCode: ${meetingDetails.meetingCode}
    Start Time: ${new Date(meetingDetails.startTime).toLocaleDateString()} | ${new Date(meetingDetails.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    End Time: ${new Date(meetingDetails.endTime).toLocaleDateString()} | ${new Date(meetingDetails.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    Link: ${window.location.origin}/meeting/${meetingDetails.meetingCode}
    Thanks for using Zync Video Conferencing.
    `;

    try {
      await navigator.clipboard.writeText(fullLink);
      toast.success('Link copied to clipboard.');
    } catch (err) {
      toast.error('failed to copy Link.');
    }
  };

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await api.get('/meeting/all');
        dispatch(setMeetings(response.data));
      } catch (err) {
        toast.info('Unable to load Meetings');
        console.log(err);
      }
    };
    fetchMeetings();
  }, []);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Meeting Code</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>End Date</TableHead>
          <TableHead>Join</TableHead>
          <TableHead>Link</TableHead>
        </TableRow>
      </TableHeader>
      {meetings.length > 0 && (
        <TableBody>
          {meetings.map((m: Meeting) => (
            <TableRow key={m._id}>
              <TableCell>{m.meetingCode}</TableCell>
              <TableCell>
                {new Date(m.startTime).toLocaleDateString()} |{' '}
                {new Date(m.startTime).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </TableCell>
              <TableCell>
                {new Date(m.endTime).toLocaleDateString()} |{' '}
                {new Date(m.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </TableCell>
              <TableCell>
                <Button size={'sm'} onClick={() => navigate(`/meeting/${m.meetingCode}`)}>
                  Join
                </Button>
              </TableCell>
              <TableCell>
                <Button variant={'ghost'} onClick={() => copyMeetingLink(m)}>
                  Copy Link
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      )}

      {meetings.length === 0 && (
        <TableBody>
          <TableRow>
            <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
              No meetings scheduled yet.
            </TableCell>
          </TableRow>
        </TableBody>
      )}
    </Table>
  );
};

export default ShowMeetings;
