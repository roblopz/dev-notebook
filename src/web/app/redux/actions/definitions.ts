
export const StartStatus = 'START';
export const SuccessStatus = 'SUCCESS';
export const FailStatus = 'FAIL';
export type AsyncStatus = typeof StartStatus | typeof SuccessStatus | typeof FailStatus;

export interface IActionBase {
  type: string;
}

export interface IAsyncAction extends IActionBase {
  status: AsyncStatus;
  error?: Error;
}