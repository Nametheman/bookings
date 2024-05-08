export function convertTimeFormat(time: string) {
  // Split the time string into hours and minutes
  const [hours, minutes] = time.split(":").map(Number);

  // Format the time in hours and minutes
  const formattedTime = `${hours}H ${minutes}M`;

  return formattedTime;
}
