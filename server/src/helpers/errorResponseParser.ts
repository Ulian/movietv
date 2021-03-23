export interface MovieDBErrorResponse {
    response: {
        text: string,
    }
}

function errorResponseParser(error: MovieDBErrorResponse): string {
    return JSON.parse(error.response.text).errors.join(', ');
}

export default errorResponseParser;
