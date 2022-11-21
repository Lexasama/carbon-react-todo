async function checkErrors(resp: any) {
    if (resp.ok) return resp;

    let errorMsg = `ERROR ${resp.status} (${resp.statusText})`;
    let serverText = await resp.text();
    if (serverText) errorMsg = `${errorMsg}: ${serverText}`;

    const error = new Error(errorMsg);
    error.message = resp;
    throw error;
}

async function toJSON(resp: any) {
    const result = await resp.text();
    if (result) return JSON.parse(result);
}

async function send(url: string, method: string, data?: any, contentType?: any, isRetrying?: boolean): Promise<object> {
    let options: any = {
        method: method,
        mode: 'cors'
    };
    if (data) options.body = JSON.stringify(data);
    if (contentType) options.headers['Content-Type'] = contentType;

    let result = await fetch(url, options);

    if (result.status === 401 && !isRetrying) {
        send(url, method, data, contentType, true);
    }

    await checkErrors(result);

    return await toJSON(result);


}

export function postAsync(url: string, data: any) {
    return send(url, 'POST', data, 'application/json');
}

export function putAsync(url: string, data: any) {
    return send(url, 'PUT', data, 'application/json');
}

export function getAsync(url: string): any {
    return send(url, 'GET');
}

export function getStringAsync(url: string) {
    return send(url, 'GET', null, null, false);
}

export function deleteAsync(url: string) {
    return send(url, 'DELETE');
}