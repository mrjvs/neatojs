import type {
  CreateGuardFeatureOptions,
  ExposedFunctionMap,
  GuardFeature,
} from 'core/features';

export type TicketGuardFeatureComponents = Record<never, never>;

export type TicketGuardFeature<
  TId extends string = string,
  TExposed extends ExposedFunctionMap = Record<never, never>,
> = GuardFeature<TId, 'ticket', TExposed, TicketGuardFeatureComponents>;

export function ticketFeature<
  const TId extends string,
  TExposed extends ExposedFunctionMap,
>(
  ops: CreateGuardFeatureOptions<TId, TExposed, TicketGuardFeatureComponents>,
): TicketGuardFeature<TId, TExposed> {
  return {
    id: ops.id,
    drivers: ops.drivers,
    type: 'ticket',
    builder: ops.builder,
  };
}
