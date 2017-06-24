export const TYPE = 'NAVIGATE';
export function navigate(navigationTarget) {
  return {
    type: TYPE,
    navigation: {
      target: navigationTarget,
    },
  };
}
