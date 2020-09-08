/**
 * Create the Concept-colored gradient from a 2d rendering context
 * @param ctx the canvas context for which to create the gradient
 * @return the gradient that can be used with Chart.js
 */
export function createStrokeGradient(ctx) {
    const gradient = ctx.createLinearGradient(
        ctx.canvas.width / 2, 0,
        ctx.canvas.width / 2, ctx.canvas.height
    );
    gradient.addColorStop(0, "#1a73e8");
    gradient.addColorStop(1, "#5791de");
    return gradient;
}

/**
 * Create a slightly-transparent Concept-colored gradient from a 2d rendering context
 * @param ctx the canvas context for which to create the gradient
 * @return the gradient that can be used with Chart.js
 */
export function createBackgroundGradient(ctx) {
    const bgGradient = ctx.createLinearGradient(
        ctx.canvas.width / 2, 0,
        ctx.canvas.width / 2, ctx.canvas.height
    );
    bgGradient.addColorStop(0, "#1a73e8cc");
    bgGradient.addColorStop(1, "#5791decc");
    return bgGradient;
}