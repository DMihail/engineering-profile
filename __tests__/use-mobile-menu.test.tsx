import { act, renderHook } from "@testing-library/react";
import { useMobileMenu } from "@/hooks/use-mobile-menu";

describe("useMobileMenu", () => {
  const originalMatchMedia = window.matchMedia;
  const originalRaf = window.requestAnimationFrame;
  let mqListeners: Array<(event: MediaQueryListEvent) => void> = [];
  let mqMatches = false;

  beforeEach(() => {
    mqListeners = [];
    mqMatches = false;
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    document.body.style.touchAction = "";

    window.requestAnimationFrame = ((cb: FrameRequestCallback) => {
      cb(0);
      return 1;
    }) as typeof window.requestAnimationFrame;

    window.matchMedia = jest.fn().mockImplementation((query: string) => ({
      get matches() {
        return mqMatches;
      },
      media: query,
      onchange: null,
      addEventListener: (_type: string, listener: (event: MediaQueryListEvent) => void) => {
        mqListeners.push(listener);
      },
      removeEventListener: (_type: string, listener: (event: MediaQueryListEvent) => void) => {
        mqListeners = mqListeners.filter((entry) => entry !== listener);
      },
      addListener: jest.fn(),
      removeListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
    window.requestAnimationFrame = originalRaf;
  });

  it("starts closed and toggles open", () => {
    const { result } = renderHook(() => useMobileMenu());
    expect(result.current.menuOpen).toBe(false);

    act(() => {
      result.current.toggleMenu();
    });

    expect(result.current.menuOpen).toBe(true);
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("closeMenu clears open state and restores scroll", () => {
    const { result } = renderHook(() => useMobileMenu());

    act(() => {
      result.current.toggleMenu();
    });
    act(() => {
      result.current.closeMenu(false);
    });

    expect(result.current.menuOpen).toBe(false);
    expect(document.body.style.overflow).toBe("");
    expect(document.documentElement.style.overflow).toBe("");
  });

  it("closes on Escape while open", () => {
    const { result } = renderHook(() => useMobileMenu());

    act(() => {
      result.current.toggleMenu();
    });

    act(() => {
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    });

    expect(result.current.menuOpen).toBe(false);
  });

  it("closes when the desktop media query matches", () => {
    const { result } = renderHook(() => useMobileMenu());

    act(() => {
      result.current.toggleMenu();
    });

    act(() => {
      mqMatches = true;
      for (const listener of mqListeners) {
        listener({ matches: true } as MediaQueryListEvent);
      }
    });

    expect(result.current.menuOpen).toBe(false);
  });
});
