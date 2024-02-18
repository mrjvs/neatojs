import type {
  ContextConfigDefault,
  FastifyBaseLogger,
  FastifyInstance,
  FastifySchema,
  FastifyTypeProvider,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerBase,
  RouteGenericInterface,
  RouteHandlerMethod,
} from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import type { NeatHandler } from './handler';
import type { EndpointBuilder, EndpointDeclaration } from './builder';

export interface RouterOptions {
  prefix?: string;
  params?: unknown;
}

export interface Router<
  RawServer extends RawServerBase,
  RawRequest extends RawRequestDefaultExpression<RawServer>,
  RawReply extends RawReplyDefaultExpression<RawServer>,
  RouteGeneric extends RouteGenericInterface,
  ContextConfig,
  SchemaCompiler extends FastifySchema,
  Logger extends FastifyBaseLogger,
  TypeProvider extends FastifyTypeProvider,
  EndpointType extends EndpointDeclaration<
    RawServer,
    RawRequest,
    RouteGeneric,
    ContextConfig,
    SchemaCompiler,
    TypeProvider,
    Logger
  > = EndpointDeclaration<
    RawServer,
    RawRequest,
    RouteGeneric,
    ContextConfig,
    SchemaCompiler,
    TypeProvider,
    Logger
  >,
  BuilderType extends EndpointBuilder<
    RawServer,
    RawRequest,
    RouteGeneric,
    ContextConfig,
    SchemaCompiler,
    TypeProvider,
    Logger
  > = EndpointBuilder<
    RawServer,
    RawRequest,
    RouteGeneric,
    ContextConfig,
    SchemaCompiler,
    TypeProvider,
    Logger
  >,
> {
  get: () => BuilderType;
  post: () => BuilderType;
  put: () => BuilderType;
  delete: () => BuilderType;
  endpoint: (ops: EndpointType) => void;
  app: FastifyInstance<
    RawServer,
    RawRequest,
    RawReply,
    Logger,
    ZodTypeProvider
  >;
}

function makeHandler<
  RawServer extends RawServerBase,
  RawRequest extends RawRequestDefaultExpression<RawServer>,
  RawReply extends RawReplyDefaultExpression<RawServer>,
  RouteGeneric extends RouteGenericInterface,
  ContextConfig,
  SchemaCompiler extends FastifySchema,
  Logger extends FastifyBaseLogger,
  TypeProvider extends FastifyTypeProvider,
>(
  handler: NeatHandler<
    RawServer,
    RawRequest,
    RouteGeneric,
    ContextConfig,
    SchemaCompiler,
    Logger,
    TypeProvider
  >,
): RouteHandlerMethod<
  RawServer,
  RawRequest,
  RawReply,
  RouteGeneric,
  ContextConfig,
  SchemaCompiler,
  TypeProvider,
  Logger
> {
  return async (req, reply) => {
    const res = await handler({
      body: req.body,
      params: req.params,
      query: req.query,
      req,
    });
    await reply.send(res);
  };
}

export function makeRouter<
  RawServer extends RawServerBase,
  RawRequest extends RawRequestDefaultExpression<RawServer>,
  RawReply extends RawReplyDefaultExpression<RawServer>,
  Logger extends FastifyBaseLogger,
  TypeProvider extends FastifyTypeProvider,
  RouteGeneric extends RouteGenericInterface = RouteGenericInterface,
  ContextConfig = ContextConfigDefault,
  const SchemaCompiler extends FastifySchema = FastifySchema,
  EndpointType extends EndpointDeclaration<
    RawServer,
    RawRequest,
    RouteGeneric,
    ContextConfig,
    SchemaCompiler,
    TypeProvider,
    Logger
  > = EndpointDeclaration<
    RawServer,
    RawRequest,
    RouteGeneric,
    ContextConfig,
    SchemaCompiler,
    TypeProvider,
    Logger
  >,
>(
  inputRouter: FastifyInstance<
    RawServer,
    RawRequest,
    RawReply,
    Logger,
    TypeProvider
  >,
): Router<
  RawServer,
  RawRequest,
  RawReply,
  RouteGeneric,
  ContextConfig,
  SchemaCompiler,
  Logger,
  TypeProvider
> {
  const app = inputRouter.withTypeProvider<ZodTypeProvider>();

  function registerEndpoint(endpoint: EndpointType): void {
    app.route({
      method: endpoint.method,
      url: endpoint.url,
      handler: makeHandler(endpoint.handler),
    });
  }

  return {
    app,
    endpoint(ops) {
      registerEndpoint(ops);
    },
    delete: () => null,
    get: () => null,
    post: () => null,
    put: () => null,
  };
}
