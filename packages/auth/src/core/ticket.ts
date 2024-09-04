export interface TicketBase<TVerified extends boolean = boolean> {
  readonly userId: string;
  readonly verified: TVerified;
  readonly securityStamp: string;
  needsMfa: () => this is UnverifiedTicket;
}

export type UnverifiedTicket = TicketBase<false>;

export type VerifiedTicket = TicketBase<true>;

export type Ticket = UnverifiedTicket | VerifiedTicket;

type TicketCreateOptions = {
  userId: string;
  securityStamp: string;
};

function createTicket<TVerified extends boolean>(
  ops: TicketCreateOptions,
  verified: TVerified,
): TicketBase<TVerified> {
  // type predicates are funky, we need to make a class for it
  class Ticket implements TicketBase<TVerified> {
    readonly userId: string = ops.userId;
    readonly securityStamp: string = ops.securityStamp;
    readonly verified = verified;
    needsMfa(): this is UnverifiedTicket {
      return !this.verified;
    }
  }
  return new Ticket();
}

export function createVerifiedTicket(ops: TicketCreateOptions): VerifiedTicket {
  return createTicket(
    {
      userId: ops.userId,
      securityStamp: ops.securityStamp,
    },
    true,
  );
}

export function verifyTicket(ops: UnverifiedTicket): VerifiedTicket {
  return createTicket(
    {
      userId: ops.userId,
      securityStamp: ops.securityStamp,
    },
    true,
  );
}

export function createUnverifiedTicket(
  ops: TicketCreateOptions,
): UnverifiedTicket {
  return createTicket(
    {
      userId: ops.userId,
      securityStamp: ops.securityStamp,
    },
    false,
  );
}

export function isVerifiedTicket(ticket: Ticket): ticket is VerifiedTicket {
  return !ticket.needsMfa();
}

export function assertVerifiedTicket(ticket: Ticket): VerifiedTicket {
  if (!isVerifiedTicket(ticket))
    throw new Error('Requires verified ticket - check needsMfa()');
  return ticket;
}
