import { formatDateToRelativeTime } from "./date";

describe("formatDateToRelativeTime", () => {
  it("should return a relative time string", () => {
    const dateString = "2021-08-01T00:00:00Z";
    const result = formatDateToRelativeTime(dateString);
    expect(result).toBeDefined();
  });
});
