export const subscribeToSummoner = async (
  summonerId: string
): Promise<boolean> => {
  try {
    const response = await fetch("/api/subscribe", {
      method: "POST",
      body: JSON.stringify({ summonerId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      return true;
    } else {
      console.error("Failed to subscribe: ", await response.text());
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};
