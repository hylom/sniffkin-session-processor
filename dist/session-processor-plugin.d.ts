/// <reference types="node" />
/// <reference types="node" />
import * as stream from 'stream';
import * as http from 'http';
import { SniffkinPlugin, PluginContext, RequestCondition, RequestProcessor, ResponseCondition, ResponseProcessor, Session } from 'sniffkin';
export declare class SessionProcessorPlugin implements SniffkinPlugin {
    pluginName: string;
    private _option;
    private _conditionForRequest;
    private _requestProcessor;
    private _requestFilter;
    private _conditionForResponse;
    private _responseProcessor;
    private _responseFilter;
    private _logger?;
    constructor(option?: {});
    init(context: PluginContext): void;
    conditionForRequest(clientRequest: http.ClientRequest): boolean;
    conditionForResponse(clientRequest: http.ClientRequest, serverResponse: http.ServerResponse): boolean;
    setConditionForRequest(conditionFn: RequestCondition): void;
    setConditionForResponse(conditionFn: ResponseCondition): void;
    requestProcessor(proxyRequest: http.ClientRequest): void;
    responseProcessor(clientRequest: http.ClientRequest, proxyResponse: http.ServerResponse): void;
    setRequestProcessor(processorFn: RequestProcessor): void;
    setResponseProcessor(processorFn: ResponseProcessor): void;
    setRequestFilter(filter: stream.Transform | null): void;
    setResponseFilter(filter: stream.Transform | null): void;
    _onRequest(session: Session): void;
    _onResponse(session: Session): void;
}
