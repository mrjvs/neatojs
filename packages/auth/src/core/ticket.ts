export interface TicketBase<TVerified extends boolean = boolean> {
  readonly userId: string;
  readonly verified: TVerified;
  readonly securityStamp: string;
  needsMfa: () => this is UnverifiedTicket;
  updateSecurityStamp: (newStamp: string) => Promise<void>;
}

export type UnverifiedTicket = TicketBase<false>;

export type VerifiedTicket = TicketBase<true>;

export type Ticket = UnverifiedTicket | VerifiedTicket;

export type TicketCreateOptions = {
  userId: string;
  securityStamp: string;
  updateSecurityStamp?: (newStamp: string) => Promise<void>;
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
    async updateSecurityStamp(newStamp: string) {
      if (!ops.updateSecurityStamp) return;
      return ops.updateSecurityStamp(newStamp);
    }
  }
  return new Ticket();
}

export function createVerifiedTicket(ops: TicketCreateOptions): VerifiedTicket {
  return createTicket(
    {
      userId: ops.userId,
      securityStamp: ops.securityStamp,
      updateSecurityStamp: ops.updateSecurityStamp,
    },
    true,
  );
}

export function verifyTicket(ops: UnverifiedTicket): VerifiedTicket {
  return createTicket(
    {
      userId: ops.userId,
      securityStamp: ops.securityStamp,
      updateSecurityStamp: ops.updateSecurityStamp,
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
      updateSecurityStamp: ops.updateSecurityStamp,
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
