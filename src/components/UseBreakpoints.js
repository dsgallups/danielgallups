import useMediaQuery from "./UseMediaQuery";

/**
 * Get a set of boolean representing which breakpoint is active
 * and which breakpoints are inactive.
 *
 * Inspired by: https://github.com/contra/react-responsive/issues/162#issuecomment-592082035
 */
export default function useBreakpoints() {
  const breakpoints = {
    isMobile: useMediaQuery("(max-width: 864px)"),
    isDesktop: useMediaQuery("(min-width: 865px)"),
    active: "isDesktop"
  };
  if (breakpoints.isMobile) breakpoints.active = "isMobile";
  if (breakpoints.isDesktop) breakpoints.active = "isDesktop";
  return breakpoints;
}
