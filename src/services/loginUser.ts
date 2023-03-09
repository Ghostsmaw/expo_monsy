import { apiClient } from 'src/services/client';
import ApiConfig from 'src/config/api-config';

export default function loginUser(username: string, password: string) {
  return apiClient.post(ApiConfig.LOGIN, { username, password });
}
