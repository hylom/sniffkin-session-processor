;
export class SessionProcessorPlugin {
    constructor(option = {}) {
        this._requestProcessor = null;
        this._requestFilter = null;
        this._responseProcessor = null;
        this._responseFilter = null;
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
    init(context) {
        var _a;
        context.proxy.addHandler('request', this._onRequest.bind(this));
        context.proxy.addHandler('response', this._onResponse.bind(this));
        this._logger = context.logger;
        (_a = this._logger) === null || _a === void 0 ? void 0 : _a.debug(`${this.pluginName}: init done.`);
    }
    conditionForRequest(clientRequest) {
        return true;
    }
    conditionForResponse(clientRequest, serverResponse) {
        return true;
    }
    setConditionForRequest(conditionFn) {
        this._conditionForRequest = conditionFn;
    }
    setConditionForResponse(conditionFn) {
        this._conditionForResponse = conditionFn;
    }
    requestProcessor(proxyRequest) {
    }
    responseProcessor(clientRequest, proxyResponse) {
    }
    setRequestProcessor(processorFn) {
        this._requestProcessor = processorFn;
    }
    setResponseProcessor(processorFn) {
        this._responseProcessor = processorFn;
    }
    setRequestFilter(filter) {
        this._requestFilter = filter;
    }
    ;
    setResponseFilter(filter) {
        this._responseFilter = filter;
    }
    _onRequest(session) {
        var _a;
        (_a = this._logger) === null || _a === void 0 ? void 0 : _a.debug(`${this.pluginName}: onRequest...`);
        const condition = this._conditionForRequest;
        const processor = this._requestProcessor;
        const filter = this._requestFilter;
        session.addRequestFilter(condition, processor, filter);
    }
    _onResponse(session) {
        var _a;
        (_a = this._logger) === null || _a === void 0 ? void 0 : _a.debug(`${this.pluginName}: onResponse...`);
        const condition = this._conditionForResponse;
        const processor = this._responseProcessor;
        const filter = this._responseFilter;
        //console.log(condition);
        session.addResponseFilter(condition, processor, filter);
    }
}
