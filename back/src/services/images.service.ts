import config from "../config/env.js";

export function isImageSafe(url: string): boolean {
    for (let source of config.imageSource) {
        if (url.match(source.regex)) {
            if (source.verifyFileExtension) {
                if (url.split(".").pop()) {
                    const extension = url.split(".").pop();
                    for (let allowedFileExtension of config.allowedFileExtensions) {
                        if (extension.toLowerCase() === allowedFileExtension) {
                            return true;
                        }
                    }
                    return false;
                } else {
                    return false;
                }
            } else {
                return true;
            }
        }
    }
    return false;
}