export function hello() {
  console.log('hello world');
}

// immutable ticket
export type Ticket = {
  userId: string;
  loginMethod: string;
  verified: boolean;
  getUser: () => any;
  needsMfa: () => boolean;
};
