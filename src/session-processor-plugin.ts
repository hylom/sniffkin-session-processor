import * as stream from 'stream';
import * as http from 'http';
import { SniffkinPlugin, PluginContext,
         RequestCondition, RequestProcessor,
         ResponseCondition, ResponseProcessor,
         Session, Logger
       } from 'sniffkin';

interface SessionProcessorOption {};

export class SessionProcessorPlugin implements SniffkinPlugin {
    pluginName: string;
    private _option: SessionProcessorOption;
    private _conditionForRequest: RequestCondition;
    private _requestProcessor: RequestProcessor | null = null;
    private _requestFilter: stream.Transform | null = null;
    private _conditionForResponse: ResponseCondition;
    private _responseProcessor: ResponseProcessor | null = null;
    private _responseFilter: stream.Transform | null = null;
    private _logger?: Logger;
    
    constructor(option={}) {
        this._option = Object.assign({}, option);
        this.pluginName = 'SessionProcessorPlugin';
        this._conditionForRequest = this.conditionForRequest.bind(this);
        this._conditionForResponse = this.conditionForResponse.bind(this);

        this.setConditionForRequest(this.conditionForRequest.bind(this));
        this.setRequestProcessor(this.requestProcessor.bind(this));
        this.setConditionForResponse(this.conditionForResponse.bind(this));
        this.setResponseProcessor(this.responseProcessor.bind(this));
        this.setRequestFilter(null);
        this.setResponseFilter(null);
    }

    init(context: PluginContext): void {
        context.proxy.addHandler('request', this._onRequest.bind(this));
        context.proxy.addHandler('response', this._onResponse.bind(this));
        this._logger = context.logger;
        this._logger?.debug(`${this.pluginName}: init done.`);
    }

    conditionForRequest(clientRequest: http.ClientRequest): boolean  {
        return true;
    }

    conditionForResponse(clientRequest: http.ClientRequest,
                         serverResponse: http.ServerResponse): boolean {
        return true;
    }

    setConditionForRequest(conditionFn: RequestCondition) {
        this._conditionForRequest = conditionFn;
    }

    setConditionForResponse(conditionFn: ResponseCondition) {
        this._conditionForResponse = conditionFn;
    }

    requestProcessor(proxyRequest: http.ClientRequest) {
    }

    responseProcessor(clientRequest: http.ClientRequest,
                      proxyResponse: http.ServerResponse) {
    }

    setRequestProcessor(processorFn: RequestProcessor) {
        this._requestProcessor = processorFn;
    }

    setResponseProcessor(processorFn: ResponseProcessor) {
        this._responseProcessor = processorFn;
    }

    setRequestFilter(filter: stream.Transform | null) {
        this._requestFilter = filter;
    };

    setResponseFilter(filter: stream.Transform | null) {
        this._responseFilter = filter;
    }

    _onRequest(session: Session) {
        this._logger?.debug(`${this.pluginName}: onRequest...`);
        const condition = this._conditionForRequest;
        const processor = this._requestProcessor;
        const filter = this._requestFilter;

        session.addRequestFilter(condition, processor, filter);
    }

    _onResponse(session: Session) {
        this._logger?.debug(`${this.pluginName}: onResponse...`);
        const condition = this._conditionForResponse;
        const processor = this._responseProcessor;
        const filter = this._responseFilter;

        //console.log(condition);
        session.addResponseFilter(condition, processor, filter);
    }
}

