export declare class AdditionalScreens {
    private static elementToCopyStylesFrom;
    static setServerUpgradeStyling: (elementToCopyStylesFrom: HTMLElement, functionToCallOnExitFromAdditionalScreen: () => void) => void;
    static showServerUpGradeView: () => void;
    private static showAdditionalScreen;
    static exitAdditionalScreen: (fadeInMainUIFunction: () => void) => void;
}
