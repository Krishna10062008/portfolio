/**
 * Generates the WhatsApp redirect target from an environment variable.
 * Enforces sanitization and prevents client leakage.
 */

export function generateHireRedirectUrl(
  rawNumber?: string,
  customMessage?: string
): { success: boolean; url?: string; error?: string } {
  if (!rawNumber) {
    return {
      success: false,
      error: 'WHATSAPP_NUMBER environment variable is not configured.',
    };
  }

  const cleanNumber = rawNumber.replace(/[^0-9]/g, '');
  if (cleanNumber.length < 8) {
    return {
      success: false,
      error: 'WHATSAPP_NUMBER does not contain a valid international phone format.',
    };
  }

  const message = encodeURIComponent(
    customMessage ||
      "Hi Krishna, I found you through your portfolio and I'd like to discuss a project."
  );

  return {
    success: true,
    url: `https://wa.me/${cleanNumber}?text=${message}`,
  };
}
