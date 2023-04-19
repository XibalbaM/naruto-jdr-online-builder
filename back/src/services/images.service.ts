import config from "../config/env.js";

export function isImageSafe(url: string): boolean {
    config.imageSource.forEach((source) => {
        if (url.match(source.regex)) {
            if (source.verifyFileExtension) {
                if (url.split('.').pop()) {
                    const extension = url.split('.').pop();
                    return config.allowedFileExtensions.includes(extension.toLowerCase())
                } else {
                    return false;
                }
            } else {
                return true;
            }
        } else {
            return false;
        }
    });
    return false;
}