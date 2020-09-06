export const VERY_POSITIVE = 0.9;
export const POSITIVE = 0.3;
export const SLIGHTLY_POSITIVE = 0.1;

export const SLIGHTLY_NEGATIVE = -0.1;
export const NEGATIVE = -0.3;
export const VERY_NEGATIVE = -0.9;

// https://docs.google.com/spreadsheets/d/1Au41gyO1ETR2695Aa2MfvwDWGhXq-MEMikiWSvlDrqk/edit?usp=sharing
export const MIXED = 0.0235;

export function getStringForScore(score, normalizedMagnitude = 0) {
    if (score >= VERY_POSITIVE) {
        return "Very Positive";
    } else if (score >= POSITIVE) {
        return "Positive";
    } else if (score >= SLIGHTLY_POSITIVE) {
        return "Slightly Positive";
    } else if (score >= SLIGHTLY_NEGATIVE) {
        if (normalizedMagnitude >= MIXED) {
            return "Mixed";
        }
        else {
            return "Neutral";
        }
    } else if (score >= NEGATIVE) {
        return "Slightly Negative";
    } else if (score >= VERY_NEGATIVE) {
        return "Negative";
    } else {
        return "Very Negative";
    }
}
