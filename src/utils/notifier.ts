export function playNotificationSound() {
  const audioSrc = "/notification.wav";
  const audio = new Audio(audioSrc);

  try {
    void audio.play();
  } catch (err) {
    console.warn("Audio playback failed:", err);
  }
}
