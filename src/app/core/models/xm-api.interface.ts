export interface XmMetricRequest {
  MetricId: string;
  StartDate: string;
  EndDate: string;
  Entity: string;
  Filter: string[];
}

export interface XmHourlyResponse {
  Code: string;
  Message: string;
  Result: XmMetricResult[];
}

export interface XmMetricResult {
  Id: string;
  Values: { [hour: string]: number | string };
}