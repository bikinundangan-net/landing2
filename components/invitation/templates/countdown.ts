export type CountdownItem = {
  label: "Hari" | "Jam" | "Menit" | "Detik";
  value: string;
};

const countdownLabels: CountdownItem["label"][] = [
  "Hari",
  "Jam",
  "Menit",
  "Detik",
];

export function buildCountdownTarget(
  eventDate?: string,
  eventTime?: string | null,
) {
  if (!eventDate) {
    return null;
  }

  return `${eventDate}T${eventTime ?? "00:00:00"}+07:00`;
}

export function calculateCountdown(
  targetDate: string | null,
  now = Date.now(),
): CountdownItem[] {
  if (!targetDate) {
    return countdownLabels.map((label) => ({ label, value: "--" }));
  }

  const target = new Date(targetDate).getTime();

  if (Number.isNaN(target)) {
    return countdownLabels.map((label) => ({ label, value: "--" }));
  }

  const totalSeconds = Math.max(Math.floor((target - now) / 1000), 0);
  const days = Math.floor(totalSeconds / 86_400);
  const hours = Math.floor((totalSeconds % 86_400) / 3_600);
  const minutes = Math.floor((totalSeconds % 3_600) / 60);
  const seconds = totalSeconds % 60;
  const values = [days, hours, minutes, seconds];

  return countdownLabels.map((label, index) => ({
    label,
    value: String(values[index]).padStart(2, "0"),
  }));
}
