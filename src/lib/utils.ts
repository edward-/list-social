import { Status } from '@/lib/definitions';

export function getStatus(status: Status): string {
  switch (status) {
    case Status.DONE:
      return '/status/done.png';
    case Status.INPROGRESS:
      return '/status/in-progress.png';
    case Status.HOLDON:
      return '/status/hold-on.png';
    case Status.CANCELLED:
      return '/status/cancelled.png';
  }
  return '/status/hold-on.png';
}
