// Types for DOCX Quality Control Checker API

export interface FileCheckResponse {
  filename: string;
  report: QCReportSchema;
  processing_time?: number | null;
}

export interface QCReportSchema {
  document_path: string;
  timestamp: string;
  summary: Record<string, unknown>;
  checks: QCResultSchema[];
}

export interface QCResultSchema {
  rule_name: string;
  rule_number?: number | null;
  passed: boolean;
  message: string;
  violation_type: string;
  details?: string | null;
  locations?: Record<string, unknown>[] | null;
}

export interface HealthResponse {
  status: string;
  timestamp: string;
  version: string;
  uptime?: number | null;
}

export interface ValidationError {
  loc: (string | number)[];
  msg: string;
  type: string;
}

export interface HTTPValidationError {
  detail?: ValidationError[];
} 