import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import {
  Check,
  Gauge,
  Maximize,
  Minimize,
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  Volume1,
  Volume2,
  VolumeX,
} from 'lucide-react'
import { useSettingsStore } from '@/store/settingsStore'
import { toneBackground } from '@/lib/tones'
import type { Tone } from '@/types'
import { cn } from '@/utils/cn'
import { clamp, formatClock } from '@/utils/format'
import { Menu } from '@/components/common/Menu'

const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2]
const TICK_MS = 250

interface VideoPlayerProps {
  title: string
  subtitle: string
  durationSeconds: number
  tone: Tone
  /** Remount the player (via `key`) per lesson so playback always starts fresh. */
}

/**
 * Video-player-style UI with simulated playback. There is no video backend: a timer advances
 * the playhead so every control (play, seek, volume, speed, fullscreen) behaves like a real player.
 */
export function VideoPlayer({ title, subtitle, durationSeconds, tone }: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const defaultSpeed = useSettingsStore((state) => state.defaultSpeed)
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState(0)
  const [volume, setVolume] = useState(0.8)
  const [muted, setMuted] = useState(false)
  const [speed, setSpeed] = useState(SPEEDS.includes(defaultSpeed) ? defaultSpeed : 1)
  const [fullscreen, setFullscreen] = useState(false)

  const ended = time >= durationSeconds
  const progress = durationSeconds === 0 ? 0 : (time / durationSeconds) * 100

  // The only effect that advances playback: a ticking timer while playing.
  useEffect(() => {
    if (!playing) return
    const timer = window.setInterval(() => {
      setTime((current) => {
        const next = current + (TICK_MS / 1000) * speed
        if (next >= durationSeconds) {
          setPlaying(false)
          return durationSeconds
        }
        return next
      })
    }, TICK_MS)
    return () => window.clearInterval(timer)
  }, [playing, speed, durationSeconds])

  useEffect(() => {
    const onChange = () => setFullscreen(document.fullscreenElement === containerRef.current)
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])

  const togglePlay = () => {
    if (ended) setTime(0)
    setPlaying((value) => !value || ended)
  }
  const seekBy = (seconds: number) => setTime((current) => clamp(current + seconds, 0, durationSeconds))
  const toggleFullscreen = () => {
    if (document.fullscreenElement) void document.exitFullscreen()
    else void containerRef.current?.requestFullscreen?.()
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLButtonElement) {
      if (event.key !== 'f' && event.key !== 'm') return
    }
    const actions: Record<string, () => void> = {
      ' ': togglePlay,
      k: togglePlay,
      ArrowLeft: () => seekBy(-5),
      ArrowRight: () => seekBy(5),
      f: toggleFullscreen,
      m: () => setMuted((value) => !value),
    }
    const action = actions[event.key]
    if (action) {
      event.preventDefault()
      action()
    }
  }

  const VolumeIcon = muted || volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2
  const iconButton =
    'flex size-9 items-center justify-center rounded-lg text-white transition hover:bg-white/15 focus-visible:outline-white'

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      role="group"
      aria-label={`Video player: ${title}`}
      onKeyDown={onKeyDown}
      className={cn(
        'group relative isolate w-full select-none overflow-hidden bg-slate-950 text-white shadow-card-hover focus-visible:outline-offset-2',
        fullscreen ? 'h-full' : 'aspect-video rounded-2xl',
      )}
    >
      {/* Stage: generated "lecture slide" artwork */}
      <button
        type="button"
        onClick={togglePlay}
        aria-label={playing ? 'Pause' : ended ? 'Replay' : 'Play'}
        className="absolute inset-0 -z-10 flex items-center justify-center text-left"
        style={{ background: toneBackground(tone) }}
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgb(255_255_255)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255)_1px,transparent_1px)] [background-size:32px_32px]"
        />
        <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30" />
        <span className="relative mx-auto max-w-2xl px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/75 sm:text-sm">{subtitle}</span>
          <span className="mt-2 block text-xl font-extrabold leading-tight sm:text-3xl lg:text-4xl">{title}</span>
        </span>
      </button>

      {!playing && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="flex size-16 items-center justify-center rounded-full bg-white/95 text-slate-900 shadow-xl transition group-hover:scale-105 sm:size-20">
            {ended ? <RotateCcw className="size-7" /> : <Play className="ml-1 size-8 fill-current" />}
          </span>
        </div>
      )}

      {playing && (
        <div aria-hidden="true" className="pointer-events-none absolute left-4 top-4 flex items-end gap-0.5 rounded-lg bg-black/40 px-2.5 py-2 backdrop-blur">
          {[0, 1, 2, 3].map((bar) => (
            <span
              key={bar}
              className="w-1 origin-bottom animate-float rounded-full bg-white"
              style={{ height: 10 + bar * 3, animationDelay: `${bar * 0.25}s`, animationDuration: '1.2s' }}
            />
          ))}
        </div>
      )}

      {/* Control bar */}
      <div
        className={cn(
          'absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-3 pb-2.5 pt-10 transition-opacity sm:px-4',
          playing ? 'opacity-0 focus-within:opacity-100 group-hover:opacity-100' : 'opacity-100',
        )}
      >
        <input
          type="range"
          min={0}
          max={durationSeconds}
          step={1}
          value={Math.floor(time)}
          onChange={(event) => setTime(Number(event.target.value))}
          aria-label="Seek"
          aria-valuetext={`${formatClock(time)} of ${formatClock(durationSeconds)}`}
          className="player-range h-1.5 w-full cursor-pointer appearance-none rounded-full"
          style={{
            background: `linear-gradient(to right, var(--color-brand-400) ${progress}%, rgb(255 255 255 / 0.3) ${progress}%)`,
          }}
        />
        <div className="mt-1.5 flex items-center gap-1 sm:gap-2">
          <button type="button" className={iconButton} onClick={togglePlay} aria-label={playing ? 'Pause' : ended ? 'Replay' : 'Play'}>
            {playing ? <Pause className="size-5 fill-current" /> : <Play className="size-5 fill-current" />}
          </button>
          <button type="button" className={cn(iconButton, 'hidden sm:flex')} onClick={() => seekBy(-10)} aria-label="Rewind 10 seconds">
            <RotateCcw className="size-4.5" />
          </button>
          <button type="button" className={cn(iconButton, 'hidden sm:flex')} onClick={() => seekBy(10)} aria-label="Forward 10 seconds">
            <RotateCw className="size-4.5" />
          </button>
          <span className="px-1 text-xs font-semibold tabular-nums sm:text-sm">
            {formatClock(time)} <span className="text-white/60">/ {formatClock(durationSeconds)}</span>
          </span>

          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            <div className="hidden items-center gap-1 sm:flex">
              <button type="button" className={iconButton} onClick={() => setMuted((value) => !value)} aria-label={muted ? 'Unmute' : 'Mute'} aria-pressed={muted}>
                <VolumeIcon className="size-5" />
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={muted ? 0 : volume}
                onChange={(event) => {
                  setVolume(Number(event.target.value))
                  setMuted(false)
                }}
                aria-label="Volume"
                className="player-range h-1 w-20 cursor-pointer appearance-none rounded-full"
                style={{
                  background: `linear-gradient(to right, #fff ${(muted ? 0 : volume) * 100}%, rgb(255 255 255 / 0.3) ${(muted ? 0 : volume) * 100}%)`,
                }}
              />
            </div>

            <Menu
              align="end"
              side="top"
              button={(props) => (
                <button type="button" className={cn(iconButton, 'w-auto gap-1.5 px-2 text-xs font-bold')} aria-label={`Playback speed, ${speed}x`} {...props}>
                  <Gauge className="size-4.5" />
                  {speed}x
                </button>
              )}
              items={SPEEDS.map((value) => ({
                label: `${value}x${value === 1 ? ' (Normal)' : ''}`,
                icon: value === speed ? <Check className="size-4 text-primary-ink" /> : <span className="size-4" />,
                onSelect: () => setSpeed(value),
              }))}
            />

            <button type="button" className={iconButton} onClick={toggleFullscreen} aria-label={fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}>
              {fullscreen ? <Minimize className="size-5" /> : <Maximize className="size-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
