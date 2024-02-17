import type {
  FastifyBaseLogger,
  FastifySchema,
  FastifyTypeProvider,
  HTTPMethods,
  RawRequestDefaultExpression,
  RawServerBase,
  RouteGenericInterface,
} from 'fastify';
import type { NeatHandler } from './handler';

export interface EndpointDeclaration<
  RawServer extends RawServerBase,
  RawRequest extends RawRequestDefaultExpression<RawServer>,
  RouteGeneric extends RouteGenericInterface,
  ContextConfig,
  SchemaCompiler extends FastifySchema,
  TypeProvider extends FastifyTypeProvider,
  Logger extends FastifyBaseLogger,
> {
  method: HTTPMethods;
  url: string;
  handler: NeatHandler<
    RawServer,
    RawRequest,
    RouteGeneric,
    ContextConfig,
    SchemaCompiler,
    Logger,
    TypeProvider
  >;
}

export interface EndpointBuilder<
  RawServer extends RawServerBase,
  RawRequest extends RawRequestDefaultExpression<RawServer>,
  RouteGeneric extends RouteGenericInterface,
  ContextConfig,
  SchemaCompiler extends FastifySchema,
  TypeProvider extends FastifyTypeProvider,
  Logger extends FastifyBaseLogger,
> {
  handle: (
    handler: NeatHandler<
      RawServer,
      RawRequest,
      RouteGeneric,
      ContextConfig,
      SchemaCompiler,
      Logger,
      TypeProvider
    >,
  ) => void;
}
