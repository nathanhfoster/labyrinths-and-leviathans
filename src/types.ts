
export type ServicerWorkerConfig = {
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
};

export type ServiceWorkerConfiguration = () => ServicerWorkerConfig;