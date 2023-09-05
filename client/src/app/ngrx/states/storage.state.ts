import { Storage } from '../../models/storage.model';

export interface StorageState {
  storage: Storage;
  isCreating: boolean;
  isCreateSuccess: boolean;
  createErrorMessage: any;
  isGetting: boolean;
  isGetSuccess: boolean;
  getErrorMessage: any;
}
