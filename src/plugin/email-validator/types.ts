interface Is {
  value: boolean;
  text: string;
}
export interface AbstractResponse {
  email: string;
  autocorrect: string;
  deliverability: "UNDELIVERABLE" | "DELIVERABLE" | "RISKY" | "UNKNOWN";
  quality_score: number;
  is_valid_format: Is;
  is_free_email: Is;
  is_disposable_email: Is;
  is_role_email: Is;
  is_catchall_email: Is;
  is_mx_found: Is;
  is_smtp_valid: Is;
}
