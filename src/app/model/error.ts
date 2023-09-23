export interface Error {

    status: number;
    timestamp: string;
    type: string;
    title: string;
    detail: string;
    objects: Array<Object>;

}

interface Object {
    name: string;
    userMessage: string;
}
