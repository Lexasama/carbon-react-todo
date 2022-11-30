export async function toJSON(resp: Response) {
    const result = await resp.text();
    if (result) return JSON.parse(result);
}

type RequestMethod = 'POST' | 'PUT' | 'DELETE' | 'GET';

async function send(url: string, method: RequestMethod, data?: any, contentType?: string): Promise<Response> {
    let options: any = {
        method: method,
        headers: {
            "Content-Type": contentType
        },
        mode: 'cors',
    };
    if (data) options.body = JSON.stringify(data);
    if (contentType) options.headers['Content-Type'] = contentType;

    return await fetch(url, options);
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