var SoundFileUtilities = /** @class */ (function () {
  function SoundFileUtilities() {
    var FACESCAN_SUCCESSFUL_SOUND_FILE =
      '/facetec/audio/facescan_successful_sound_file.mp3';
    var PLEASE_FRAME_YOUR_FACE_SOUND_FILE =
      '/facetec/audio/please_frame_your_face_sound_file.mp3';
    var PLEASE_MOVE_CLOSER_SOUND_FILE =
      '/facetec/audio/please_move_closer_sound_file.mp3';
    var PLEASE_PRESS_BUTTON_SOUND_FILE =
      '/facetec/audio/please_press_button_sound_file.mp3';
    var PLEASE_RETRY_SOUND_FILE = '/facetec/audio/please_retry_sound_file.mp3';
    var UPLOADING_SOUND_FILE = '/facetec/audio/uploading_sound_file.mp3';

    this.setVocalGuidanceSoundFiles = function (zoomCustomization) {
      zoomCustomization.vocalGuidanceCustomization.pleaseFrameYourFaceInTheOvalSoundFile =
        PLEASE_FRAME_YOUR_FACE_SOUND_FILE;
      zoomCustomization.vocalGuidanceCustomization.pleaseMoveCloserSoundFile =
        PLEASE_MOVE_CLOSER_SOUND_FILE;
      zoomCustomization.vocalGuidanceCustomization.pleaseRetrySoundFile =
        PLEASE_RETRY_SOUND_FILE;
      zoomCustomization.vocalGuidanceCustomization.uploadingSoundFile =
        UPLOADING_SOUND_FILE;
      zoomCustomization.vocalGuidanceCustomization.facescanSuccessfulSoundFile =
        FACESCAN_SUCCESSFUL_SOUND_FILE;
      zoomCustomization.vocalGuidanceCustomization.pleasePressTheButtonToStartSoundFile =
        PLEASE_PRESS_BUTTON_SOUND_FILE;
      return zoomCustomization;
    };
  }

  return SoundFileUtilities;
})();
var SoundFileUtilities = SoundFileUtilities;
