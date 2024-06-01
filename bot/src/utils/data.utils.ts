interface IElement {
    _id: string | number;
}

export function findById<T extends IElement>(array: T[], id: string | number): T | undefined {
    return array.find((element) => element._id === id);
}