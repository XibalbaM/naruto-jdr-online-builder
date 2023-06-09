import config from "../config/env.js";

/**
 * Checks if the image is safe to be displayed
 *
 * To be safe, the image must be from a trusted source and have a valid file extension
 *
 * The trusted sources are defined in the config file
 * @param url The url of the image
 */
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