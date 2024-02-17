import type {
  FastifyBaseLogger,
  FastifySchema,
  FastifyTypeProvider,
  RawRequestDefaultExpression,
  RawServerBase,
  RouteGenericInterface,
} from 'fastify';
import type {
  FastifyReplyType,
  ResolveFastifyReplyType,
} from 'fastify/types/type-provider';
import type { NeatPayload } from './context';

export type NeatHandler<
  RawServer extends RawServerBase,
  RawRequest extends RawRequestDefaultExpression<RawServer>,
  RouteGeneric extends RouteGenericInterface,
  ContextConfig,
  SchemaCompiler extends FastifySchema,
  Logger extends FastifyBaseLogger,
  TypeProvider extends FastifyTypeProvider,
  ReplyType extends FastifyReplyType = ResolveFastifyReplyType<
    TypeProvider,
    SchemaCompiler,
    RouteGeneric
  >,
> = (
  context: NeatPayload<
    RawServer,
    RawRequest,
    RouteGeneric,
    ContextConfig,
    SchemaCompiler,
    Logger,
    TypeProvider
  >,
) => Promise<ReplyType> | ReplyType;
