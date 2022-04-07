import { ClearLatestEnrollmentIdentifier, GetLatestEnrollmentIdentifier, OnComplete } from './sampleAppControllerReference/SampleAppControllerReference';
export declare var SampleApp: {
    onLivenessCheckPressed: () => void;
    onEnrollUserPressed: () => void;
    onAuthenticateUserPressed: () => void;
    onPhotoIDMatchPressed: () => void;
    onDesignShowcasePressed: () => void;
    onComplete: OnComplete;
    getLatestEnrollmentIdentifier: GetLatestEnrollmentIdentifier;
    clearLatestEnrollmentIdentifier: ClearLatestEnrollmentIdentifier;
    onVocalGuidanceSettingsButtonPressed: () => void;
    onViewAuditTrailPressed: () => void;
    latestSessionResult: null;
    latestIDScanResult: null;
};
