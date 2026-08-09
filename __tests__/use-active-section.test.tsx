import { act, renderHook } from "@testing-library/react";
import { useActiveSection } from "@/hooks/use-active-section";
import { HERO_ID } from "@/lib/section-ids";

const mockGetSectionIdFromHash = jest.fn(() => null as string | null);
const mockGetActiveSectionFromScroll = jest.fn(() => HERO_ID);

jest.mock("@/lib/section-navigation", () => ({
  getSectionIdFromHash: () => mockGetSectionIdFromHash(),
  getActiveSectionFromScroll: () => mockGetActiveSectionFromScroll(),
}));

describe("useActiveSection", () => {
  const originalRaf = window.requestAnimationFrame;
  const originalCancel = window.cancelAnimationFrame;
  let rafQueue: FrameRequestCallback[] = [];

  beforeEach(() => {
    jest.clearAllMocks();
    rafQueue = [];
    mockGetSectionIdFromHash.mockReturnValue(null);
    mockGetActiveSectionFromScroll.mockReturnValue(HERO_ID);

    window.requestAnimationFrame = ((cb: FrameRequestCallback) => {
      rafQueue.push(cb);
      return rafQueue.length;
    }) as typeof window.requestAnimationFrame;
    window.cancelAnimationFrame = jest.fn();
  });

  afterEach(() => {
    window.requestAnimationFrame = originalRaf;
    window.cancelAnimationFrame = originalCancel;
  });

  function flushRaf() {
    const queue = [...rafQueue];
    rafQueue = [];
    for (const cb of queue) cb(0);
  }

  it("hydrates with hero before deferred sync", () => {
    const { result } = renderHook(() => useActiveSection());
    expect(result.current.active).toBe(HERO_ID);
  });

  it("syncs from hash after the deferred animation frame", () => {
    mockGetSectionIdFromHash.mockReturnValue("contact");
    const { result } = renderHook(() => useActiveSection());

    act(() => {
      flushRaf();
    });

    expect(result.current.active).toBe("contact");
  });

  it("updates from scroll when unlocked", () => {
    mockGetActiveSectionFromScroll.mockReturnValue("skills");
    const { result } = renderHook(() => useActiveSection());

    act(() => {
      flushRaf();
      window.dispatchEvent(new Event("scroll"));
      flushRaf();
    });

    expect(result.current.active).toBe("skills");
  });

  it("lockActiveSection sets the active section", () => {
    const { result } = renderHook(() => useActiveSection());

    act(() => {
      result.current.lockActiveSection("projects");
    });

    expect(result.current.active).toBe("projects");
  });

  it("reacts to hashchange after mount", () => {
    const { result } = renderHook(() => useActiveSection());

    act(() => {
      flushRaf();
    });

    mockGetSectionIdFromHash.mockReturnValue("experience");

    act(() => {
      window.dispatchEvent(new Event("hashchange"));
    });

    expect(result.current.active).toBe("experience");
  });
});
