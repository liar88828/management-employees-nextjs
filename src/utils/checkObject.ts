import { TMethod } from "@/interface/Utils";

export const checkObject = (objectName: TMethod | null | undefined): boolean => {
    if (!objectName || typeof objectName !== 'object') return true;
    return Object.keys(objectName).length === 0;
};
