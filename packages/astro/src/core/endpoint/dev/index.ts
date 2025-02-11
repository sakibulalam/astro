import type { EndpointHandler } from '../../../@types/astro';
import type { LogOptions } from '../../logger/core';
import type { SSROptions } from '../../render/dev';
import { createRenderContext } from '../../render/index.js';
import { call as callEndpoint } from '../index.js';

export async function call(options: SSROptions, logging: LogOptions) {
	const {
		env,
		preload: [, mod],
		middleware,
	} = options;
	const endpointHandler = mod as unknown as EndpointHandler;

	const ctx = await createRenderContext({
		request: options.request,
		origin: options.origin,
		pathname: options.pathname,
		route: options.route,
		env,
		mod: endpointHandler as any,
	});

	return await callEndpoint(endpointHandler, env, ctx, logging, middleware);
}
