export interface MailerResult {
  success: boolean;
  messageId?: string;
  simulated?: boolean;
  clientConfirmed?: boolean;
  message?: string;
}

export function sendEnquiryEmail(payload: Record<string, any>): Promise<MailerResult>;
