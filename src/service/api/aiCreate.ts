/** 获取素材 */
import { request } from '../request';

interface res {
  title: string;
  masterImgList: Array<string>;
  mp4List: Array<string>;
}
export function getInfo(data: any): Promise<Service.RequestResult<res>> {
  return request.post<res>('/red/context', data, {
    useErrMsg: false
  });
}
