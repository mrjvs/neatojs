import type { UserType } from './features';

export type TicketBase = {
  readonly userId: string;
  readonly verified: boolean;
  readonly user: UserType;
  needsMfa: () => boolean;
};

export type UnverifiedTicket = TicketBase & {
  readonly verified: false;
  needsMfa: () => true;
};

export type VerifiedTicket = TicketBase & {
  readonly verified: true;
  needsMfa: () => false;
};

export type Ticket = UnverifiedTicket | VerifiedTicket;

type TicketCreateOptions = {
  userId: string;
  user: UserType;
};

export function createVerifiedTicket(ops: TicketCreateOptions): VerifiedTicket {
  return {
    userId: ops.userId,
    user: ops.user,
    verified: true,
    needsMfa() {
      return false;
    },
  };
}

export function createUnverifiedTicket(
  ops: TicketCreateOptions,
): UnverifiedTicket {
  return {
    userId: ops.userId,
    user: ops.user,
    verified: false,
    needsMfa() {
      return true;
    },
  };
}

export function isVerifiedTicket(ticket: Ticket): ticket is VerifiedTicket {
  return !ticket.needsMfa();
}

export function assertVerifiedTicket(ticket: Ticket): VerifiedTicket {
  if (!isVerifiedTicket(ticket))
    throw new Error('Requires verified ticket - check needsMfa()');
  return ticket;
}
