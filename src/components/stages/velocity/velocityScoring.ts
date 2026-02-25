export interface VelocityScores {
    ecosystemFit: number;
    accessStrength: number;
    intent: number;
    switchingResistance: number;
    velocityPath: number;
    lightLabel: 'Green Light' | 'Yellow Light' | 'Red Light';
}

export function calculateVelocityScores(): VelocityScores {
    // Hardcoded mock values for the pre-qualification dashboard
    // In a real app, these would be derived from the `DashboardData`
    const ecosystemFit = 85;
    const accessStrength = 60;
    const intent = 90;
    const switchingResistance = 80; // High friction, 5-year contract signed recently

    const baseScore = (ecosystemFit + accessStrength + intent) / 3; // 235 / 3 = 78.33
    const penalty = switchingResistance * 0.50; // 80 * 0.50 = 40
    let velocityPath = Math.round(baseScore - penalty); // 78 - 40 = 38

    // Clamp between 0 and 100
    velocityPath = Math.max(0, Math.min(100, velocityPath));

    let lightLabel: 'Green Light' | 'Yellow Light' | 'Red Light' = 'Red Light';
    if (velocityPath >= 75) lightLabel = 'Green Light';
    else if (velocityPath >= 55) lightLabel = 'Yellow Light';

    return {
        ecosystemFit,
        accessStrength,
        intent,
        switchingResistance,
        velocityPath,
        lightLabel
    };
}
