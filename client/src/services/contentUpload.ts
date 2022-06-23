import { IpfsCidWithMetadata } from "models";
import axios, { extractData } from "services/axios";

export class ContentUploadService {
  static submitCidWithMetadata(data: IpfsCidWithMetadata): Promise<void> {
    return axios.post("accept-cid", data);
  }

  static updateCidWithMetadata(data: IpfsCidWithMetadata): Promise<void> {
    return axios.post("edit-cid", data).then(extractData);
  }

  static getAll(owner: string): Promise<IpfsCidWithMetadata[]> {
    return axios
      .post<{ cids: IpfsCidWithMetadata[] }>("get-cids", { owner })
      .then(extractData)
      .then(({ cids }) => cids);
  }
}
