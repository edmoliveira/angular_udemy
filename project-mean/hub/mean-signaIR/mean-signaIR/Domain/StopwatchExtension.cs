using System;
using System.Diagnostics;

namespace mean_signaIR.Domain
{
    /// <summary>
    /// Provides a extension of the Stopwatch class.
    /// </summary>
    public static class StopwatchExtension
    {
        #region Methods public

        /// <summary>
        /// Stops measuring elapsed time for an interval and gets the total elapsed time measured by the current instance.
        /// </summary>
        /// <param name="source">Stopwatch object</param>
        /// <returns>A read-only System.TimeSpan representing the total elapsed time measured by the current instance.</returns>
        public static TimeSpan StopAndGetTimeSpan(this Stopwatch source)
        {
            source.Stop();

            return source.Elapsed;
        }

        /// <summary>
        /// Stops measuring elapsed time for an interval and Gets the total elapsed time measured by the current instance, in milliseconds.
        /// </summary>
        /// <param name="source">Stopwatch object</param>
        /// <returns> A read-only long integer representing the total number of milliseconds measured by the current instance.</returns>
        public static long StopAndGetMilliseconds(this Stopwatch source)
        {
            source.Stop();

            return source.ElapsedMilliseconds;
        }

        /// <summary>
        /// Stops measuring elapsed time for an interval and Gets the total elapsed time measured by the current instance, in timer ticks.
        /// </summary>
        /// <param name="source">Stopwatch object</param>
        /// <returns>A read-only long integer representing the total number of timer ticks measured by the current instance.</returns>
        public static long StopAndGetTicks(this Stopwatch source)
        {
            source.Stop();

            return source.ElapsedTicks;
        }

        #endregion
    }
}
