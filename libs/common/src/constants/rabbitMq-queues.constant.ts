// libs/common/src/constants/rmq.constant.ts
export const RMQ_QUEUES = {
  // Internal service-to-service queues
  RMQ_QUEUE_AUTH_TO_USERS: 'prod.queue.auth.to.users',
  RMQ_QUEUE_RESUME_TO_AI_OPTIMIZE: 'prod.queue.resume.to.ai.optimize',
  RMQ_QUEUE_COVERLETTER_TO_AI_CREATE: 'prod.queue.coverletter.to.ai.create',
  RMQ_QUEUE_NOTIFICATION: 'prod.queue.notification',
};
