// c:/Users/nreed/OneDrive/Desktop/FarmSite/js/admin/utils.js
/**
 * Strips "$" and "," and turns a string or number into a clean float.
 * Returns 0 for invalid input.
 * @param {string | number | null | undefined} value
 * @returns {number}
 */
export const parseMoney = (value) => {
    if (value === null || value === undefined) return 0;
    // Remove $ signs and commas, then convert to a decimal number
    const cleanString = value.toString().replace(/[$,]/g, '');
    const number = parseFloat(cleanString);
    // If it's not a valid number, return 0
    return isNaN(number) ? 0 : number;
};

/**
 * Converts a string or number to a float, returning 0 for invalid input.
 * @param {string | number} value
 * @returns {number}
 */
export const toMoney = (value) => {
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
        const cleaned = value.replace(/[^0-9.-]+/g, "");
        return parseFloat(cleaned) || 0;
    }
    return 0;
};

/**
 * Displays a short-lived toast message at the bottom-right of the screen.
 * @param {string} msg The message to display.
 */
export const showToast = (msg) => {
    const el = document.createElement('div');
    el.className = "fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded shadow-lg z-50 text-sm font-bold animate-bounce";
    el.innerText = msg;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2000);
};

/**
 * Compresses an image file to be under a certain size and width.
 * @param {File} file 
 * @param {Object} options 
 * @returns {Promise<File>}
 */
export const compressImage = (file, { maxWidth = 1200, quality = 0.8, maxSizeBytes = 500 * 1024 } = {}) => {
    return new Promise((resolve, reject) => {
        if (!file || !file.type.startsWith('image/')) {
            return resolve(file);
        }

        const image = new Image();
        const url = URL.createObjectURL(file);
        image.src = url;

        image.onload = () => {
            URL.revokeObjectURL(url);
            
            // Ensure output filename is .jpg since we force image/jpeg
            let newName = file.name;
            const lastDot = newName.lastIndexOf('.');
            if (lastDot !== -1) {
                newName = newName.substring(0, lastDot) + '.jpg';
            } else {
                newName = newName + '.jpg';
            }

            const process = (w, h, q) => {
                const canvas = document.createElement('canvas');
                canvas.width = w;
                canvas.height = h;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(image, 0, 0, w, h);
                
                canvas.toBlob((blob) => {
                    if (!blob) return reject(new Error("Compression failed"));
                    
                    if (blob.size <= maxSizeBytes) {
                        const newFile = new File([blob], newName, {
                            type: 'image/jpeg',
                            lastModified: Date.now(),
                        });
                        resolve(newFile);
                    } else if (q > 0.2) {
                        process(w, h, q - 0.1);
                    } else {
                        // Quality low, still too big. Resize dimensions.
                        const scale = 0.9;
                        const newW = Math.floor(w * scale);
                        const newH = Math.floor(h * scale);
                        if (newW < 100) { // Safety floor
                             resolve(new File([blob], newName, { type: 'image/jpeg', lastModified: Date.now() }));
                             return;
                        }
                        process(newW, newH, 0.8);
                    }
                }, 'image/jpeg', q);
            };
            
            let width = image.width;
            let height = image.height;
            if (width > maxWidth) {
                height = Math.round((height * maxWidth) / width);
                width = maxWidth;
            }
            
            process(width, height, quality);
        };
        image.onerror = (error) => reject(error);
    });
};
