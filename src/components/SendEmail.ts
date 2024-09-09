export const SendEmail = async (formData: FormData) => {
  const message = formData.get("message");
  const name = formData.get("name");
  const senderEmail = formData.get("SenderEmail");

  if (!message || !name || !senderEmail) {
    return {
      success: false,
      error: "All fields are required",
    };
  }

  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, senderEmail, message }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Server error: ${response.status}`);
    }

    const result = await response.json();
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send email",
    };
  }
};