import { useEffect } from "react";

// eslint-disable-next-line react-refresh/only-export-components
const ApplyBlackWithMessage = () => {
  document.documentElement.classList.add("screenshot-detected");
  const messageContainer = document.createElement("div");
  messageContainer.id = "refresh-message";
  messageContainer.style.position = "fixed";
  messageContainer.style.top = "50%";
  messageContainer.style.left = "50%";
  messageContainer.style.transform = "translate(-50%, -50%)";
  messageContainer.style.backgroundColor = "white";
  messageContainer.style.color = "black";
  messageContainer.style.padding = "20px";
  messageContainer.style.borderRadius = "8px";
  messageContainer.style.zIndex = "10000";
  messageContainer.style.textAlign = "center";
  messageContainer.innerHTML = `
        <p>
          This website might have sensitive information. As a security measure, taking screenshots or performing any action above the website screen is not allowed. This is to protect both you and us from potential security threats. Please refresh the page to continue.
        </p>
        <button style="background-color: #4CAF50; color: white; padding: 14px 20px; margin: 8px 0; border: none; cursor: pointer; border-radius: 5px;" onclick="window.location.reload()">Refresh</button>`;
  document.body.appendChild(messageContainer);
};

const usePersistScreenshotBlackout = () => {
  useEffect(() => {
    let isScreenshotDetected = false;
    let isBlurred = false;
    
    const blurContent = () => {
      if (!isBlurred) {
        document.body.style.filter = 'blur(20px)';
        document.body.style.visibility = 'hidden';
        document.body.style.background = 'black';
        isBlurred = true;
        setTimeout(() => handleScreenShotDetection(), 0);
      }
    };
    
    const handleScreenShotDetection = () => {
      if (!isScreenshotDetected) {
        isScreenshotDetected = true;
        ApplyBlackWithMessage();
      }
    };

    // Battery API for power button detection
    const monitorBattery = async () => {
      try {
        const battery = await navigator.getBattery();
        battery.addEventListener('levelchange', () => blurContent());
        battery.addEventListener('chargingchange', () => blurContent());
      } catch (e) {

        console.log(e); 
      }
      
    };
    
    // Wake Lock API for power button
    const monitorWakeLock = async () => {
      try {
        const wakeLock = await navigator.wakeLock.request('screen');
        wakeLock.addEventListener('release', () => blurContent());
      } catch (e) {
        console.log(e);
        
      }
    };
    
    // Device Motion for volume buttons
    const handleDeviceMotion = (event) => {
      if (event.acceleration) {
        const totalAccel = Math.abs(event.acceleration.x) + 
                          Math.abs(event.acceleration.y) + 
                          Math.abs(event.acceleration.z);
        if (totalAccel > 10) blurContent();
      }
    };
    
    // Audio context for volume detection
    const detectVolumeButton = () => {
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        gainNode.gain.value = 0.001;
        oscillator.frequency.value = 20000;
        oscillator.start();
        
        audioContext.addEventListener('statechange', () => {
          if (audioContext.state === 'suspended' || audioContext.state === 'interrupted') {
            blurContent();
          }
        });
      } catch (e) {
        console.log(e);
        
      }
    };
    
    // Performance monitoring for system interruptions
    const monitorPerformance = () => {
      let lastTime = performance.now();
      const checkPerformance = () => {
        const currentTime = performance.now();
        if (currentTime - lastTime > 150) blurContent();
        lastTime = currentTime;
        requestAnimationFrame(checkPerformance);
      };
      requestAnimationFrame(checkPerformance);
    };
    
    // All event handlers
    const handleVisiblityChange = () => blurContent();
    const handleWindowBlur = () => blurContent();
    const handlePageHide = () => blurContent();
    const handleBeforeUnload = () => blurContent();
    const handleResize = () => blurContent();

    const handleOrientationChange = () => blurContent();
    const handleNetworkChange = () => blurContent();
    
    const handleTouchStart = (e) => {
      if (e.touches.length > 1) blurContent();
    };
    
    const handleKeyDown = (e) => {
      blurContent();
      e.preventDefault();
      return false;
    };
    
    const handleContextMenu = (e) => {
      e.preventDefault();
      blurContent();
      return false;
    };
    
    // Initialize all monitoring
    monitorBattery();
    monitorWakeLock();
    detectVolumeButton();
    monitorPerformance();
    
    // Add all event listeners
    window.addEventListener("blur", handleWindowBlur);
    window.addEventListener("focusout", handleWindowBlur);
    window.addEventListener("pagehide", handlePageHide);
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("resize", handleResize);

    window.addEventListener("orientationchange", handleOrientationChange);
    window.addEventListener("online", handleNetworkChange);
    window.addEventListener("offline", handleNetworkChange);
    document.addEventListener("visibilitychange", handleVisiblityChange);
    document.addEventListener("keydown", handleKeyDown, true);
    document.addEventListener("keyup", handleKeyDown, true);
    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchmove", handleTouchStart);
    document.addEventListener("touchend", handleTouchStart);
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("dragstart", (e) => e.preventDefault());
    document.addEventListener("drop", (e) => e.preventDefault());
    window.addEventListener("devicemotion", handleDeviceMotion);

    return () => {
      window.removeEventListener("blur", handleWindowBlur);
      window.removeEventListener("focusout", handleWindowBlur);
      window.removeEventListener("pagehide", handlePageHide);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("resize", handleResize);

      window.removeEventListener("orientationchange", handleOrientationChange);
      window.removeEventListener("online", handleNetworkChange);
      window.removeEventListener("offline", handleNetworkChange);
      document.removeEventListener("visibilitychange", handleVisiblityChange);
      document.removeEventListener("keydown", handleKeyDown, true);
      document.removeEventListener("keyup", handleKeyDown, true);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchStart);
      document.removeEventListener("touchend", handleTouchStart);
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("dragstart", (e) => e.preventDefault());
      document.removeEventListener("drop", (e) => e.preventDefault());
      window.removeEventListener("devicemotion", handleDeviceMotion);
    };
  }, []);
};

export default usePersistScreenshotBlackout;