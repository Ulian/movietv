export function handleError(error: any): Promise<any> {
  console.error(JSON.parse(error._body).message || error);
  return Promise.reject(JSON.parse(error._body) || error);
}
