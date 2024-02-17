import type {
  FastifyBaseLogger,
  FastifyRequest,
  FastifySchema,
  FastifyTypeProvider,
  RawRequestDefaultExpression,
  RawServerBase,
  RouteGenericInterface,
} from 'fastify';

export interface NeatPayload<
  RawServer extends RawServerBase,
  RawRequest extends RawRequestDefaultExpression<RawServer>,
  RouteGeneric extends RouteGenericInterface,
  ContextConfig,
  SchemaCompiler extends FastifySchema,
  Logger extends FastifyBaseLogger,
  TypeProvider extends FastifyTypeProvider,
  RequestType extends FastifyRequest<
    RouteGeneric,
    RawServer,
    RawRequest,
    SchemaCompiler,
    TypeProvider,
    ContextConfig,
    Logger
  > = FastifyRequest<
    RouteGeneric,
    RawServer,
    RawRequest,
    SchemaCompiler,
    TypeProvider,
    ContextConfig,
    Logger
  >,
> {
  req: RequestType;
  body: RequestType['body'];
  params: RequestType['params'];
  query: RequestType['query'];
}
