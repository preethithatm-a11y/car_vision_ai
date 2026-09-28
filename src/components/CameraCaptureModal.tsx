import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Camera, X, RefreshCw, AlertCircle, Sparkles } from 'lucide-react';
import { audioService } from '../services/audioService';

interface CameraCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (imageDataUrl: string) => void;
}

export const CameraCaptureModal: React.FC<CameraCaptureModalProps> = ({
  isOpen,
  onClose,
  onCapture,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [countdown, setCountdown] = useState<number | null>(null);
  const [flash, setFlash] = useState<boolean>(false);

  const stopStream = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  }, [stream]);

  const startCamera = useCallback(async () => {
    setError(null);
    try {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }

      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: { ideal: facingMode },
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      };

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error('Camera access error:', err);
      setError('Unable to access camera. Please allow camera permissions in your browser or try uploading an image instead.');
    }
  }, [facingMode, stream]);

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopStream();
    }
    return () => {
      stopStream();
    };
  }, [isOpen, facingMode]);

  const takeSnapshot = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Trigger flash animation & audio
    setFlash(true);
    audioService.playClick();
    setTimeout(() => setFlash(false), 200);

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);

    stopStream();
    onCapture(dataUrl);
    onClose();
  };

  const handleCountdownTrigger = () => {
    setCountdown(3);
    audioService.playScanBeep(600);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(interval);
          takeSnapshot();
          return null;
        }
        audioService.playScanBeep(600 + (4 - prev) * 100);
        return prev - 1;
      });
    }, 1000);
  };

  const toggleFacingMode = () => {
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-cyan-500/40 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.25)] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Vehicle Optical Scanner</h3>
              <p className="text-xs text-slate-400">Position vehicle clearly inside the guide frame</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Viewport */}
        <div className="relative aspect-[4/3] sm:aspect-[16/10] bg-black flex items-center justify-center overflow-hidden">
          {error ? (
            <div className="p-8 text-center max-w-md">
              <AlertCircle className="w-12 h-12 text-rose-400 mx-auto mb-3" />
              <p className="text-sm text-slate-300 mb-4">{error}</p>
              <button
                type="button"
                onClick={startCamera}
                className="px-4 py-2 rounded-xl bg-cyan-500 text-black font-semibold text-xs hover:bg-cyan-400 transition-colors"
              >
                Retry Camera
              </button>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />

              {/* Shutter Flash effect */}
              {flash && (
                <div className="absolute inset-0 bg-white pointer-events-none transition-opacity duration-200" />
              )}

              {/* Automotive Optical Guide Grid */}
              <div className="absolute inset-8 border border-cyan-400/40 rounded-2xl pointer-events-none flex items-center justify-center">
                {/* Guide Crosshairs */}
                <div className="w-8 h-8 border-t-2 border-l-2 border-cyan-400 absolute top-0 left-0" />
                <div className="w-8 h-8 border-t-2 border-r-2 border-cyan-400 absolute top-0 right-0" />
                <div className="w-8 h-8 border-b-2 border-l-2 border-cyan-400 absolute bottom-0 left-0" />
                <div className="w-8 h-8 border-b-2 border-r-2 border-cyan-400 absolute bottom-0 right-0" />

                {/* Center target */}
                <div className="w-12 h-12 border border-dashed border-cyan-400/60 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-cyan-400" />
                </div>

                <span className="absolute bottom-3 text-[10px] font-mono uppercase tracking-widest text-cyan-300 bg-slate-950/80 px-2.5 py-1 rounded-md border border-cyan-500/30">
                  Align Car Profile Inside Frame
                </span>
              </div>

              {/* Countdown Overlay */}
              {countdown !== null && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-7xl font-mono font-extrabold text-cyan-400 animate-ping">
                    {countdown}
                  </span>
                </div>
              )}
            </>
          )}

          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* Footer Controls */}
        <div className="p-4 sm:p-6 bg-slate-950 flex items-center justify-between border-t border-slate-800">
          <button
            type="button"
            onClick={toggleFacingMode}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">Flip Camera</span>
          </button>

          {/* Shutter Capture Button */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleCountdownTrigger}
              disabled={!!error || countdown !== null}
              className="p-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-black font-bold flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.5)] transform active:scale-95 transition-all"
              title="3s Timer Capture"
            >
              <Sparkles className="w-5 h-5 mr-1.5" />
              <span className="text-xs font-mono uppercase">3s Timer</span>
            </button>

            <button
              type="button"
              onClick={takeSnapshot}
              disabled={!!error || countdown !== null}
              className="w-14 h-14 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 p-1 flex items-center justify-center shadow-[0_0_25px_rgba(6,182,212,0.6)] transform active:scale-90 transition-transform"
              title="Instant Capture"
            >
              <div className="w-full h-full rounded-full border-2 border-white/80 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-white" />
              </div>
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
