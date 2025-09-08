// notification.token.ts
// Define the constant that holds the injection token for the Notification microservice client.
// This token will be used in the client provider to ensure consistent and type-safe injection.
export const NOTIFICATION_CLIENT = Symbol('NOTIFICATION_CLIENT');
