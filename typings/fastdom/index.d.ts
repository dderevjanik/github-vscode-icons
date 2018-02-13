declare module 'fastdom' {
  /**
   * Clears any scheduled job.
   */
  export const clear: () => void;

  /**
   * Schedules a job for the 'measure' queue. Returns a unique ID that can be used to clear the scheduled job.
   */
  export const measure: (callback: () => void) => void;

  /**
   * Schedules a job for the 'mutate' queue. Returns a unique ID that can be used to clear the scheduled job.
   */
  export const mutate: (callback: () => void) => void;

  export const extend: () => void;
}
