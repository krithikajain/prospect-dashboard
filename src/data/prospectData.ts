import { normalizeProspectData } from '../lib/normalizer';
import type { DashboardData } from '../types/dashboard';
import rawData from './studio_results_20260212_1512.json';

// Get the first prospect from the raw data array
const rawProspect = rawData[0];

// Normalize it
export const currentProspect: DashboardData = normalizeProspectData(rawProspect);
