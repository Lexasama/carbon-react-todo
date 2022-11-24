async function checkErrors(resp: any) {
    if (resp.ok) return resp;

    let errorMsg = `ERROR ${resp.status} (${resp.statusText})`;
    let serverText = await resp.text();
    if (serverText) errorMsg = `${errorMsg}: ${serverText}`;

    const error = new Error(errorMsg);
    error.message = resp;
    throw error;
}

export async function toJSON(resp: Response) {
    const result = await resp.text();
    if (result) return JSON.parse(result);
}

async function send(url: string, method: string, data?: any, contentType?: string): Promise<Response> {
    let options: any = {
        method: method,
        headers: {
            "Content-Type": contentType
        },
        mode: 'cors',
    };
    if (data) options.body = JSON.stringify(data);
    if (contentType) options.headers['Content-Type'] = contentType;

    let result = await fetch(url, options);

    await checkErrors(result);

    return result;
}

export function postAsync(url: string, data: any) {
    return send(url, 'POST', data, 'application/json');
}

export function putAsync(url: string, data: any) {
    return send(url, "PUT", data, 'application/json');
}

export function getAsync(url: string) {
    return send(url, 'GET');
}

export function deleteAsync(url: string) {
    return send(url, 'DELETE');
}